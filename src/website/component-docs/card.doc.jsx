/* eslint-disable react-refresh/only-export-components */
import { Card, Button } from "@/lib";

const CARD_PREVIEW_CODE = `import { Card, Button } from "quickit-ui";

export function CardPreview() {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold">Título de la tarjeta</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Contenido principal de la tarjeta.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="soft">Cancelar</Button>
        <Button size="sm">Guardar</Button>
      </Card.Footer>
    </Card>
  );
}`;

function CardPreviewCanvas() {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold">Título de la tarjeta</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Contenido principal de la tarjeta.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="soft">Cancelar</Button>
        <Button size="sm">Guardar</Button>
      </Card.Footer>
    </Card>
  );
}

export const cardDoc = {
  name: "Card",
  description: "Contenedor versátil con header, body y footer. Ideal para secciones, paneles y agrupación de contenido.",
  previewCode: CARD_PREVIEW_CODE,
  preview: <CardPreviewCanvas />,
  installCode: `import { Card } from "quickit-ui";`,
  examples: [
    {
      id: "ejemplos-basico",
      title: "Básico",
      description: "Card con header, body y footer.",
      preview: <CardPreviewCanvas />,
      code: CARD_PREVIEW_CODE,
    },
    {
      id: "ejemplos-solo-body",
      title: "Solo body",
      description: "Usa solo Card.Body si no necesitas header ni footer.",
      preview: (
        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Una tarjeta simple con solo contenido.
            </p>
          </Card.Body>
        </Card>
      ),
      code: `import { Card } from "quickit-ui";

export function CardSoloBody() {
  return (
    <Card>
      <Card.Body>
        <p>Una tarjeta simple con solo contenido.</p>
      </Card.Body>
    </Card>
  );
}`,
    },
    {
      id: "ejemplos-props",
      title: "Props",
      props: [
        {
          name: "Card",
          type: "Contenedor raíz",
          defaultValue: "-",
          description: "Acepta className y todas las props de un div.",
        },
        {
          name: "Card.Header",
          type: "Subcomponente",
          defaultValue: "-",
          description: "Sección superior con borde inferior. Ideal para título y acciones.",
        },
        {
          name: "color",
          type: "QuickitSemanticColor",
          defaultValue: `"neutral"`,
          description: "Define la paleta visual del contenedor.",
        },
        {
          name: "Card.Body",
          type: "Subcomponente",
          defaultValue: "-",
          description: "Área de contenido principal. Sin borde, ocupa el espacio restante.",
        },
        {
          name: "Card.Footer",
          type: "Subcomponente",
          defaultValue: "-",
          description: "Sección inferior con borde superior. Ideal para acciones (botones).",
        },
      ],
      notes: [
        "Usa el radio definido por el sistema de border-radius global (--qi-radius-xl).",
        "Body no tiene theme classes propias — hereda el fondo del Card raíz.",
        "Los subcomponentes Header y Footer agregan bordes internos consistentes.",
      ],
    },
  ],
};
