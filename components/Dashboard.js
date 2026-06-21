'use client'
import { useState } from 'react'
import { formatUGX, WINNERS, GAME_CONFIG } from '../lib/data'

const POOLS = [
  { id: 1, name: 'BRONZE POOL', stake: 200, color: '#CD7F32', glow: 'rgba(205,127,50,0.3)', players: 842, pot: 168000 },
  { id: 2, name: 'SILVER POOL', stake: 500, color: '#C0C0C0', glow: 'rgba(192,192,192,0.3)', players: 1543, pot: 771500 },
  { id: 3, name: 'GOLD POOL', stake: 1000, color: '#F5C842', glow: 'rgba(245,200,66,0.4)', players: 2241, pot: 2241000 },
]

export function Dashboard({ balance, history, onDeposit, onEnterPool, onLogout }) {
  const [tab, setTab] = useState('pools') // 'pools' | 'history' | 'winners'

  return (
    <div style={styles.container}>
      <div style={styles.inner}>

        {/* Balance card */}
        <div style={styles.balanceCard}>
          <p style={styles.balLabel}>WALLET BALANCE</p>
          <h1 style={styles.balAmount}>{formatUGX(balance)}</h1>
          <button onClick={onDeposit} style={styles.depositBtn}>+ DEPOSIT FUNDS</button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {['pools', 'history', 'winners'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              ...styles.tab,
              color: tab === t ? 'var(--gold)' : 'var(--text-dim)',
              borderBottom: tab === t ? '2px solid var(--gold)' : '2px solid transparent',
            }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Pools tab */}
        {tab === 'pools' && (
          <div style={styles.poolList}>
            {POOLS.map(pool => (
              <div key={pool.id} style={{ ...styles.poolCard, boxShadow: `0 0 30px ${pool.glow}` }}>
                <div style={styles.poolTop}>
                  <div>
                    <div style={{ ...styles.poolName, color: pool.color }}>{pool.name}</div>
                    <div style={styles.poolEntry}>Entry: {formatUGX(pool.stake)}</div>
                  </div>
                  <div style={styles.poolPot}>
                    <div style={styles.potLabel}>POT</div>
                    <div style={{ ...styles.potAmount, color: pool.color }}>{formatUGX(pool.pot)}</div>
                  </div>
                </div>
                <div style={styles.poolMeta}>
                  <span style={styles.poolMetaItem}>🟢 {pool.players.toLocaleString()} players live</span>
                  <span style={styles.poolMetaItem}>🏆 Top prize: {formatUGX(Math.floor(pool.pot * GAME_CONFIG.PRIZE_PERCENTAGE))}</span>
                </div>
                <button
                  onClick={() => onEnterPool(pool.stake)}
                  style={{ ...styles.enterBtn, background: pool.color, color: pool.color === '#C0C0C0' ? '#000' : '#000' }}
                >
                  ENTER POOL →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* History tab */}
        {tab === 'history' && (
          <div style={styles.historyList}>
            {history.length === 0 && (
              <p style={styles.emptyText}>No transactions yet. Deposit and play!</p>
            )}
            {history.map(h => (
              <div key={h.id} style={styles.historyItem}>
                <div>
                  <div style={styles.historyType}>{h.type}</div>
                  <div style={styles.historyDate}>{h.date}</div>
                </div>
                <div style={{ ...styles.historyAmount, color: h.amount > 0 ? 'var(--green)' : 'var(--red)' }}>
                  {h.amount > 0 ? '+' : ''}{formatUGX(h.amount)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Winners tab */}
        {tab === 'winners' && (
          <div style={styles.historyList}>
            {WINNERS.map((w, i) => (
              <div key={i} style={styles.historyItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={styles.winnerRank}>#{i + 1}</div>
                  <div>
                    <div style={styles.historyType}>{w.name}</div>
                    <div style={styles.historyDate}>{w.time} · Round {w.round}/10</div>
                  </div>
                </div>
                <div style={{ ...styles.historyAmount, color: 'var(--gold)' }}>+{formatUGX(w.amount)}</div>
              </div>
            ))}
          </div>
        )}

        <button onClick={onLogout} style={styles.logoutBtn}>LOGOUT</button>
      </div>
    </div>
  )
}

const styles = {
  container: { padding: '80px 20px 40px', maxWidth: 440, margin: '0 auto' },
  inner: { display: 'flex', flexDirection: 'column', gap: 24 },
  balanceCard: { background: 'linear-gradient(135deg, rgba(245,200,66,0.12), rgba(255,107,53,0.06))', border: '1px solid var(--border-gold)', borderRadius: 28, padding: '28px 24px', textAlign: 'center', animation: 'fadeUp 0.4s ease' },
  balLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text-dim)', marginBottom: 8 },
  balAmount: { fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--gold)', letterSpacing: 1, marginBottom: 20 },
  depositBtn: { background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 999, padding: '14px 32px', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 900, cursor: 'pointer', letterSpacing: 1 },
  tabs: { display: 'flex', borderBottom: '1px solid var(--border)' },
  tab: { flex: 1, padding: '12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, transition: 'all 0.2s' },
  poolList: { display: 'flex', flexDirection: 'column', gap: 16 },
  poolCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeUp 0.4s ease' },
  poolTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  poolName: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, letterSpacing: 1 },
  poolEntry: { fontSize: 12, color: 'var(--text-dim)', marginTop: 4 },
  poolPot: { textAlign: 'right' },
  potLabel: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-dim)', marginBottom: 4 },
  potAmount: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, letterSpacing: 1 },
  poolMeta: { display: 'flex', flexDirection: 'column', gap: 6 },
  poolMetaItem: { fontSize: 12, color: 'var(--text-dim)' },
  enterBtn: { width: '100%', padding: '18px', border: 'none', borderRadius: 18, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 900, cursor: 'pointer', letterSpacing: 1 },
  historyList: { display: 'flex', flexDirection: 'column', gap: 2 },
  historyItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 4px', borderBottom: '1px solid var(--border)' },
  historyType: { fontSize: 14, fontWeight: 600, color: 'var(--text)' },
  historyDate: { fontSize: 11, color: 'var(--text-dim)', marginTop: 3 },
  historyAmount: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800 },
  winnerRank: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: 'var(--gold)', width: 32 },
  emptyText: { fontSize: 14, color: 'var(--text-dim)', textAlign: 'center', padding: '40px 0' },
  logoutBtn: { background: 'none', border: '1px solid var(--border)', borderRadius: 14, padding: '14px', color: 'var(--text-dim)', fontSize: 12, fontWeight: 800, cursor: 'pointer', letterSpacing: 1, marginTop: 12 },
}
