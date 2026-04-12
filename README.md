# Quickit UI

Quickit UI is a primitive component library for React 19 and Tailwind CSS 4, focused on providing accessible, unstyled-first, and highly composable UI foundations.

## Installation

```bash
npm install quickit-ui
```

## Setup

Quickit UI requires a CSS environment compatible with Tailwind CSS 4. Add the following to your global stylesheet:

```css
@import "quickit-ui/styles.css";
@import "tailwindcss";

/* Optional: Synchronize theme-aware utilities with Quickit's dark mode */
@custom-variant dark (&:where(.dark, .dark *));
```

## Basic Usage

Wrap your application with `QuickitThemeProvider` to benefit from the built-in theme management and global configuration.

```jsx
import "quickit-ui/styles.css";
import { QuickitThemeProvider, Button, Input } from "quickit-ui";

export default function App() {
  return (
    <QuickitThemeProvider defaultTheme="system">
      <div className="flex flex-col gap-4 p-8">
        <Input placeholder="Search components..." />
        <Button variant="solid" color="brand">Get Started</Button>
      </div>
    </QuickitThemeProvider>
  );
}
```

## Components

The library provides over 35 components designed as low-level primitives:

- **Base**: `Button`, `Link`, `Badge`, `Label`, `Skeleton`, `Progress`
- **Forms**: `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Range`, `FormControl`
- **Overlays**: `Modal`, `Drawer`, `Popover`, `Tooltip`, `Dropdown`, `Toaster`
- **Navigation**: `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`
- **Identity**: `Avatar`, `AvatarGroup`, `UserChip`, `Initials`
- **Logic**: `Show`, `For`, `RenderSwitch`, `Match`, `Default`
- **Feedback**: `EmptyState`, `FormDescription`, `FormMessage`

## Documentation

For full documentation, architecture details, and extensive examples, run the local development server:

```bash
npm install
npm run dev
```

The documentation is accessible at `/docs` and features a comprehensive API reference for every component and hook.

## Requirements

- React 19 or higher
- Node.js 18 or higher
- Tailwind CSS 4 environment

## License

MIT © [Darrel Masis](https://github.com/darrelmasis)
