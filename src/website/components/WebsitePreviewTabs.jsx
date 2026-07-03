import { Highlight, themes } from "prism-react-renderer";
import { Button, Tabs, useQuickitTheme, Tooltip } from "@/lib";
import { CheckStrokeIcon, CopyIcon } from "@/lib/assets/icons";
import useCopyToClipboard from "@/website/hooks/useCopyToClipboard";

export default function WebsitePreviewTabs({ code, children }) {
  const theme = useQuickitTheme();
  const isDark = theme === "dark";
  const { copied, copy } = useCopyToClipboard();
  const previewClasses = isDark ? "bg-neutral-950" : "bg-white";
  const codePanelClasses = isDark
    ? "bg-neutral-950 text-neutral-100"
    : "bg-neutral-50 text-neutral-900";
  const codeTheme = isDark ? themes.nightOwl : themes.nightOwlLight;

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
      <Tabs defaultValue="preview" size="sm" color="neutral">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
          <Tabs.List>
            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
            <Tabs.Trigger value="code">Código</Tabs.Trigger>
          </Tabs.List>
          <Tooltip
            content={copied ? "Código copiado" : "Copiar código"}
            placement="top"
            showArrow={false}
          >
            <Button
              aria-label={copied ? "Codigo copiado" : "Copiar codigo"}
              title={copied ? "Copiado" : "Copiar"}
              shape="circle"
              size="md"
              variant="ghost"
              color="neutral"
              onClick={() => copy(code)}
            >
              {copied ? (
                <CheckStrokeIcon className="size-5" />
              ) : (
                <CopyIcon className="size-5" />
              )}
            </Button>
          </Tooltip>
        </div>

        <Tabs.Content value="preview">
          <div
            className={`flex min-h-[22rem] items-center justify-center px-6 py-8 ${previewClasses}`}
          >
            {children}
          </div>
        </Tabs.Content>

        <Tabs.Content value="code">
          <div className={codePanelClasses}>
            <pre className="overflow-x-auto px-4 py-6 text-sm leading-7 [scrollbar-width:thin] [scrollbar-color:rgb(163_163_163)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:bg-clip-content [&::-webkit-scrollbar-thumb:hover]:bg-neutral-400 dark:[scrollbar-color:rgb(115_115_115)_transparent] dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600">
              <Highlight theme={codeTheme} code={code} language="tsx">
                {({ className, getLineProps, getTokenProps, tokens }) => (
                  <code className={`grid gap-0 ${className}`}>
                    {tokens.map((line, index) => (
                      <div
                        key={`line-${index}`}
                        className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5"
                        {...getLineProps({ line })}
                      >
                        <span
                          className={`select-none text-right pr-2 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}
                        >
                          {index + 1}
                        </span>
                        <span className="whitespace-pre">
                          {line.map((token, tokenIndex) => (
                            <span
                              key={`token-${index}-${tokenIndex}`}
                              {...getTokenProps({ token })}
                            />
                          ))}
                        </span>
                      </div>
                    ))}
                  </code>
                )}
              </Highlight>
            </pre>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
