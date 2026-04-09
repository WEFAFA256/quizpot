'use client'
import { useState, useEffect } from 'react'

const POOLS = [
  { id: 'bronze', name: 'BRONZE POOL', stake: 200, potStr: '150K', players: 842, color: '#CD7F32', gradient: 'rgba(205, 127, 50, 0.15)' },
  { id: 'silver', name: 'SILVER POOL', stake: 1000, potStr: '850K', players: 410, color: '#C0C0C0', gradient: 'rgba(192, 192, 192, 0.15)' },
  { id: 'gold', name: 'GOLD VIP', stake: 10000, potStr: '15.5M', players: 89, color: 'var(--gold)', gradient: 'rgba(245, 200, 66, 0.15)' }
]

export default function AppHome({ balance, onJoinPool }) {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div style={styles.container}>
      <div style={styles.bgGrid} />
      
      {/* App Header */}
      <div style={styles.header}>
        <div style={styles.userProfile}>
          <div style={styles.avatar}>👤</div>
          <div>
            <div style={styles.username}>@BadmanUG</div>
            <div style={styles.walletAddress}>Ton: EQD4...2x1</div>
          </div>
        </div>
        <div style={styles.headerGlow} />
      </div>

      {/* Balance Card */}
      <div style={styles.balanceCard}>
        <p style={styles.balanceLabel}>TOTAL BALANCE</p>
        <h1 style={styles.balanceAmount}>
          <span style={styles.currency}>UGX</span> {balance.toLocaleString()}
        </h1>
        <div style={styles.balanceActions}>
          <button style={styles.depositBtn}>+ DEPOSIT</button>
          <button style={styles.withdrawBtn}>WITHDRAW</button>
        </div>
      </div>

      {/* Live Ticker */}
      <div style={styles.tickerFrame}>
        <div style={styles.tickerContent}>
          🔥 Kaggwa just cashed out UGX 15,000 at 3x in Bronze! • 🤑 Stella hit 10x in Silver! 
        </div>
      </div>

      {/* Pools Selection */}
      <div style={styles.poolsSection}>
        <h3 style={styles.sectionTitle}>SELECT YOUR STAKE</h3>
        <p style={styles.sectionSub}>Higher stakes mean massive multipliers. Choose your risk.</p>
        
        <div style={styles.poolsList}>
          {POOLS.map(pool => (
            <div key={pool.id} style={{ ...styles.poolCard, borderLeft: `4px solid ${pool.color}`, background: `linear-gradient(90deg, ${pool.gradient}, transparent)` }}>
              <div style={styles.poolInfo}>
                <h4 style={{ ...styles.poolName, color: pool.color }}>{pool.name}</h4>
                <div style={styles.poolStats}>
                  <span style={styles.liveUsers}><span style={styles.liveDot} /> {pool.players} waiting</span>
                  <span style={styles.estPot}>🏆 Est. Pot: {pool.potStr}</span>
                </div>
              </div>
              
              <button style={{ ...styles.joinBtn, background: pool.color }} onClick={() => onJoinPool(pool.stake)}>
                <span style={styles.joinBtnInner}>PLAY</span>
                <span style={styles.joinBtnPrice}>UGX {pool.stake.toLocaleString()}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* App Bottom Nav (Telegram Style) */}
      <div style={styles.bottomNav}>
        {['home', 'history', 'wallet', 'leaderboard'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ ...styles.navTab, color: activeTab === tab ? 'var(--gold)' : 'var(--text-dim)' }}
          >
            <div style={styles.navIcon}>
              {tab === 'home' ? '🎮' : tab === 'history' ? '⏱' : tab === 'wallet' ? '💳' : '🏆'}
            </div>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', padding: '16px 16px 80px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 },
  bgGrid: { position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none', zIndex: 0 },
  
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 },
  userProfile: { display: 'flex', gap: 12, alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 },
  username: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: 1 },
  walletAddress: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' },
  
  balanceCard: { background: 'linear-gradient(145deg, rgba(30,30,35,0.9), rgba(15,15,20,0.9))', border: '1px solid var(--border)', borderRadius: 20, padding: '24px', textAlign: 'center', position: 'relative', zIndex: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  balanceLabel: { fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2, color: 'var(--text-dim)', marginBottom: 8 },
  balanceAmount: { fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, color: '#fff', margin: '0 0 20px', textShadow: '0 2px 10px rgba(255,255,255,0.1)' },
  currency: { color: 'var(--gold)', fontSize: 24, verticalAlign: 'middle' },
  balanceActions: { display: 'flex', gap: 12 },
  depositBtn: { flex: 1, padding: '14px', background: 'var(--gold)', border: 'none', borderRadius: 12, color: '#000', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(245,200,66,0.3)' },
  withdrawBtn: { flex: 1, padding: '14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, cursor: 'pointer' },

  tickerFrame: { background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 8, padding: '8px 12px', overflow: 'hidden', position: 'relative', zIndex: 1 },
  tickerContent: { whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FFAC81', animation: 'shimmer 10s linear infinite' },

  poolsSection: { position: 'relative', zIndex: 1, marginTop: 10 },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: 1 },
  sectionSub: { fontSize: 13, color: 'var(--text-dim)', marginBottom: 16 },
  poolsList: { display: 'flex', flexDirection: 'column', gap: 12 },
  poolCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 16, border: '1px solid var(--border)' },
  poolInfo: { display: 'flex', flexDirection: 'column', gap: 4 },
  poolName: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: 1, textShadow: '0 0 10px rgba(0,0,0,0.5)' },
  poolStats: { display: 'flex', gap: 12, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' },
  liveUsers: { display: 'flex', alignItems: 'center', gap: 4 },
  liveDot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 5px var(--green)' },
  joinBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 16px', border: 'none', borderRadius: 10, cursor: 'pointer', color: '#000' },
  joinBtnInner: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800 },
  joinBtnPrice: { fontSize: 11, fontWeight: 600, opacity: 0.8 },

  bottomNav: { position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 440, margin: '0 auto', background: 'rgba(10,10,12,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-around', padding: '12px 10px 24px', zIndex: 100 },
  navTab: { background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 10 },
  navIcon: { fontSize: 24 },
}
