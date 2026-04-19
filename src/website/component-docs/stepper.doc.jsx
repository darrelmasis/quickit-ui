import { Stepper } from "@/lib";
export const stepperDoc = {
  name: "Stepper",
  description: "Indicador de pasos para flujos guiados (wizard, onboarding, checkout).",
  previewCode: `import { Stepper } from "quickit-ui";

export function StepperPreview() {
  return (
    <Stepper
      activeStep={1}
      steps={[
        { title: "Cuenta" },
        { title: "Plan" },
        { title: "Pago" },
      ]}
    />
  );
}`,
  preview: <Stepper activeStep={1} steps={[{
    title: "Cuenta",
    description: "Datos básicos"
  }, {
    title: "Plan",
    description: "Elige tu plan"
  }, {
    title: "Pago",
    description: "Método de pago"
  }]} />,
  installCode: `import { Stepper } from "quickit-ui";`,
  usageCode: `import { Stepper } from "quickit-ui";

export function StepperUsage() {
  return (
    <Stepper
      orientation="vertical"
      activeStep={0}
      onStepChange={(i) => {}}
      steps={[{ title: "Uno" }, { title: "Dos" }]}
    />
  );
}`,
  examples: [{
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "steps",
      type: "{ title, description?, clickable? }[]",
      defaultValue: "[]",
      description: "Pasos mostrados en orden."
    }, {
      name: "activeStep",
      type: "number",
      defaultValue: "0",
      description: "Índice del paso actual (0-based)."
    }, {
      name: "onStepChange",
      type: "(index: number) => void",
      defaultValue: "undefined",
      description: "Si se define, los pasos son botones navegables."
    }, {
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      defaultValue: `"horizontal"`,
      description: "Disposición del stepper."
    }],
    notes: ["Pasa `onStepChange` para habilitar navegación por click en los pasos."]
  }]
};
