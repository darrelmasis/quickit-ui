import { useEffect, useState } from "react";

export default function useCopyToClipboard(timeoutMs = 1600) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied, timeoutMs]);

  const copy = async (value) => {
    if (!value) {
      return;
    }

    const content = value.trimEnd();

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        return;
      }
    } catch {
      // Se maneja con el fallback de textarea.
    }

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    setCopied(true);
  };

  return { copied, copy };
}
