import WebsiteResizablePreview from "@/website/components/WebsiteResizablePreview";

export default function WebsitePreviewTabs({ code, children, defaultWidth }) {
  return (
    <WebsiteResizablePreview code={code} defaultWidth={defaultWidth}>
      {children}
    </WebsiteResizablePreview>
  );
}
