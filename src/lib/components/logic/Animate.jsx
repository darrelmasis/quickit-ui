/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

/**
 * Animate es un componente de lógica pura que gestiona el ciclo de vida
 * de entrada y salida para animaciones declarativas.
 */
export function Animate({ children, duration = 140, show }) {
  const [shouldRender, setShouldRender] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      
      const frameId = window.requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => window.cancelAnimationFrame(frameId);
    }

    // Usamos requestAnimationFrame tambin para el cierre para mantener consistencia
    // y evitar advertencias de set-state-in-effect si la regla es estricta.
    const closeFrameId = window.requestAnimationFrame(() => {
      setVisible(false);
    });

    const timer = setTimeout(() => {
      setShouldRender(false);
    }, duration);

    return () => {
      window.cancelAnimationFrame(closeFrameId);
      clearTimeout(timer);
    };
  }, [show, duration]);

  if (!shouldRender) {
    return null;
  }

  return children(visible);
}
