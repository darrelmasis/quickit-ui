import * as React from "react";
import "quickit-ui/styles.css";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Default,
  For,
  Link,
  Match,
  Modal,
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  QuickitProvider,
  RenderSwitch,
  Show,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type ButtonProps,
  type LinkProps,
  type QuickitSemanticColor,
} from "quickit-ui";

const color: QuickitSemanticColor = QUICKIT_SEMANTIC_COLORS[0];
const buttonProps: ButtonProps = {
  color,
  size: QUICKIT_CONTROL_SIZES[1],
  shape: QUICKIT_BUTTON_SHAPES[0],
};
const linkProps: LinkProps = {
  href: "#",
  appearance: "button",
  color,
  shape: "pill",
};

export function ConsumerPreview() {
  return (
    <QuickitProvider theme="dark">
      <Button {...buttonProps}>Guardar</Button>
      <Link {...linkProps}>Ir a docs</Link>
      <Badge color="success">Activo</Badge>
      <Avatar size="lg" shape="rounded">
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <Show when={{ name: "Elena" }}>
        {(user) => <span>{user.name}</span>}
      </Show>
      <RenderSwitch value="review">
        <Match when="review">
          <span>En revisión</span>
        </Match>
        <Default>
          <span>Otro estado</span>
        </Default>
      </RenderSwitch>
      <For each={[{ id: 1, name: "Landing" }]}>
        {(item) => <span key={item.id}>{item.name}</span>}
      </For>
      <Tabs defaultValue="overview" color="neutral">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Contenido</TabsContent>
      </Tabs>
      <Modal defaultOpen={false}>
        <Modal.Trigger asChild>
          <Button color="neutral">Abrir</Button>
        </Modal.Trigger>
      </Modal>
    </QuickitProvider>
  );
}

void React.createElement(ConsumerPreview);
