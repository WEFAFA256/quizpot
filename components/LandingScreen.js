'use client'
import { useState } from 'react'

export default function LandingScreen({ onJoin, onLogin }) {
  const [dummyPools] = useState([
    { name: '1,000 UGX POOL', stake: 1000, pot: '1.2M', color: '#F5C842' },
    { name: '500 UGX POOL', stake: 500, pot: '450K', color: '#C0C0C0' },
    { name: '200 UGX POOL', stake: 200, pot: '150K', color: '#CD7F32' },
  ])

  return (
    <div style={styles.container}>
      {/* Background Animated Pools */}
      <div style={styles.bgOverlay}>
        {dummyPools.map((p, i) => (
          <div key={i} style={{ ...styles.bgCard, borderLeft: `6px solid ${p.color}`, animationDelay: `${i * 3}s`, top: `${15 + i * 25}%` }}>
            <div style={{ color: p.color, fontWeight: 900, letterSpacing: 1 }}>{p.name} DRAW</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>POT: {p.pot}</div>
            <div style={styles.liveTag}><span style={styles.dot} /> {Math.floor(Math.random() * 500 + 100)} PLAYERS</div>
          </div>
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.heroSection}>
          <h1 style={styles.heroTitle}>QUIZPOT</h1>
          <p style={styles.heroSub}>Deposit once, play forever. Uganda's #1 daily survival trivia.</p>
        </div>

        <div style={styles.actions}>
          <button onClick={onJoin} style={styles.actionBtn}>JOIN GAME</button>
          <button onClick={onLogin} style={{ ...styles.actionBtn, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>LOGIN</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 24px', background: 'radial-gradient(circle at center, #101014 0%, #060608 100%)' },
  bgOverlay: { position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none' },
  bgCard: { position: 'absolute', right: '-60%', width: '90%', padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 32, animation: 'floatAcross 15s linear infinite' },
  liveTag: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, marginTop: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)' },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' },

  content: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 60, position: 'relative', zIndex: 1 },
  heroSection: { textAlign: 'center' },
  heroTitle: { fontSize: 80, fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: 8, color: '#fff', textShadow: '0 0 40px rgba(255,255,255,0.15)' },
  heroSub: { fontSize: 16, color: 'var(--text-dim)', maxWidth: '260px', margin: '16px auto 0', lineHeight: 1.6, fontWeight: 500 },

  actions: { display: 'flex', gap: 16, width: '100%', maxWidth: '340px' },
  actionBtn: { flex: 1, height: '64px', borderRadius: '32px', background: 'var(--gold)', color: '#000', border: 'none', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, letterSpacing: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', boxShadow: '0 10px 30px rgba(245,200,66,0.15)' }
}
