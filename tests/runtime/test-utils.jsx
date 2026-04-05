import { render } from "@testing-library/react";
import { QuickitProvider } from "@/lib";

export function renderWithProvider(ui, { theme = "light", ...options } = {}) {
  return render(<QuickitProvider theme={theme}>{ui}</QuickitProvider>, options);
}
