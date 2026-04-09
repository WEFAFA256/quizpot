'use client'
import { useState } from 'react'
import { formatUGX } from '../lib/data'

const POOLS = [
  { id: 'bronze', name: 'BRONZE', stake: 200, pot: '150K', color: '#CD7F32' },
  { id: 'silver', name: 'SILVER', stake: 1000, pot: '850K', color: '#C0C0C0' },
  { id: 'gold', name: 'GOLD VIP', stake: 10000, pot: '15.5M', color: '#F5C842' }
]

export default function LandingScreen({ onSelectPool }) {
  return (
    <div style={styles.container}>
      <div style={styles.bgElements}>
        <div style={styles.glowTop} />
        <div style={styles.glowBottom} />
      </div>

      <div style={styles.header}>
        <h1 style={styles.logo}>QUIZ<span style={styles.logoAccent}>POT</span></h1>
        <p style={styles.tagline}>Select a pool to enter today's live draws.</p>
      </div>

      <div style={styles.poolsGrid}>
        {POOLS.map(pool => (
          <div key={pool.id} style={{ ...styles.poolCard, borderColor: pool.color }}>
            <div style={{ ...styles.poolHeader, background: `linear-gradient(135deg, ${pool.color}22, ${pool.color}05)` }}>
              <div style={styles.poolNameRow}>
                <h3 style={{ ...styles.poolName, color: pool.color }}>{pool.name}</h3>
                <span style={styles.liveBadge}><span style={styles.dot} /> Live</span>
              </div>
              <div style={styles.potRow}>
                <span style={styles.potLabel}>ESTIMATED POT</span>
                <span style={{ ...styles.potValue, color: pool.color }}>{pool.pot}</span>
              </div>
            </div>
            
            <div style={styles.poolFooter}>
              <div style={styles.stakeInfo}>
                <span style={styles.stakeLabel}>Entry Fee:</span>
                <span style={styles.stakeValue}>{formatUGX(pool.stake)}</span>
              </div>
              <button 
                onClick={() => onSelectPool(pool.stake)} 
                style={{ ...styles.joinBtn, background: pool.color, color: pool.id === 'gold' ? '#000' : '#fff' }}
              >
                JOIN POOL →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={styles.footer}>
        <p>Must be 18+ to play. Gamble responsibly.</p>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '40px 20px', maxWidth: '440px', margin: '0 auto', position: 'relative' },
  bgElements: { position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' },
  glowTop: { position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '50%', background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)' },
  glowBottom: { position: 'absolute', bottom: '-10%', right: '-10%', width: '120%', height: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 70%)' },
  
  header: { zIndex: 1, textAlign: 'center', marginBottom: 40, animation: 'fadeUp 0.6s ease' },
  logo: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 900, color: '#fff', letterSpacing: 4 },
  logoAccent: { color: 'var(--gold)' },
  tagline: { color: 'var(--text-dim)', fontSize: 14, fontFamily: 'var(--font-mono)', marginTop: 8 },

  poolsGrid: { zIndex: 1, display: 'flex', flexDirection: 'column', gap: 20 },
  poolCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid', borderRadius: 24, overflow: 'hidden', backdropFilter: 'blur(10px)', transition: 'transform 0.2s', cursor: 'pointer', animation: 'fadeUp 0.6s 0.2s ease backwards' },
  poolHeader: { padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' },
  poolNameRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  poolName: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, letterSpacing: 2 },
  liveBadge: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,229,160,0.1)', padding: '4px 10px', borderRadius: 20, fontSize: 10, color: 'var(--green)', fontFamily: 'var(--font-mono)', letterSpacing: 1 },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' },
  potRow: { display: 'flex', flexDirection: 'column', gap: 4 },
  potLabel: { fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' },
  potValue: { fontSize: 36, fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' },
  
  poolFooter: { padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  stakeInfo: { display: 'flex', flexDirection: 'column' },
  stakeLabel: { fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' },
  stakeValue: { fontSize: 16, color: '#fff', fontWeight: 700 },
  
  joinBtn: { padding: '12px 24px', border: 'none', borderRadius: 16, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, letterSpacing: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.2)', transition: 'transform 0.2s' },
  
  footer: { zIndex: 1, textAlign: 'center', marginTop: 'auto', paddingTop: 40, fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }
}
