import { render } from "@testing-library/react";
import { QuickitProvider } from "@/lib";

export function renderWithProvider(
  ui,
  { renderOptions, theme = "light", ...providerProps } = {},
) {
  return render(
    <QuickitProvider theme={theme} {...providerProps}>
      {ui}
    </QuickitProvider>,
    renderOptions,
  );
}
