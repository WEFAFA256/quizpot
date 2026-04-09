'use client'
import { useState, useEffect } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import Confetti from '../components/Confetti'
import LandingScreen from '../components/LandingScreen'
import { RegisterScreen, LoginScreen, DepositScreen } from '../components/AuthScreens'
import { Dashboard } from '../components/Dashboard'
import LobbyScreen from '../components/LobbyScreen'
import GameScreen from '../components/GameScreen'
import { EliminatedScreen, WinnerScreen } from '../components/EndScreens'
import BackgroundSound from '../components/BackgroundSound'
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

  // Initial Splash
  useEffect(() => {
    const t = setTimeout(() => setScreen(SCREENS.LANDING), 2500)
    return () => clearTimeout(t)
  }, [])

  // Live Pot
  useEffect(() => {
    const i = setInterval(() => {
      setPot(p => p + Math.floor(Math.random() * 2000 + 500))
    }, 3000)
    return () => clearInterval(i)
  }, [])

  const handleRegister = (data) => {
    setUser(data)
    setScreen(SCREENS.DASHBOARD)
  }

  const handleLogin = (data) => {
    setUser({ username: 'Player', ...data })
    setScreen(SCREENS.DASHBOARD)
  }

  const handleDeposit = (amount) => {
    setBalance(b => b + amount)
    setHistory([{ type: 'Account Deposit', amount, date: new Date().toLocaleDateString() }, ...history])
    setScreen(SCREENS.DASHBOARD)
  }

  const handleEnterPool = (stake) => {
    if (balance < stake) {
      alert("Insufficient Balance in QuizPot Wallet! Deposit first.")
      setScreen(SCREENS.DEPOSIT)
      return
    }
    setBalance(b => b - stake)
    setCurrentStake(stake)
    setHistory([{ type: `Pool Entry: ${stake} UGX`, amount: -stake, date: new Date().toLocaleDateString() }, ...history])
    setScreen(SCREENS.LOBBY)
  }

  const startGame = () => {
    setCurrentRound(1)
    setScreen(SCREENS.GAME)
  }

  const handleCorrect = (eliminated) => {
    setPlayers(p => Math.max(1, p - eliminated))
    if (currentRound >= QUESTIONS.length) {
      handleWin(currentStake * 5) // Fixed 5x for win
    } else {
      setCurrentRound(r => r + 1)
    }
  }

  const handleCashOut = (amount) => {
    const scaledWin = Math.floor(amount * (currentStake / 1000))
    handleWin(scaledWin)
  }

  const handleWin = (amount) => {
    setBalance(b => b + amount)
    setUserWinAmount(amount)
    setHistory([{ type: 'Trivia Win', amount, date: new Date().toLocaleDateString() }, ...history])
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

      {/* Header UI (Fixed Overlap) */}
      {screen !== SCREENS.SPLASH && screen !== SCREENS.GAME && (
        <div style={styles.header}>
          <div style={styles.logoBlock}>
            <img src="/logo.png" style={styles.logo} />
            <span style={styles.logoText}>QUIZPOT</span>
          </div>
          {user && (
            <div style={styles.userBadge}>
               {user.username} • {balance.toLocaleString()} UGX
            </div>
          )}
        </div>
      )}

      {/* Splash Screen */}
      {screen === SCREENS.SPLASH && (
        <div style={styles.splash}>
          <img src="/logo.png" style={styles.splashLogo} />
        </div>
      )}

      {/* App Content */}
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
          <Dashboard balance={balance} history={history} onDeposit={() => setScreen(SCREENS.DEPOSIT)} onEnterPool={handleEnterPool} />
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
            onCorrect={handleCorrect}
            onWrong={() => { setEliminatedRound(currentRound); setScreen(SCREENS.ELIMINATED); }}
            onTimeout={() => { setEliminatedRound(currentRound); setScreen(SCREENS.ELIMINATED); }}
            onCashOut={handleCashOut}
          />
        )}

        {screen === SCREENS.ELIMINATED && (
          <EliminatedScreen onPlayAgain={resetGame} onHome={resetGame} round={eliminatedRound} playersLeft={players} />
        )}

        {screen === SCREENS.WINNER && (
          <WinnerScreen pot={userWinAmount} onPlayAgain={resetGame} onHome={resetGame} payMethod="QUIZPOT WALLET" />
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
  userBadge: { background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' },
  splash: { position: 'fixed', inset: 0, background: '#060608', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  splashLogo: { width: 120, height: 120, animation: 'goldPulse 1.5s infinite' }
}
