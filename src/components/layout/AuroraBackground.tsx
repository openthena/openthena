/**
 * Fixed, decorative cyber-aurora backdrop: layered gradient blobs that drift,
 * a faint grid, and a vignette. Purely presentational, sits behind all content.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-navy-950"
    >
      {/* base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#0b2846_0%,#04101f_55%)]" />

      {/* drifting aurora blobs */}
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-aurora-blue/25 blur-[120px] animate-aurora" />
      <div className="absolute top-1/3 -left-40 h-[34rem] w-[34rem] rounded-full bg-aurora-violet/20 blur-[120px] animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-0 right-0 h-[36rem] w-[36rem] translate-x-1/4 translate-y-1/4 rounded-full bg-aurora-cyan/20 blur-[120px] animate-aurora [animation-delay:-12s]" />

      {/* faint grid */}
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_55%,#04101f_100%)]" />
    </div>
  );
}
