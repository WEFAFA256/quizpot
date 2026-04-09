'use client'
import { useState } from 'react'
import { formatUGX } from '../lib/data'

export function Dashboard({ balance, history, onDeposit, onEnterPool, onLogout }) {
  const POOLS = [
    { name: '1,000 UGX POOL', stake: 1000, pot: '1.2M+', color: '#F5C842', details: 'The Elite Pot. Major players only.' },
    { name: '500 UGX POOL', stake: 500, pot: '450K+', color: '#C0C0C0', details: 'Regular pool. Faster draws.' },
    { name: '200 UGX POOL', stake: 200, pot: '150K+', color: '#CD7F32', details: 'Casual pool. Great for winning streak.' }
  ]

  return (
    <div style={styles.container}>
      {/* Wallet Card */}
      <div style={styles.walletCard}>
        <div>
          <p style={styles.balanceLabel}>QUIZPOT WALLET</p>
          <h1 style={styles.balanceAmount}>{formatUGX(balance)}</h1>
        </div>
        <div style={styles.walletActions}>
          <button onClick={onDeposit} style={styles.depositBtn}>+ DEPOSIT</button>
          <button onClick={onLogout} style={styles.logoutBtn}>LOGOUT</button>
        </div>
      </div>

      {/* Pools Section */}
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>SELECT A DRAW</h3>
        <span style={styles.liveIndicator}><span style={styles.dot} /> PLAYERS ACTIVE</span>
      </div>

      <div style={styles.poolsGrid}>
        {POOLS.map(pool => (
          <button 
            key={pool.name} 
            onClick={() => onEnterPool(pool.stake)}
            style={{ ...styles.poolCard, borderLeft: `6px solid ${pool.color}` }}
          >
            <div style={styles.poolMain}>
               <h4 style={{...styles.poolName, color: pool.color}}>{pool.name}</h4>
               <p style={styles.poolDetailsText}>{pool.details}</p>
            </div>
            
            <div style={styles.poolStatsArea}>
              <div style={styles.statBox}>
                <span style={styles.statLabel}>STAKE</span>
                <span style={styles.statValue}>{formatUGX(pool.stake)}</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statLabel}>EST. POT</span>
                <span style={{...styles.statValue, color: pool.color}}>{pool.pot}</span>
              </div>
            </div>
            
            <div style={styles.joinHint}>TAP TO ENTER DRAW →</div>
          </button>
        ))}
      </div>

      {/* History Section */}
      <h3 style={styles.sectionTitle}>RECENT ACTIVITY</h3>
      <div style={styles.historyList}>
        {history.length === 0 ? (
          <p style={styles.emptyText}>Start playing to see your wins and losses here.</p>
        ) : (
          history.map((h, i) => (
            <div key={i} style={styles.historyItem}>
              <div>
                <div style={styles.historyType}>{h.type}</div>
                <div style={styles.historyDate}>{h.date}</div>
              </div>
              <div style={{ ...styles.historyAmount, color: h.amount > 0 ? 'var(--green)' : 'var(--red)' }}>
                {h.amount > 0 ? '+' : ''}{h.amount.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { padding: '80px 20px 100px', display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeIn 0.5s ease' },
  walletCard: { background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  balanceLabel: { fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: 2, fontWeight: 700 },
  balanceAmount: { fontSize: 34, fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff' },
  walletActions: { display: 'flex', flexDirection: 'column', gap: 10 },
  depositBtn: { background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 14, padding: '12px 20px', fontWeight: 900, fontSize: 13, cursor: 'pointer', boxShadow: '0 8px 16px rgba(245,200,66,0.2)' },
  logoutBtn: { background: 'none', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 16px', fontWeight: 700, fontSize: 10, cursor: 'pointer' },

  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 13, fontWeight: 900, color: 'var(--text-dim)', letterSpacing: 2, textTransform: 'uppercase' },
  liveIndicator: { fontSize: 10, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontFamily: 'var(--font-mono)' },
  dot: { width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 12px var(--green)' },

  poolsGrid: { display: 'flex', flexDirection: 'column', gap: 16 },
  poolCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 28, padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease' },
  poolMain: { display: 'flex', flexDirection: 'column', gap: 6 },
  poolName: { fontSize: 24, fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: 1 },
  poolDetailsText: { fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 },
  
  poolStatsArea: { display: 'flex', gap: 20, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 },
  statBox: { display: 'flex', flexDirection: 'column', gap: 4 },
  statLabel: { fontSize: 9, color: 'var(--text-dim)', fontWeight: 800, letterSpacing: 1 },
  statValue: { fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' },
  
  joinHint: { fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.2)', letterSpacing: 1, textAlign: 'right', marginTop: -4 },

  historyList: { display: 'flex', flexDirection: 'column', gap: 12 },
  historyItem: { background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 20, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  historyType: { fontSize: 14, fontWeight: 800, color: '#fff' },
  historyDate: { fontSize: 11, color: 'var(--text-dim)' },
  historyAmount: { fontSize: 16, fontWeight: 900, fontFamily: 'var(--font-mono)' },
  emptyText: { textAlign: 'center', color: 'var(--text-dim)', fontSize: 13, padding: '30px 0' }
}
