'use client'
import { useState, useEffect } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import Confetti from '../components/Confetti'
import { PaymentScreen } from '../components/AuthScreens'
import LobbyScreen from '../components/LobbyScreen'
import GameScreen from '../components/GameScreen'
import { EliminatedScreen, WinnerScreen } from '../components/EndScreens'
import { QUESTIONS, GAME_CONFIG } from '../lib/data'

const SCREENS = {
  PAYMENT: 'payment',
  LOBBY: 'lobby',
  GAME: 'game',
  ELIMINATED: 'eliminated',
  WINNER: 'winner',
}

export default function Home() {
  const [appLoading, setAppLoading] = useState(true)
  const [screen, setScreen] = useState(SCREENS.PAYMENT)
  const [pot, setPot] = useState(GAME_CONFIG.INITIAL_POT)
  const [players, setPlayers] = useState(GAME_CONFIG.INITIAL_PLAYERS)
  const [currentStake, setCurrentStake] = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const [eliminatedRound, setEliminatedRound] = useState(0)
  const [confettiActive, setConfettiActive] = useState(false)
  const [userWinAmount, setUserWinAmount] = useState(null)
  const [payMethod, setPayMethod] = useState(null)

  // Initial Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false)
    }, 2500) // 2.5 seconds splash
    return () => clearTimeout(timer)
  }, [])

  // Pot grows live
  useEffect(() => {
    const i = setInterval(() => {
      setPot(p => p + Math.floor(Math.random() * 2000 + 500))
    }, 3000)
    return () => clearInterval(i)
  }, [])

  // Players fluctuate
  useEffect(() => {
    const i = setInterval(() => {
      setPlayers(p => Math.max(800, p + Math.floor(Math.random() * 10 - 3)))
    }, 5000)
    return () => clearInterval(i)
  }, [])

  const handlePay = (stake, method) => {
    setCurrentStake(stake)
    setPayMethod(method)
    setPot(p => p + stake)
    setScreen(SCREENS.LOBBY)
  }

  const startGame = () => {
    setCurrentRound(1)
    setScreen(SCREENS.GAME)
  }

  const handleCorrect = (eliminated) => {
    setPlayers(p => Math.max(1, p - eliminated))
    if (currentRound >= QUESTIONS.length) {
      setConfettiActive(true)
      setTimeout(() => setConfettiActive(false), 5000)
      setScreen(SCREENS.WINNER)
    } else {
      setCurrentRound(r => r + 1)
    }
  }

  const handleCashOut = (amount) => {
    // Current multiplier calculation from GameScreen is (1 + (roundNum * 0.5)), base amount from GameScreen is hardcoded to 1000 * multiplier
    // Since GameScreen passes `amount` assuming 1000 base, we need to divide by 1000 and multiply by actual stake
    const scaledWin = Math.floor(amount * (currentStake / 1000)); 
    setUserWinAmount(scaledWin)
    setConfettiActive(true)
    setTimeout(() => setConfettiActive(false), 5000)
    setScreen(SCREENS.WINNER)
  }

  const handleWrong = () => {
    setEliminatedRound(currentRound)
    setScreen(SCREENS.ELIMINATED)
  }

  const handleTimeout = () => {
    setEliminatedRound(currentRound)
    setScreen(SCREENS.ELIMINATED)
  }

  const resetGame = () => {
    setCurrentRound(0)
    setEliminatedRound(0)
    setCurrentStake(0)
    setPlayers(GAME_CONFIG.INITIAL_PLAYERS)
    setScreen(SCREENS.PAYMENT)
  }

  const currentQuestion = QUESTIONS[Math.min(currentRound - 1, QUESTIONS.length - 1)]

  return (
    <>
      <ParticleBackground />
      <Confetti active={confettiActive} />

      {/* Global Top-Left Header */}
      {!appLoading && (
        <div style={globalStyles.topHeader}>
          <div style={globalStyles.logoWrap}>
            <img src="/logo.png" alt="QuizPot" style={globalStyles.logoImg} />
          </div>
          <span style={globalStyles.headerText}>QUIZPOT<span style={{color: 'var(--gold)'}}>.ug</span></span>
        </div>
      )}

      {/* Splash Screen */}
      {appLoading && (
        <div style={globalStyles.splashContainer}>
          <div style={globalStyles.splashLogoWrap}>
            <img src="/logo.png" alt="QuizPot Loading" style={globalStyles.splashLogoImg} />
          </div>
        </div>
      )}

      {/* Main App Screens */}
      <div style={{ opacity: appLoading ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: appLoading ? 'none' : 'auto' }}>
        {screen === SCREENS.PAYMENT && (
          <PaymentScreen onPay={handlePay} />
        )}

        {screen === SCREENS.LOBBY && (
          <LobbyScreen onStart={startGame} pot={pot} players={players} />
        )}

        {screen === SCREENS.GAME && currentQuestion && (
          <GameScreen
            question={currentQuestion}
            roundNum={currentRound}
            totalRounds={QUESTIONS.length}
            playersLeft={players}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            onTimeout={handleTimeout}
            onCashOut={handleCashOut}
          />
        )}

        {screen === SCREENS.ELIMINATED && (
          <EliminatedScreen
            round={eliminatedRound}
            totalRounds={QUESTIONS.length}
            playersLeft={players}
            onPlayAgain={resetGame}
            onHome={resetGame}
          />
        )}

        {screen === SCREENS.WINNER && (
          <WinnerScreen
            pot={userWinAmount || pot}
            payMethod={payMethod === 'mtn' ? 'MTN MoMo' : 'Airtel Money'}
            onPlayAgain={resetGame}
            onHome={resetGame}
          />
        )}
      </div>
    </>
  )
}

const globalStyles = {
  topHeader: { position: 'fixed', top: 20, left: 20, zIndex: 100, display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.8s ease' },
  logoWrap: { width: 44, height: 44, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  headerText: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' },
  
  splashContainer: { position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  splashLogoWrap: { width: 140, height: 140, borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(245,200,66,0.2)', border: '1px solid rgba(255,255,255,0.1)', animation: 'goldPulse 1.5s infinite, scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)' },
  splashLogoImg: { width: '100%', height: '100%', objectFit: 'cover' }
}
