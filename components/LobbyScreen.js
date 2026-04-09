'use client'
import { useEffect, useState } from 'react'
import { formatUGX } from '../lib/data'

export default function LobbyScreen({ onStart, pot, players }) {
  const [countdown, setCountdown] = useState(8)
  const [msgs, setMsgs] = useState([])

  const joinMsgs = [
    'Moses K. just joined! 🔥', 'Amina S. entered the game 💪',
    'Brian O. is ready! ⚡', 'Fatuma M. joined — 1 more soul 😈',
    'David N. just paid! 🏆', 'Grace A. entered! 💫',
  ]

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(t); onStart(); return 0; }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setMsgs(m => [joinMsgs[Math.floor(Math.random() * joinMsgs.length)], ...m.slice(0, 3)])
    }, 1800)
    return () => clearInterval(t)
  }, [])

  const circumference = 2 * Math.PI * 44
  const progress = (countdown / 8) * circumference

  return (
    <div style={styles.container}>
      <div style={styles.bg} />
      <div style={styles.inner}>
        <div style={styles.top}>
          <span style={styles.badge}>GAME STARTING</span>
          <h2 style={styles.title}>GET READY!</h2>
          <p style={styles.sub}>Prepare yourself. The elimination begins.</p>
        </div>

        {/* Countdown circle */}
        <div style={styles.clockWrap}>
          <svg width={110} height={110} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={55} cy={55} r={44} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
            <circle cx={55} cy={55} r={44} fill="none" stroke="var(--gold)" strokeWidth={4}
              strokeDasharray={circumference} strokeDashoffset={circumference - progress}
              strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div style={styles.clockNum}>{countdown}</div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.stat}>
            <span style={styles.statN}>{players.toLocaleString()}</span>
            <span style={styles.statL}>Players Ready</span>
          </div>
          <div style={styles.stat}>
            <span style={{ ...styles.statN, color: 'var(--gold)' }}>{formatUGX(pot)}</span>
            <span style={styles.statL}>Prize Pot</span>
          </div>
        </div>

        {/* Live feed */}
        <div style={styles.feed}>
          <p style={styles.feedTitle}>LIVE ACTIVITY</p>
          <div style={styles.feedList}>
            {msgs.map((m, i) => (
              <div key={i} style={{ ...styles.feedItem, opacity: 1 - i * 0.2, animation: i === 0 ? 'fadeUp 0.3s ease' : 'none' }}>
                {m}
              </div>
            ))}
            {msgs.length === 0 && <div style={styles.feedItem}>Waiting for players...</div>}
          </div>
        </div>

        <div style={styles.tip}>
          💡 <strong>TIP:</strong> Read questions fast. You have only <strong>15 seconds</strong> per round!
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', position: 'relative', padding: '32px 20px 40px', maxWidth: 440, margin: '0 auto' },
  bg: { position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(245,200,66,0.07) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 },
  inner: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 },
  top: { textAlign: 'center', animation: 'fadeUp 0.5s ease' },
  badge: { display: 'inline-block', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', letterSpacing: 1, marginBottom: 14 },
  title: { fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 900, letterSpacing: 3, color: '#fff', marginBottom: 6 },
  sub: { fontSize: 14, color: 'var(--text-dim)' },
  clockWrap: { position: 'relative', width: 110, height: 110, animation: 'scaleIn 0.4s ease' },
  clockNum: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 900, color: 'var(--gold)' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', animation: 'fadeUp 0.5s 0.1s ease both' },
  stat: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '18px 12px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 },
  statN: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff' },
  statL: { fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 },
  feed: { width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, animation: 'fadeUp 0.5s 0.2s ease both' },
  feedTitle: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text-dim)', marginBottom: 12 },
  feedList: { display: 'flex', flexDirection: 'column', gap: 8 },
  feedItem: { fontSize: 13, color: 'var(--text)', padding: '6px 0', borderBottom: '1px solid var(--border)' },
  tip: { width: '100%', background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)', borderRadius: 12, padding: '14px 16px', fontSize: 13, color: '#7FFFD4', animation: 'fadeUp 0.5s 0.3s ease both' },
}
