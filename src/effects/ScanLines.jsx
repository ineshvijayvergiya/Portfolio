export default function ScanLines() {
  return (
    <>
      {/* Static scan lines */}
      <div
        className="scanline-overlay"
        aria-hidden="true"
      />
      {/* Moving scan beam */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.08), transparent)',
            animation: 'scanline 10s linear infinite',
            animationDelay: '2s',
          }}
        />
      </div>
    </>
  )
}
