/* eslint-disable react-refresh/only-export-components */
import { Container } from "@/lib";

const CONTAINER_PREVIEW_CODE = `import { Container } from "quickit-ui";

export function ContainerPreview() {
  return (
    <Container size="lg">
      <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900">
        Contenido centrado con max-width responsivo
      </div>
    </Container>
  );
}`;

function ContainerPreviewCanvas() {
  return (
    <Container size="lg">
      <div className="rounded-xl bg-neutral-50 p-8 text-center text-neutral-500 dark:bg-neutral-900">
        Contenido centrado con max-width responsivo
      </div>
    </Container>
  );
}

export const containerDoc = {
  name: "Container",
  description: "Contenedor centrado con max-width responsivo y padding. Ideal para envolver secciones de layout y mantener anchos consistentes.",
  previewCode: CONTAINER_PREVIEW_CODE,
  preview: <ContainerPreviewCanvas />,
  installCode: `import { Container } from "quickit-ui";`,
  props: [
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
      defaultValue: '"lg"',
      description: "Define el max-width del contenedor: sm (3xl), md (5xl), lg (7xl), xl (90rem), 2xl (96rem) o full (sin restricción).",
    },
    {
      name: "padding",
      type: '"none" | "sm" | "md" | "lg" | "xl"',
      defaultValue: '"md"',
      description: "Padding horizontal responsivo. None: 0, sm: px-4 sm:px-6, md: px-6 sm:px-8, lg: px-8 sm:px-12, xl: px-10 sm:px-16.",
    },
    {
      name: "center",
      type: "boolean",
      defaultValue: "true",
      description: "Centra el contenedor horizontalmente con margin auto.",
    },
    {
      name: "as",
      type: "React.ElementType",
      defaultValue: '"div"',
      description: "Polymorphic: permite renderizar como cualquier elemento o componente (section, article, main, etc.).",
    },
  ],
};
