export default function WebsiteBackground() {
  return (
    <>
      {/* Malla decorativa con tres elipses de color */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.12] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 0%, rgb(59 130 246 / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgb(168 85 247 / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgb(34 211 238 / 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Patrón de puntos sutil */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.15] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(163 163 163) 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
        }}
      />
    </>
  );
}
