import { Highlight, themes } from "prism-react-renderer";
import { Button, useQuickitTheme, Tooltip } from "@/lib";
import { CheckStrokeIcon, CopyIcon } from "@/lib/assets/icons";
import useCopyToClipboard from "@/website/hooks/useCopyToClipboard";

export default function WebsitePreviewTabs({ code, children }) {
  const theme = useQuickitTheme();
  const isDark = theme === "dark";
  const { copied, copy } = useCopyToClipboard();
  const codeTheme = isDark ? themes.nightOwl : themes.nightOwlLight;
  const previewBg = isDark ? "bg-white/[0.02]" : "bg-white";

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className={`flex min-h-[18rem] items-center justify-center p-10 ${previewBg}`}>
        {children}
      </div>
      <div className="group relative border-t border-neutral-200 dark:border-neutral-800">
        <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <Tooltip content={copied ? "Código copiado" : "Copiar código"} placement="top" showArrow={false}>
            <Button
              aria-label={copied ? "Codigo copiado" : "Copiar codigo"}
              title={copied ? "Copiado" : "Copiar"}
              shape="circle"
              size="sm"
              variant="ghost"
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
        <pre className={`overflow-x-auto px-4 py-4 text-sm leading-relaxed ${isDark ? "bg-neutral-950" : "bg-neutral-50"} [scrollbar-width:thin] [scrollbar-color:rgb(163_163_163)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:bg-clip-content [&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 dark:[scrollbar-color:rgb(115_115_115)_transparent] dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600`}>
          <Highlight theme={codeTheme} code={code} language="tsx">
            {({ className, getLineProps, getTokenProps, tokens }) => (
              <code className={`grid gap-0 ${className}`}>
                {tokens.map((line, index) => {
                  const { key: _lineKey, ...lineProps } = getLineProps({ line });
                  return (
                    <div
                      key={`line-${index}`}
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4"
                      {...lineProps}
                    >
                      <span
                        className={`select-none text-right text-[0.75rem] ${isDark ? "text-neutral-600" : "text-neutral-400"}`}
                      >
                        {index + 1}
                      </span>
                      <span className="whitespace-pre">
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
    </div>
  );
}
