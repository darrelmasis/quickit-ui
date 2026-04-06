import * as React from "react";
import "quickit-ui/styles.css";
import {
  Avatar,
  AvatarFallback,
  AvatarPresence,
  Badge,
  Button,
  Default,
  For,
  getInitials,
  Input,
  Initials,
  Link,
  Match,
  Modal,
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  QuickitProvider,
  RenderSwitch,
  Select,
  Show,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  UserChip,
  type ButtonProps,
  type LinkProps,
  type QuickitPresenceStatus,
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
const presence: QuickitPresenceStatus = "online";
const initials = getInitials("Elena Ruiz");

export function ConsumerPreview() {
  return (
    <QuickitProvider theme="dark">
      <Button {...buttonProps}>Guardar</Button>
      <Link {...linkProps}>Ir a docs</Link>
      <Badge color="success">Activo</Badge>
      <Input color="dark" placeholder="Buscar" />
      <Textarea color="light" minRows={3} />
      <Select color="brand" defaultValue="docs">
        <option value="docs">Docs</option>
        <option value="tokens">Tokens</option>
      </Select>
      <Avatar size="lg" shape="rounded">
        <AvatarFallback>ER</AvatarFallback>
        <AvatarPresence status={presence} />
      </Avatar>
      <Initials name="Quickit UI" />
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
      <UserChip
        name="Elena Ruiz"
        description="Design lead"
        initials={initials}
        presence={presence}
      />
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
