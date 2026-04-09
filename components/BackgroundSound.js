'use client'
import { useState, useRef, useEffect } from 'react'

export default function BackgroundSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Try to play on first user interaction
    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e))
        setIsPlaying(true)
      }
    }
    window.addEventListener('mousedown', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    return () => {
      window.removeEventListener('mousedown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [isPlaying])

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" 
      />
      <button 
        onClick={() => {
          if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
          else { audioRef.current.play(); setIsPlaying(true); }
        }}
        style={styles.btn}
      >
        <div style={styles.barContainer}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ 
              ...styles.bar, 
              animation: isPlaying ? `audioBar ${0.5 + i*0.1}s ease-in-out infinite` : 'none',
              height: isPlaying ? '12px' : '4px'
            }} />
          ))}
        </div>
      </button>
    </>
  )
}

const styles = {
  btn: { position: 'fixed', top: 24, right: 24, zIndex: 1000, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' },
  barContainer: { display: 'flex', alignItems: 'center', gap: 2, height: 16 },
  bar: { width: 3, background: 'var(--gold)', borderRadius: 2 }
}
