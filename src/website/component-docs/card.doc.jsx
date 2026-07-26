/* eslint-disable react-refresh/only-export-components */
import { Badge, Button, Card } from "@/lib";

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
      id: "ejemplos-producto",
      title: "Tarjeta de producto",
      description: "Ejemplo realista de tarjeta para mostrar un producto.",
      preview: (
        <Card>
          <Card.Body>
            <div className="aspect-square w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 mb-4" />
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">Camiseta básica</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Algodón 100%, disponible en varios colores</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">$29.99</span>
              <Badge color="success" variant="soft">En stock</Badge>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="outline" className="flex-1">Ver detalles</Button>
            <Button size="sm" className="flex-1">Añadir</Button>
          </Card.Footer>
        </Card>
      ),
      code: `import { Badge, Button, Card } from "quickit-ui";

export function CardProducto() {
  return (
    <Card>
      <Card.Body>
        <div className="aspect-square w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 mb-4" />
        <h3 className="font-semibold">Camiseta básica</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Algodón 100%, disponible en varios colores</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">$29.99</span>
          <Badge color="success" variant="soft">En stock</Badge>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline" className="flex-1">Ver detalles</Button>
        <Button size="sm" className="flex-1">Añadir</Button>
      </Card.Footer>
    </Card>
  );
}`
    },
    {
      id: "ejemplos-articulo",
      title: "Tarjeta de artículo",
      description: "Ejemplo realista de tarjeta para blog o artículo.",
      preview: (
        <Card>
          <Card.Header>
            <div className="flex items-center gap-2 mb-2">
              <Badge color="primary" size="sm">Tecnología</Badge>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">15 Ene 2024</span>
            </div>
            <h3 className="text-lg font-semibold">Cómo optimizar tu aplicación React</h3>
          </Card.Header>
          <Card.Body>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Aprende las mejores prácticas para mejorar el rendimiento de tus aplicaciones React con técnicas de memoización, lazy loading y más.
            </p>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="outline" href="#">Leer artículo</Button>
          </Card.Footer>
        </Card>
      ),
      code: `import { Badge, Button, Card } from "quickit-ui";

export function CardArticulo() {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center gap-2 mb-2">
          <Badge color="primary" size="sm">Tecnología</Badge>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">15 Ene 2024</span>
        </div>
        <h3 className="text-lg font-semibold">Cómo optimizar tu aplicación React</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Aprende las mejores prácticas para mejorar el rendimiento de tus aplicaciones React con técnicas de memoización, lazy loading y más.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline" href="#">Leer artículo</Button>
      </Card.Footer>
    </Card>
  );
}`
    },
    {
      id: "ejemplos-estadisticas",
      title: "Tarjeta de estadísticas",
      description: "Ejemplo realista de tarjeta para mostrar métricas.",
      preview: (
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Visitas totales</span>
              <Badge color="success" variant="soft">+12.5%</Badge>
            </div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">24,532</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Últimos 30 días</p>
          </Card.Body>
        </Card>
      ),
      code: `import { Badge, Card } from "quickit-ui";

export function CardEstadisticas() {
  return (
    <Card>
      <Card.Body>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Visitas totales</span>
          <Badge color="success" variant="soft">+12.5%</Badge>
        </div>
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">24,532</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Últimos 30 días</p>
      </Card.Body>
    </Card>
  );
}`
    },
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
