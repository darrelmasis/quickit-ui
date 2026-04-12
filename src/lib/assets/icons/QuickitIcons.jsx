// Registro interno de iconos reutilizables de Quickit UI.
// Mantenerlos aquí evita SVG embebidos en cada componente y facilita cambios
// globales de estilo sin tocar la lógica de cada control.

export function PlusIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className}>
      <path
        d="M9.25 4.5h1.5v4.75h4.75v1.5h-4.75v4.75h-1.5v-4.75H4.5v-1.5h4.75V4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SpinnerIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        className="opacity-25"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        className="opacity-100"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CheckStrokeIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none">
      <path
        d="M4 8.5 6.5 11 12 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckFillIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className}>
      <path
        d="m7.75 13.1-3.4-3.4 1.06-1.06 2.34 2.34 6.84-6.84 1.06 1.06-7.9 7.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClearIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M6 6l8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EyeIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M1.75 10s2.9-5 8.25-5 8.25 5 8.25 5-2.9 5-8.25 5-8.25-5-8.25-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function EyeOffIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M2 2l16 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.2 4.86A9.77 9.77 0 0 1 10 4.5c5.35 0 8.25 5.5 8.25 5.5a13.4 13.4 0 0 1-2.89 3.47M4.46 7.32A13.2 13.2 0 0 0 1.75 10s2.9 5.5 8.25 5.5c1.08 0 2.07-.22 2.97-.58"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.53 8.53A2.08 2.08 0 0 0 8 10a2 2 0 0 0 2 2c.54 0 1.03-.21 1.39-.56"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className}>
      <path
        d="M5.75 7.75 10 12l4.25-4.25 1.06 1.06-5.31 5.31-5.31-5.31 1.06-1.06Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CopyIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <rect
        x="6.5"
        y="5"
        width="10"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="3.5"
        y="3"
        width="10"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.7"
      />
    </svg>
  );
}
