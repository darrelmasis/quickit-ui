import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, Link, QuickitProvider, useQuickitRipple } from "@/lib";

function RippleReadout() {
  const buttonRipple = useQuickitRipple("button");
  const linkRipple = useQuickitRipple("link");

  return (
    <div>
      <span>button ripple: {String(buttonRipple)}</span>
      <span>link ripple: {String(linkRipple)}</span>
    </div>
  );
}

describe("ripple configuration", () => {
  it("keeps ripple disabled by default because pressEffect defaults to transform", async () => {
    const user = userEvent.setup();

    render(
      <QuickitProvider>
        <div>
          <Button color="neutral">Guardar</Button>
          <Link href="#docs" appearance="button" color="neutral">
            Ver docs
          </Link>
        </div>
      </QuickitProvider>,
    );

    const button = screen.getByRole("button", { name: "Guardar" });
    const link = screen.getByRole("link", { name: "Ver docs" });

    await user.click(button);
    await user.click(link);

    expect(button.querySelector(".qi-ripple")).toBeNull();
    expect(link.querySelector(".qi-ripple")).toBeNull();
  });

  it("enables ripple from QuickitProvider when pressEffect is ripple", async () => {
    const user = userEvent.setup();

    render(
      <QuickitProvider pressEffect="ripple">
        <div>
          <RippleReadout />
          <Button color="neutral">Guardar</Button>
          <Link href="#docs" appearance="button" color="neutral">
            Ver docs
          </Link>
        </div>
      </QuickitProvider>,
    );

    const button = screen.getByRole("button", { name: "Guardar" });
    const link = screen.getByRole("link", { name: "Ver docs" });

    expect(screen.getByText("button ripple: true")).toBeTruthy();
    expect(screen.getByText("link ripple: true")).toBeTruthy();

    await user.click(button);
    await waitFor(() => {
      expect(button.querySelector(".qi-ripple")).not.toBeNull();
    });

    await user.click(link);
    await waitFor(() => {
      expect(link.querySelector(".qi-ripple")).not.toBeNull();
    });
  });

  it("supports choosing ripple by prop and disabling it on specific components", async () => {
    const user = userEvent.setup();

    render(
      <QuickitProvider
        pressEffect="ripple"
        ripple={{ disabledComponents: ["link"] }}
      >
        <div>
          <RippleReadout />
          <Button color="neutral" pressEffect="ripple">
            Boton con ripple
          </Button>
          <Link href="#docs" appearance="button" color="neutral">
            Link sin ripple global
          </Link>
          <Button color="neutral" ripple={false}>
            Boton sin ripple
          </Button>
        </div>
      </QuickitProvider>,
    );

    const button = screen.getByRole("button", { name: "Boton con ripple" });
    const link = screen.getByRole("link", { name: "Link sin ripple global" });
    const disabledButton = screen.getByRole("button", { name: "Boton sin ripple" });

    expect(screen.getByText("button ripple: true")).toBeTruthy();
    expect(screen.getByText("link ripple: false")).toBeTruthy();

    await user.click(button);
    await waitFor(() => {
      expect(button.querySelector(".qi-ripple")).not.toBeNull();
    });

    await user.click(link);
    await user.click(disabledButton);

    expect(link.querySelector(".qi-ripple")).toBeNull();
    expect(disabledButton.querySelector(".qi-ripple")).toBeNull();
  });
});
