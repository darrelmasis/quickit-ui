// Las máscaras de avatar siguen siendo SVG porque dependen de medidas
// calculadas en runtime, pero viven fuera de los componentes para que la
// geometría editable no quede embebida en la lógica del árbol.

export function AvatarGroupMaskDefs({ items }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      focusable="false"
    >
      <defs>
        {items.map(({ maskId, maskDefinition }) =>
          maskId ? (
            <mask
              key={maskId}
              id={maskId}
              maskContentUnits="objectBoundingBox"
              maskUnits="objectBoundingBox"
            >
              <rect width="1" height="1" fill="white" />
              {maskDefinition.type === "circle" ? (
                <circle
                  cx={maskDefinition.cx}
                  cy={maskDefinition.cy}
                  r={maskDefinition.r}
                  fill="black"
                />
              ) : (
                <rect
                  x={maskDefinition.x}
                  y={maskDefinition.y}
                  width={maskDefinition.width}
                  height={maskDefinition.height}
                  rx={maskDefinition.rx}
                  ry={maskDefinition.ry}
                  fill="black"
                />
              )}
            </mask>
          ) : null,
        )}
      </defs>
    </svg>
  );
}

export function AvatarPresenceMaskDefs({ maskId, maskDefinition }) {
  if (!maskDefinition) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      focusable="false"
    >
      <defs>
        <mask
          id={maskId}
          maskContentUnits="objectBoundingBox"
          maskUnits="objectBoundingBox"
        >
          <rect width="1" height="1" fill="white" />
          <circle
            cx={maskDefinition.cx}
            cy={maskDefinition.cy}
            r={maskDefinition.r}
            fill="black"
          />
        </mask>
      </defs>
    </svg>
  );
}
