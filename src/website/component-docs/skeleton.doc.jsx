/* eslint-disable react-refresh/only-export-components */
import { Skeleton } from "@/lib";
const SKELETON_PREVIEW_CODE = `import { Skeleton } from "quickit-ui";

export function SkeletonPreview() {
  return <Skeleton shape="line" />;
}`;
function SkeletonPreviewCanvas() {
  return <div className="w-full max-w-sm space-y-2">
      <Skeleton shape="line" />
      <Skeleton shape="line" />
    </div>;
}
export const skeletonDoc = {
  name: "Skeleton",
  description: "Marcador de carga para line, rect y circle.",
  previewCode: SKELETON_PREVIEW_CODE,
  preview: <SkeletonPreviewCanvas />,
  installCode: `import { Skeleton } from "quickit-ui";`,
  usageCode: `import { Skeleton } from "quickit-ui";

export function SkeletonUsage() {
  return <Skeleton shape="rect" />;
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "shape",
      type: `"line" | "rect" | "circle"`,
      defaultValue: `"line"`,
      description: "Define la forma del skeleton."
    }, {
      name: "animated",
      type: "boolean",
      defaultValue: "true",
      description: "Habilita la animación shimmer."
    }]
  }, {
    id: "ejemplos-variantes",
    title: "Variantes",
    description: "Line, rect y circle.",
    preview: <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton shape="line" />
          <Skeleton shape="rect" />
          <Skeleton shape="circle" />
        </div>
  }, {
    id: "ejemplos-static",
    title: "Sin animación",
    description: "animated=false para estados estáticos.",
    preview: <Skeleton shape="rect" animated={false} />
  }]
};
