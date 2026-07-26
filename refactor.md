# Quickit UI — Plan de Refactor Total

## ✅ Completado: Unificación de estilos Input / Select / Textarea

Se creó `src/lib/components/_shared/form-field-base.ts` con constantes compartidas:
- `FORM_FIELD_AUTOFILL_CLASS` → `"qk-form-field-autofill"`
- `FORM_FIELD_BASE_CLASSES` → clases base comunes (transition, placeholder, focus-visible, disabled, outline, border)
- `FORM_FIELD_SIZE_CLASSES` → heights compartidos sm/md/lg
- `getFormFieldRadius(shape, size)` → radio unificado (pill → rounded-full, square → getControlRadius)
- `resolveFormFieldShape(shape)` → normaliza shape

### Cambios por componente
- **Input**: `INPUT_PRIMITIVES.base` ahora importa `FORM_FIELD_BASE_CLASSES` + `FORM_FIELD_AUTOFILL_CLASS`. `getInputRadius` delega en `getFormFieldRadius`.
- **Select**: `SELECT_PRIMITIVES.trigger` importa base compartida. Se añadió prop `shape` (square/pill). Usa `getFormFieldRadius`. Se actualizó `SelectProps` en `.d.ts`.
- **Textarea**: Corregido bug `qi-form-field-autofill` → `qk-form-field-autofill`. Importa base compartida. Usa `getFormFieldRadius` (antes usaba `getControlRadius(shape==="pill"? "lg": size)` que era inconsistente).
- **Tests**: Corregido `--qi-field-autofill-*` → `--qk-field-autofill-*` en form-field.test.jsx.

### Bugs preexistentes detectados (no corregidos)
- Tests de button/ripple/skeleton/tabs usan prefijo `qi-` (incorrecto) en lugar de `qk-` (correcto).
- TextareaProps en `.d.ts` no declara props `size` ni `shape` (existen en implementación).
- Textarea no soporta InputGroup.
