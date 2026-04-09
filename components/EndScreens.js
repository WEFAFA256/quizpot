'use client'
import { formatUGX, GAME_CONFIG } from '../lib/data'

export function EliminatedScreen({ round, totalRounds, playersLeft, onPlayAgain, onHome }) {
  const percentage = Math.round((round / totalRounds) * 100)

  return (
    <div style={styles.container}>
      <div style={styles.bgRed} />
      <div style={styles.inner}>
        <div style={styles.iconWrap}>
          <div style={styles.iconCircle}>💀</div>
        </div>

        <div style={styles.textBlock}>
          <p style={styles.subText}>ELIMINATED IN</p>
          <h1 style={styles.bigRound}>ROUND {round}</h1>
          <p style={{ ...styles.subText, marginTop: 4 }}>of {totalRounds}</p>
        </div>

        {/* Performance bar */}
        <div style={styles.perfCard}>
          <div style={styles.perfHeader}>
            <span style={styles.perfLabel}>YOUR PERFORMANCE</span>
            <span style={styles.perfPct}>{percentage}%</span>
          </div>
          <div style={styles.perfBarBg}>
            <div style={{ ...styles.perfBarFill, width: `${percentage}%` }} />
          </div>
          <p style={styles.perfNote}>
            {percentage < 30 ? "You'll get there! Keep practicing 💪" :
             percentage < 60 ? "Not bad! You were above average 🔥" :
             percentage < 90 ? "So close! You were among the top players! ⚡" :
             "LEGENDARY performance! Just one more round! 🏆"}
          </p>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statN}>{round}</span>
            <span style={styles.statL}>Rounds Survived</span>
          </div>
          <div style={styles.statBox}>
            <span style={{ ...styles.statN, color: 'var(--green)' }}>{playersLeft.toLocaleString()}</span>
            <span style={styles.statL}>Still Alive</span>
          </div>
        </div>

        <div style={styles.tryAgainCard}>
          <p style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 4 }}>Think you can go further?</p>
          <p style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Re-enter for just {formatUGX(GAME_CONFIG.ENTRY_FEE)} 👇</p>
        </div>

        <button style={styles.btnPrimary} onClick={onPlayAgain}>
          PLAY AGAIN • {formatUGX(GAME_CONFIG.ENTRY_FEE)}
        </button>
        <button style={styles.btnGhost} onClick={onHome}>
          Back to Home
        </button>
      </div>
    </div>
  )
}

export function WinnerScreen({ pot, payMethod, onPlayAgain, onHome }) {
  const prize = Math.floor(pot * GAME_CONFIG.PRIZE_PERCENTAGE)

  return (
    <div style={styles.container}>
      <div style={styles.bgGold} />
      <div style={styles.inner}>
        <div style={{ ...styles.iconWrap, animation: 'scaleIn 0.5s ease' }}>
          <div style={{ ...styles.iconCircle, background: 'rgba(245,200,66,0.15)', border: '2px solid var(--gold)', fontSize: 60 }}>🏆</div>
        </div>

        <div style={{ ...styles.textBlock, animation: 'fadeUp 0.5s 0.2s ease both' }}>
          <p style={{ ...styles.subText, color: 'var(--gold)' }}>YOU SURVIVED ALL 10 ROUNDS</p>
          <h1 style={{ ...styles.bigRound, background: 'linear-gradient(135deg, #F5C842, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            CHAMPION!
          </h1>
        </div>

        <div style={{ ...styles.prizeCard, animation: 'fadeUp 0.5s 0.3s ease both' }}>
          <p style={styles.prizeLabel}>YOUR PRIZE</p>
          <p style={styles.prizeAmount}>{formatUGX(prize)}</p>
          <p style={styles.prizeSub}>70% of total pot · {formatUGX(pot)} collected</p>
        </div>

        <div style={{ ...styles.statsRow, animation: 'fadeUp 0.5s 0.4s ease both' }}>
          <div style={styles.statBox}>
            <span style={{ ...styles.statN, color: 'var(--gold)' }}>10/10</span>
            <span style={styles.statL}>Rounds Won</span>
          </div>
          <div style={styles.statBox}>
            <span style={{ ...styles.statN, color: 'var(--green)' }}>TOP 0.1%</span>
            <span style={styles.statL}>All Players</span>
          </div>
        </div>

        <button style={{ ...styles.btnPrimary, background: 'linear-gradient(135deg, var(--green), #00a77d)', animation: 'fadeUp 0.5s 0.5s ease both' }}>
          💸 WITHDRAW TO {payMethod === 'mtn' ? 'MTN MOMO' : 'AIRTEL MONEY'}
        </button>

        <button style={{ ...styles.btnGhost, borderColor: '#25D366', color: '#25D366', animation: 'fadeUp 0.5s 0.6s ease both' }}>
          📤 Share on WhatsApp
        </button>

        <button style={{ ...styles.btnGhost, animation: 'fadeUp 0.5s 0.7s ease both' }} onClick={onHome}>
          Back to Home
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', position: 'relative', padding: '32px 20px 40px', maxWidth: 440, margin: '0 auto' },
  bgRed: { position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,59,92,0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 },
  bgGold: { position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,200,66,0.1) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 },
  inner: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 },
  iconWrap: { animation: 'scaleIn 0.4s ease' },
  iconCircle: { width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,59,92,0.1)', border: '2px solid var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, animation: 'shake 0.6s 0.2s ease' },
  textBlock: { textAlign: 'center', animation: 'fadeUp 0.5s 0.2s ease both' },
  subText: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--text-dim)', textTransform: 'uppercase' },
  bigRound: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 900, letterSpacing: 3, color: 'var(--red)', lineHeight: 1.1 },
  perfCard: { width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 18, animation: 'fadeUp 0.5s 0.3s ease both' },
  perfHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 },
  perfLabel: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, color: 'var(--text-dim)' },
  perfPct: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--gold)' },
  perfBarBg: { background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 6, marginBottom: 12, overflow: 'hidden' },
  perfBarFill: { height: '100%', background: 'linear-gradient(90deg, var(--gold), var(--orange))', borderRadius: 4, transition: 'width 1s 0.5s ease' },
  perfNote: { fontSize: 13, color: 'var(--text-dim)' },
  statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', animation: 'fadeUp 0.5s 0.4s ease both' },
  statBox: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 12px', textAlign: 'center' },
  statN: { display: 'block', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 1 },
  statL: { display: 'block', fontSize: 11, color: 'var(--text-dim)', marginTop: 4 },
  tryAgainCard: { width: '100%', background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', borderRadius: 14, padding: '14px 18px', textAlign: 'center', animation: 'fadeUp 0.5s 0.5s ease both' },
  btnPrimary: { width: '100%', padding: '18px', background: 'linear-gradient(135deg, #F5C842, #FF6B35)', border: 'none', borderRadius: 16, cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: 2, color: '#000', animation: 'fadeUp 0.5s 0.6s ease both' },
  btnGhost: { width: '100%', padding: '14px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 14, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-dim)', animation: 'fadeUp 0.5s 0.7s ease both' },
  prizeCard: { width: '100%', background: 'linear-gradient(135deg, rgba(245,200,66,0.1), rgba(255,107,53,0.06))', border: '1px solid var(--border-gold)', borderRadius: 20, padding: '24px 20px', textAlign: 'center' },
  prizeLabel: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--text-dim)', marginBottom: 10 },
  prizeAmount: { fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, background: 'linear-gradient(135deg, #F5C842, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 },
  prizeSub: { fontSize: 12, color: 'var(--text-dim)' },
}
