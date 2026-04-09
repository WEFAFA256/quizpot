'use client'
import { useState, useEffect, useRef } from 'react'

const OPTION_LABELS = ['A', 'B', 'C', 'D']
const DIFFICULTY_LABELS = ['', 'EASY', 'EASY', 'MEDIUM', 'HARD', 'EXTREME']
const DIFFICULTY_COLORS = ['', 'var(--green)', 'var(--green)', 'var(--gold)', 'var(--orange)', 'var(--red)']

export default function GameScreen({ question, roundNum, totalRounds, playersLeft, onCorrect, onWrong, onTimeout, onCashOut }) {
  const [timeLeft, setTimeLeft] = useState(8)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [elimCount, setElimCount] = useState(null)
  const [phase, setPhase] = useState('playing') // 'playing', 'cashout', 'revive'
  const [actionTime, setActionTime] = useState(5)
  const timerRef = useRef(null)
  const actionTimerRef = useRef(null)

  const currentMultiplier = (1 + (roundNum * 0.5)).toFixed(1)
  const currentWinAmount = Math.floor(1000 * currentMultiplier)
  const reviveFee = roundNum * 500

  useEffect(() => {
    setTimeLeft(8)
    setSelected(null)
    setRevealed(false)
    setElimCount(null)
    setPhase('playing')
    setActionTime(5)

    if (timerRef.current) clearInterval(timerRef.current)
    if (actionTimerRef.current) clearInterval(actionTimerRef.current)

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setRevealed(true)
          setTimeout(() => setPhase('revive'), 1500)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => {
      clearInterval(timerRef.current)
      clearInterval(actionTimerRef.current)
    }
  }, [question])

  useEffect(() => {
    if (phase === 'cashout' || phase === 'revive') {
      setActionTime(5)
      actionTimerRef.current = setInterval(() => {
        setActionTime(t => {
          if (t <= 1) {
            clearInterval(actionTimerRef.current)
            if (phase === 'cashout') onCorrect(elimCount || 0)
            if (phase === 'revive') onWrong()
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
  }, [phase])

  const handleSelect = (idx) => {
    if (revealed) return
    clearInterval(timerRef.current)
    setSelected(idx)
    setRevealed(true)

    const correct = idx === question.answer
    const elim = Math.floor(playersLeft * (0.35 + Math.random() * 0.25))
    setElimCount(elim)

    if (correct) {
      setTimeout(() => setPhase('cashout'), 1400)
    } else {
      setTimeout(() => setPhase('revive'), 1400)
    }
  }

  const circumference = 2 * Math.PI * 26
  const timerStroke = (timeLeft / 8) * circumference
  const timerColor = timeLeft <= 5 ? 'var(--red)' : timeLeft <= 10 ? 'var(--gold)' : 'var(--green)'
  const diffColor = DIFFICULTY_COLORS[question.difficulty]

  return (
    <div style={styles.container}>
      <div style={{ ...styles.bgPulse, opacity: timeLeft <= 5 ? 0.06 : 0 }} />

      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.roundInfo}>
          <span style={styles.roundLabel}>ROUND</span>
          <span style={styles.roundNum}>{roundNum}/{totalRounds}</span>
        </div>

        {/* Circular timer */}
        <div style={styles.timerWrap}>
          <svg width={64} height={64} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={32} cy={32} r={26} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={3} />
            <circle cx={32} cy={32} r={26} fill="none" stroke={timerColor} strokeWidth={3}
              strokeDasharray={circumference} strokeDashoffset={circumference - timerStroke}
              strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }} />
          </svg>
          <div style={{ ...styles.timerNum, color: timerColor, animation: timeLeft <= 5 ? 'goldPulse 0.5s infinite' : 'none' }}>
            {timeLeft}
          </div>
        </div>

        <div style={styles.playersInfo}>
          <span style={styles.roundLabel}>ALIVE</span>
          <span style={{ ...styles.roundNum, color: 'var(--green)' }}>{playersLeft.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div style={styles.progressDots}>
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div key={i} style={{
            ...styles.dot,
            background: i < roundNum - 1 ? 'var(--gold)' : i === roundNum - 1 ? '#fff' : 'rgba(255,255,255,0.1)',
            transform: i === roundNum - 1 ? 'scale(1.3)' : 'scale(1)',
          }} />
        ))}
      </div>

      {/* Difficulty + category */}
      <div style={styles.metaRow}>
        <span style={{ ...styles.diffBadge, color: diffColor, borderColor: diffColor, background: `${diffColor}15` }}>
          {DIFFICULTY_LABELS[question.difficulty]}
        </span>
        <span style={styles.catBadge}>{question.category}</span>
      </div>

      {/* Question */}
      <div style={styles.qCard}>
        <p style={styles.qText}>{question.q}</p>
      </div>

      {/* Elimination flash */}
      {revealed && elimCount && (
        <div style={styles.elimFlash}>
          💀 {elimCount.toLocaleString()} players just eliminated!
        </div>
      )}

      {/* Phases */}
      {phase === 'playing' && (
        <div style={styles.answers}>
          {question.options.map((opt, i) => {
            let state = 'default'
            if (revealed) {
              if (i === question.answer) state = 'correct'
              else if (i === selected) state = 'wrong'
              else state = 'dimmed'
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} style={{
                ...styles.ansBtn,
                ...getAnsBtnStyle(state),
                animationDelay: `${i * 0.06}s`,
                cursor: revealed ? 'default' : 'pointer',
              }}>
                <span style={{ ...styles.ansLabel, ...getAnsLabelStyle(state) }}>
                  {OPTION_LABELS[i]}
                </span>
                <span style={styles.ansText}>{opt}</span>
                {state === 'correct' && <span style={styles.ansIcon}>✓</span>}
                {state === 'wrong' && <span style={styles.ansIcon}>✗</span>}
              </button>
            )
          })}
        </div>
      )}

      {phase === 'cashout' && (
        <div style={styles.decisionCard}>
          <h2 style={{ ...styles.roundNum, color: 'var(--green)' }}>CORRECT!</h2>
          <p style={styles.qText}>Current Multiplier: <span style={{color: 'var(--gold)'}}>{currentMultiplier}x</span></p>
          <div style={styles.actionTimer}>{actionTime}s</div>
          <button style={styles.cashOutBtn} onClick={() => { clearInterval(actionTimerRef.current); if(onCashOut) onCashOut(currentWinAmount); }}>
            CASH OUT UGX {currentWinAmount.toLocaleString()}
          </button>
          <button style={styles.riskBtn} onClick={() => { clearInterval(actionTimerRef.current); onCorrect(elimCount || 0); }}>
            RISK IT (Next Round)
          </button>
        </div>
      )}

      {phase === 'revive' && (
        <div style={styles.decisionCard}>
          <h2 style={{ ...styles.roundNum, color: 'var(--red)' }}>WRONG!</h2>
          <p style={styles.qText}>You are eliminated.</p>
          <p style={{...styles.qText, fontSize: 15, color: 'var(--text-dim)'}}>Pay to stay in the game?</p>
          <div style={styles.actionTimer}>{actionTime}s</div>
          <button style={styles.reviveBtn} onClick={() => { clearInterval(actionTimerRef.current); onCorrect(elimCount || 0); }}>
            REVIVE (-UGX {reviveFee.toLocaleString()})
          </button>
          <button style={styles.riskBtn} onClick={() => { clearInterval(actionTimerRef.current); onWrong(); }}>
            ACCEPT DEFEAT
          </button>
        </div>
      )}
    </div>
  )
}

function getAnsBtnStyle(state) {
  switch (state) {
    case 'correct': return { background: 'rgba(0,229,160,0.12)', borderColor: 'var(--green)', animation: 'correctFlash 0.6s ease' }
    case 'wrong': return { background: 'rgba(255,59,92,0.12)', borderColor: 'var(--red)', animation: 'shake 0.5s ease' }
    case 'dimmed': return { opacity: 0.3 }
    default: return {}
  }
}

function getAnsLabelStyle(state) {
  switch (state) {
    case 'correct': return { background: 'var(--green)', color: '#000' }
    case 'wrong': return { background: 'var(--red)', color: '#fff' }
    default: return {}
  }
}

const styles = {
  container: { minHeight: '100vh', position: 'relative', padding: '20px 20px 32px', maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 },
  bgPulse: { position: 'fixed', inset: 0, background: 'radial-gradient(ellipse, rgba(255,59,92,1) 0%, transparent 70%)', transition: 'opacity 0.5s', pointerEvents: 'none', zIndex: 0 },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 },
  roundInfo: { display: 'flex', flexDirection: 'column', gap: 2 },
  roundLabel: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text-dim)', textTransform: 'uppercase' },
  roundNum: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: 1 },
  timerWrap: { position: 'relative', width: 64, height: 64 },
  timerNum: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900 },
  playersInfo: { display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' },
  progressDots: { display: 'flex', gap: 6, justifyContent: 'center', position: 'relative', zIndex: 1 },
  dot: { width: 6, height: 6, borderRadius: '50%', transition: 'all 0.3s' },
  metaRow: { display: 'flex', gap: 8, position: 'relative', zIndex: 1 },
  diffBadge: { display: 'inline-block', border: '1px solid', borderRadius: 999, padding: '4px 12px', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: 1 },
  catBadge: { display: 'inline-block', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, padding: '4px 12px', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: 1 },
  qCard: { background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: '28px 24px', position: 'relative', zIndex: 1, animation: 'scaleIn 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
  qText: { fontSize: 20, fontWeight: 700, lineHeight: 1.45, color: '#fff', textAlign: 'center', fontFamily: 'var(--font-display)' },
  elimFlash: { background: 'rgba(255,59,92,0.08)', border: '1px solid rgba(255,59,92,0.2)', borderRadius: 16, padding: '12px 16px', fontSize: 13, color: '#FF8BA7', textAlign: 'center', fontFamily: 'var(--font-mono)', position: 'relative', zIndex: 1, animation: 'fadeIn 0.3s ease' },
  answers: { display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 },
  ansBtn: { display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, transition: 'all 0.2s', animation: 'fadeUp 0.4s ease both' },
  ansLabel: { width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-dim)', flexShrink: 0, transition: 'all 0.2s' },
  ansText: { flex: 1, fontSize: 16, fontWeight: 600, textAlign: 'left', color: 'var(--text)', fontFamily: 'var(--font-body)' },
  ansIcon: { fontSize: 18, flexShrink: 0 },
  decisionCard: { background: 'rgba(20,20,25,0.6)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 40, padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeUp 0.4s ease', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' },
  actionTimer: { fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: '#fff', margin: '4px 0', textShadow: '0 0 20px rgba(255,255,255,0.5)', animation: 'goldPulse 1s infinite' },
  cashOutBtn: { padding: '20px', background: 'linear-gradient(135deg, var(--green), #00b37e)', color: '#000', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, border: 'none', borderRadius: 999, cursor: 'pointer', letterSpacing: 1, boxShadow: '0 10px 20px rgba(0,229,160,0.3)' },
  reviveBtn: { padding: '20px', background: 'linear-gradient(135deg, var(--red), #cc0022)', color: '#fff', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, border: 'none', borderRadius: 999, cursor: 'pointer', letterSpacing: 1, boxShadow: '0 10px 20px rgba(255,59,92,0.3)' },
  riskBtn: { padding: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, borderRadius: 999, cursor: 'pointer' },
}
