'use client'
import { useEffect, useState } from 'react'

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) return
    const arr = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#F5C842','#FF6B35','#00E5A0','#FF3B5C','#4FC3F7','#CE93D8'][Math.floor(Math.random() * 6)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 2,
      rotation: Math.random() * 720,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }))
    setPieces(arr)
    const t = setTimeout(() => setPieces([]), 5000)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          bottom: '-20px',
          width: p.shape === 'circle' ? p.size : p.size * 0.6,
          height: p.size,
          background: p.color,
          borderRadius: p.shape === 'circle' ? '50%' : '2px',
          animation: `floatUp ${p.duration}s ${p.delay}s ease-out forwards`,
        }} />
      ))}
    </div>
  )
}
