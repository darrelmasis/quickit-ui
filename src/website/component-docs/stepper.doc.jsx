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
  examples: [{
    id: "ejemplos-basico",
    title: "Básico",
    description: "Stepper horizontal con descripciones.",
    preview: <Stepper activeStep={1} steps={[
          { title: "Cuenta", description: "Datos básicos" },
          { title: "Plan", description: "Elige tu plan" },
          { title: "Pago", description: "Método de pago" },
        ]} />,
    code: `import { Stepper } from "quickit-ui";

export function StepperBasico() {
  return (
    <Stepper
      activeStep={1}
      steps={[
        { title: "Cuenta", description: "Datos básicos" },
        { title: "Plan", description: "Elige tu plan" },
        { title: "Pago", description: "Método de pago" },
      ]}
    />
  );
}`
  }, {
    id: "ejemplos-vertical",
    title: "Vertical",
    description: "Disposición vertical con navegación.",
    preview: <Stepper orientation="vertical" activeStep={0} onStepChange={() => {}} steps={[
          { title: "Uno", description: "Descripción del paso uno" },
          { title: "Dos", description: "Descripción del paso dos" },
        ]} />,
    code: `import { Stepper } from "quickit-ui";

export function StepperVertical() {
  return (
    <Stepper
      orientation="vertical"
      activeStep={0}
      onStepChange={(i) => console.log(i)}
      steps={[
        { title: "Uno", description: "Descripción del paso uno" },
        { title: "Dos", description: "Descripción del paso dos" },
      ]}
    />
  );
}`
  }, {
    id: "ejemplos-props",
    title: "Props",
    props: [{
      name: "color",
      type: "QuickitSemanticColor",
      defaultValue: `"neutral"`,
      description: "Define la paleta visual de los pasos."
    }, {
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
      description: "Habilita navegación por click."
    }, {
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      defaultValue: `"horizontal"`,
      description: "Disposición del stepper."
    }],
    notes: ["Pasa onStepChange para navegación por click.", "Sin onStepChange, Stepper es un indicador estático."]
  }]
};
