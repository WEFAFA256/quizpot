'use client'
import { useState } from 'react'
import { formatUGX } from '../lib/data'

export function Dashboard({ balance, history, onDeposit, onEnterPool }) {
  const POOLS = [
    { name: 'BRONZE', stake: 200, pot: '150K', color: '#CD7F32' },
    { name: 'SILVER', stake: 1000, pot: '850K', color: '#C0C0C0' },
    { name: 'GOLD VIP', stake: 10000, pot: '15.5M', color: '#F5C842' }
  ]

  return (
    <div style={styles.container}>
      {/* Wallet Card */}
      <div style={styles.walletCard}>
        <div>
          <p style={styles.balanceLabel}>QUIZPOT BALANCE</p>
          <h1 style={styles.balanceAmount}>{formatUGX(balance)}</h1>
        </div>
        <button onClick={onDeposit} style={styles.depositBtn}>+ DEPOSIT</button>
      </div>

      {/* Pools Section */}
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>ACTIVE POOLS</h3>
        <span style={styles.liveIndicator}><span style={styles.dot} /> LIVE</span>
      </div>

      <div style={styles.poolsGrid}>
        {POOLS.map(pool => (
          <button 
            key={pool.name} 
            onClick={() => onEnterPool(pool.stake)}
            style={{ ...styles.poolBtn, borderLeft: `4px solid ${pool.color}` }}
          >
            <div style={styles.poolInfo}>
              <span style={{ ...styles.poolName, color: pool.color }}>{pool.name}</span>
              <span style={styles.poolPot}>POT: {pool.pot}</span>
            </div>
            <div style={styles.poolStake}>
              STAKE: {formatUGX(pool.stake)}
            </div>
          </button>
        ))}
      </div>

      {/* History Section */}
      <h3 style={styles.sectionTitle}>TRANSACTION HISTORY</h3>
      <div style={styles.historyList}>
        {history.length === 0 ? (
          <p style={styles.emptyText}>No games played yet. Enter a pool to start winning!</p>
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
  container: { padding: '80px 20px 40px', display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeIn 0.5s ease' },
  walletCard: { background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
  balanceLabel: { fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: 1 },
  balanceAmount: { fontSize: 32, fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff' },
  depositBtn: { background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 12, padding: '12px 20px', fontWeight: 800, fontSize: 13, cursor: 'pointer' },

  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: 800, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase' },
  liveIndicator: { fontSize: 10, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' },

  poolsGrid: { display: 'flex', flexDirection: 'column', gap: 12 },
  poolBtn: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' },
  poolInfo: { display: 'flex', flexDirection: 'column', gap: 2 },
  poolName: { fontSize: 18, fontWeight: 900, fontFamily: 'var(--font-display)' },
  poolPot: { fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 },
  poolStake: { fontSize: 14, fontWeight: 700, color: '#fff' },

  historyList: { display: 'flex', flexDirection: 'column', gap: 10 },
  historyItem: { background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  historyType: { fontSize: 14, fontWeight: 700, color: '#fff' },
  historyDate: { fontSize: 11, color: 'var(--text-dim)' },
  historyAmount: { fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)' },
  emptyText: { textAlign: 'center', color: 'var(--text-dim)', fontSize: 13, padding: '20px 0' }
}
