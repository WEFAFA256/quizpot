'use client'
import { useState } from 'react'

export default function LandingScreen({ onJoin, onLogin }) {
  const [dummyPools] = useState([
    { name: 'GOLD VIP', stake: 1000, pot: '1.2M', color: '#F5C842' },
    { name: 'SILVER', stake: 500, pot: '450K', color: '#C0C0C0' },
  ])

  return (
    <div style={styles.container}>
      {/* Background Animated Pools */}
      <div style={styles.bgOverlay}>
        {dummyPools.map((p, i) => (
          <div key={i} style={{ ...styles.bgCard, borderLeft: `4px solid ${p.color}`, animationDelay: `${i * 2}s`, top: `${20 + i * 30}%` }}>
            <div style={{ color: p.color, fontWeight: 900 }}>{p.name} ENTRY</div>
            <div style={{ fontSize: 24, fontWeight: 900 }}>POT: {p.pot}</div>
            <div style={styles.liveTag}><span style={styles.dot} /> LIVE</div>
          </div>
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.heroSection}>
          <h1 style={styles.heroTitle}>QUIZPOT</h1>
          <p style={styles.heroSub}>The world's first crowd-funded survival trivia. Deposit once, play forever.</p>
        </div>

        <div style={styles.actions}>
          <button onClick={onJoin} style={styles.signUpBtn}>JOIN GAME</button>
          <button onClick={onLogin} style={styles.loginBtn}>LOGIN</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px 20px' },
  bgOverlay: { position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: 'none' },
  bgCard: { position: 'absolute', right: '-50%', width: '80%', padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, animation: 'floatAcross 12s linear infinite' },
  liveTag: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, marginTop: 8, color: 'var(--green)' },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' },

  content: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 40 },
  heroSection: { textAlign: 'center' },
  heroTitle: { fontSize: 64, fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: 4, textShadow: '0 0 30px rgba(255,255,255,0.1)' },
  heroSub: { fontSize: 15, color: 'var(--text-dim)', maxWidth: '280px', margin: '12px auto 0', lineHeight: 1.5 },

  actions: { display: 'flex', gap: 12 },
  signUpBtn: { flex: 1.5, padding: '16px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 16, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 30px rgba(245,200,66,0.2)' },
  loginBtn: { flex: 1, padding: '16px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }
}
