import { Button, FormControl, Input, Label, Modal, Select, Stepper } from "@/lib";
import { useState } from "react";

export function CheckoutFlow() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="font-semibold">Checkout de suscripción</h3>
      <Stepper
        activeStep={activeStep}
        onStepChange={setActiveStep}
        steps={[
          { title: "Plan", description: "Seleccionar tier" },
          { title: "Pago", description: "Método y datos" },
          { title: "Confirmar", description: "Validación final" },
        ]}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <FormControl controlId="checkout-name" required>
          <Label>Nombre</Label>
          <Input placeholder="Ada Lovelace" />
        </FormControl>
        <FormControl controlId="checkout-email" required>
          <Label>Email</Label>
          <Input type="email" placeholder="ada@quickit.dev" />
        </FormControl>
        <FormControl controlId="checkout-plan" required>
          <Label>Plan</Label>
          <Select defaultValue="growth">
            <option value="starter">Starter</option>
            <option value="growth">Growth</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </FormControl>
        <FormControl controlId="checkout-card" required invalid>
          <Label>Tarjeta</Label>
          <Input placeholder="4242 4242 4242 4242" />
          <FormControl.Message>Número inválido</FormControl.Message>
        </FormControl>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" color="neutral">
          Guardar borrador
        </Button>
        <Modal>
          <Modal.Trigger asChild>
            <Button color="primary">Pagar y activar</Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Confirmar compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Se activará el plan al completar el cobro.
            </Modal.Body>
            <Modal.Actions>
              <Modal.Action variant="outline">Cancelar</Modal.Action>
              <Modal.Action color="primary">Confirmar pago</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}
