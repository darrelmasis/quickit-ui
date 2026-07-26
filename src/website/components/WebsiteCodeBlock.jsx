import { Highlight, themes } from "prism-react-renderer";
import { Button, useQuickitTheme, Tooltip } from "@/lib";
import { CheckStrokeIcon, CopyIcon } from "@/lib/assets/icons";
import useCopyToClipboard from "@/website/hooks/useCopyToClipboard";

export default function WebsiteCodeBlock({
  code,
  language = "bash",
}) {
  const theme = useQuickitTheme();
  const isDark = theme === "dark";
  const codeTheme = isDark ? themes.nightOwl : themes.nightOwlLight;
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className={`group relative overflow-hidden rounded-lg ${isDark ? "bg-neutral-950" : "bg-neutral-50"}`}>
      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <Tooltip content={copied ? "Código copiado" : "Copiar código"} placement="top" showArrow={false}>
          <Button
            aria-label={copied ? "Codigo copiado" : "Copiar codigo"}
            title={copied ? "Copiado" : "Copiar"}
            shape="circle"
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => copy(code)}
          >
            {copied ? (
              <CheckStrokeIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </Button>
        </Tooltip>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed scrollbar-themed">
        <Highlight theme={codeTheme} code={(code ?? "").trimEnd()} language={language}>
          {({ className, getLineProps, getTokenProps, tokens }) => (
            <code className={`grid gap-0 ${className}`}>
              {tokens.map((line, index) => {
                const { key: _lineKey, ...lineProps } = getLineProps({ line });
                return (
                  <div
                    key={`line-${index}`}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-6"
                    {...lineProps}
                  >
                    <span
                      className={`select-none text-right text-[0.75rem] ${isDark ? "text-neutral-600" : "text-neutral-400"}`}
                    >
                      {index + 1}
                    </span>
                    <span className="whitespace-pre pl-4">
                      {line.map((token, tokenIndex) => {
                        const { key: _tokenKey, ...tokenProps } = getTokenProps({ token });
                        return (
                          <span
                            key={`token-${index}-${tokenIndex}`}
                            {...tokenProps}
                          />
                        );
                      })}
                    </span>
                  </div>
                );
              })}
            </code>
          )}
        </Highlight>
      </pre>
    </div>
  );
}
