'use client'
import { useState, useEffect, useRef } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import Confetti from '../components/Confetti'
import LandingScreen from '../components/LandingScreen'
import { RegisterScreen, LoginScreen, DepositScreen } from '../components/AuthScreens'
import { Dashboard } from '../components/Dashboard'
import LobbyScreen from '../components/LobbyScreen'
import GameScreen from '../components/GameScreen'
import { EliminatedScreen, WinnerScreen } from '../components/EndScreens'
import BackgroundSound from '../components/BackgroundSound'
import GameBot from '../components/GameBot'
import { QUESTIONS, GAME_CONFIG } from '../lib/data'

const SCREENS = {
  SPLASH: 'splash',
  LANDING: 'landing',
  REGISTER: 'register',
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  DEPOSIT: 'deposit',
  LOBBY: 'lobby',
  GAME: 'game',
  ELIMINATED: 'eliminated',
  WINNER: 'winner',
}

const GAME_SCREENS = [SCREENS.LOBBY, SCREENS.GAME, SCREENS.ELIMINATED, SCREENS.WINNER]

export default function Home() {
  const [screen, setScreen] = useState(SCREENS.SPLASH)
  const [user, setUser] = useState(null)
  const [balance, setBalance] = useState(0)
  const [history, setHistory] = useState([])

  const [pot, setPot] = useState(GAME_CONFIG.INITIAL_POT)
  const [players, setPlayers] = useState(GAME_CONFIG.INITIAL_PLAYERS)
  const [currentStake, setCurrentStake] = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const [eliminatedRound, setEliminatedRound] = useState(0)
  const [confettiActive, setConfettiActive] = useState(false)
  const [userWinAmount, setUserWinAmount] = useState(null)
  const [payMethod, setPayMethod] = useState(null)

  const potIntervalRef = useRef(null)

  // Initial splash
  useEffect(() => {
    const t = setTimeout(() => setScreen(SCREENS.LANDING), 2500)
    return () => clearTimeout(t)
  }, [])

  // Live pot — only ticks when NOT in an active game
  useEffect(() => {
    if (GAME_SCREENS.includes(screen)) {
      if (potIntervalRef.current) {
        clearInterval(potIntervalRef.current)
        potIntervalRef.current = null
      }
      return
    }
    potIntervalRef.current = setInterval(() => {
      setPot(p => p + Math.floor(
        Math.random() * GAME_CONFIG.POT_TICK_MAX + GAME_CONFIG.POT_TICK_MIN
      ))
    }, GAME_CONFIG.POT_TICK_INTERVAL)
    return () => {
      if (potIntervalRef.current) clearInterval(potIntervalRef.current)
    }
  }, [screen])

  // Telegram Mini App auto-login
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      tg.expand()
      const tgUser = tg.initDataUnsafe?.user
      if (tgUser) {
        setUser({
          username: tgUser.username || tgUser.first_name,
          telegramId: tgUser.id,
          photo: tgUser.photo_url,
        })
        setScreen(SCREENS.DASHBOARD)
      }
    }
  }, [])

  const addHistory = (entry) =>
    setHistory(prev => [{ ...entry, id: Date.now(), date: new Date().toLocaleDateString() }, ...prev])

  const handleRegister = (data) => {
    setUser(data)
    setScreen(SCREENS.DASHBOARD)
  }

  const handleLogin = (data) => {
    setUser({ username: 'Player', ...data })
    setScreen(SCREENS.DASHBOARD)
  }

  const handleLogout = () => {
    setUser(null)
    setScreen(SCREENS.LANDING)
  }

  const handleDeposit = (amount, method) => {
    setBalance(b => b + amount)
    setPayMethod(method)
    addHistory({ type: `Deposit via ${method.toUpperCase()}`, amount })
    setScreen(SCREENS.DASHBOARD)
  }

  const handleEnterPool = (stake) => {
    if (balance < stake) {
      alert('Insufficient Balance in QuizPot Wallet! Deposit first.')
      setScreen(SCREENS.DEPOSIT)
      return
    }
    setBalance(b => b - stake)
    setCurrentStake(stake)
    addHistory({ type: `Pool Entry: ${stake} UGX`, amount: -stake })
    setScreen(SCREENS.LOBBY)
  }

  const startGame = () => {
    setCurrentRound(1)
    setScreen(SCREENS.GAME)
  }

  // Called when player answers correctly and continues to next round
  const handleCorrect = (eliminated) => {
    setPlayers(p => Math.max(1, p - eliminated))
    if (currentRound >= QUESTIONS.length) {
      // Survived all rounds — win the full staked pot at final multiplier
      const multiplier = GAME_CONFIG.MULTIPLIER_BASE + (currentRound * GAME_CONFIG.MULTIPLIER_PER_ROUND)
      handleWin(Math.floor(currentStake * multiplier))
    } else {
      setCurrentRound(r => r + 1)
    }
  }

  // Called when player cashes out early
  const handleCashOut = (multiplier) => {
    const winAmount = Math.floor(currentStake * multiplier)
    handleWin(winAmount)
  }

  // Called when player pays to revive after a wrong answer
  const handleRevive = (reviveFee) => {
    if (balance < reviveFee) {
      alert('Not enough balance to revive!')
      setEliminatedRound(currentRound)
      setScreen(SCREENS.ELIMINATED)
      return
    }
    setBalance(b => b - reviveFee)
    addHistory({ type: `Revive fee (Round ${currentRound})`, amount: -reviveFee })
    // Continue to next round as if they answered correctly with 0 eliminations
    handleCorrect(0)
  }

  const handleWin = (amount) => {
    setBalance(b => b + amount)
    setUserWinAmount(amount)
    addHistory({ type: 'Trivia Win', amount })
    setConfettiActive(true)
    setTimeout(() => setConfettiActive(false), 5000)
    setScreen(SCREENS.WINNER)
  }

  const resetGame = () => {
    setCurrentRound(0)
    setEliminatedRound(0)
    setCurrentStake(0)
    setScreen(SCREENS.DASHBOARD)
  }

  const currentQuestion = QUESTIONS[Math.min(currentRound - 1, QUESTIONS.length - 1)]

  return (
    <>
      <ParticleBackground />
      <Confetti active={confettiActive} />
      <BackgroundSound />
      <GameBot />

      {/* Header */}
      {screen !== SCREENS.SPLASH && screen !== SCREENS.GAME && (
        <div style={styles.header}>
          <div style={styles.logoBlock}>
            <img src="/logo.png" style={styles.logo} alt="QuizPot" />
            <span style={styles.logoText}>QUIZPOT</span>
          </div>
          {user && (
            <div style={styles.userBadge}>
              {balance.toLocaleString()} UGX
            </div>
          )}
        </div>
      )}

      {/* Splash */}
      {screen === SCREENS.SPLASH && (
        <div style={styles.splash}>
          <img src="/logo.png" style={styles.splashLogo} alt="QuizPot" />
        </div>
      )}

      <div style={{ visibility: screen === SCREENS.SPLASH ? 'hidden' : 'visible' }}>
        {screen === SCREENS.LANDING && (
          <LandingScreen onJoin={() => setScreen(SCREENS.REGISTER)} onLogin={() => setScreen(SCREENS.LOGIN)} />
        )}
        {screen === SCREENS.REGISTER && (
          <RegisterScreen onBack={() => setScreen(SCREENS.LANDING)} onRegister={handleRegister} />
        )}
        {screen === SCREENS.LOGIN && (
          <LoginScreen onBack={() => setScreen(SCREENS.LANDING)} onLogin={handleLogin} />
        )}
        {screen === SCREENS.DASHBOARD && (
          <Dashboard
            balance={balance}
            history={history}
            onDeposit={() => setScreen(SCREENS.DEPOSIT)}
            onEnterPool={handleEnterPool}
            onLogout={handleLogout}
          />
        )}
        {screen === SCREENS.DEPOSIT && (
          <DepositScreen onBack={() => setScreen(SCREENS.DASHBOARD)} onDeposit={handleDeposit} />
        )}
        {screen === SCREENS.LOBBY && (
          <LobbyScreen onStart={startGame} pot={pot} players={players} />
        )}
        {screen === SCREENS.GAME && (
          <GameScreen
            question={currentQuestion}
            roundNum={currentRound}
            totalRounds={QUESTIONS.length}
            playersLeft={players}
            currentStake={currentStake}
            onCorrect={handleCorrect}
            onWrong={() => { setEliminatedRound(currentRound); setScreen(SCREENS.ELIMINATED) }}
            onTimeout={() => { setEliminatedRound(currentRound); setScreen(SCREENS.ELIMINATED) }}
            onCashOut={handleCashOut}
            onRevive={handleRevive}
            balance={balance}
          />
        )}
        {screen === SCREENS.ELIMINATED && (
          <EliminatedScreen
            onPlayAgain={resetGame}
            onHome={resetGame}
            round={eliminatedRound}
            totalRounds={QUESTIONS.length}
            playersLeft={players}
          />
        )}
        {screen === SCREENS.WINNER && (
          <WinnerScreen
            pot={userWinAmount}
            onPlayAgain={resetGame}
            onHome={resetGame}
            payMethod={payMethod}
          />
        )}
      </div>
    </>
  )
}

const styles = {
  header: { position: 'absolute', top: 12, left: 16, right: 16, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoBlock: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: { width: 40, height: 40, borderRadius: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' },
  logoText: { fontSize: 18, fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: 0.5 },
  userBadge: { background: 'var(--gold)', color: '#000', padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 800, fontFamily: 'var(--font-display)', boxShadow: '0 4px 15px rgba(245,200,66,0.3)' },
  splash: { position: 'fixed', inset: 0, background: '#060608', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  splashLogo: { width: 120, height: 120, animation: 'goldPulse 1.5s infinite' },
}
