'use client'
import { useState } from 'react'
import { formatUGX } from '../lib/data'

export function LoginScreen({ onBack, onLogin }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!/^0[37]\d{8}$/.test(phone)) e.phone = 'Enter a valid Ugandan number (e.g. 0712345678)'
    if (password.length < 4) e.password = 'Password must be at least 4 characters'
    return e
  }

  const handleLogin = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onLogin({ phone })
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>WELCOME BACK</h2>
      <p style={styles.sub}>Securely login to your QuizPot account</p>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PHONE NUMBER</div>
        <input
          style={{ ...styles.input, borderColor: errors.phone ? 'var(--red)' : 'rgba(255,255,255,0.08)' }}
          type="tel" value={phone}
          onChange={e => { setPhone(e.target.value); setErrors(ev => ({ ...ev, phone: null })) }}
          placeholder="07XXXXXXXX"
        />
        {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PASSWORD</div>
        <input
          style={{ ...styles.input, borderColor: errors.password ? 'var(--red)' : 'rgba(255,255,255,0.08)' }}
          type="password" value={password}
          onChange={e => { setPassword(e.target.value); setErrors(ev => ({ ...ev, password: null })) }}
          placeholder="••••"
        />
        {errors.password && <span style={styles.errorText}>{errors.password}</span>}
      </div>

      <button onClick={handleLogin} style={styles.ctaBtn}>LOGIN →</button>
      <button onClick={onBack} style={styles.textBtn}>BACK TO HOME</button>
    </div>
  )
}

export function RegisterScreen({ onBack, onRegister }) {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [otpChannel, setOtpChannel] = useState('telegram')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (username.trim().length < 3) e.username = 'Username must be at least 3 characters'
    if (!/^0[37]\d{8}$/.test(phone)) e.phone = 'Enter a valid Ugandan number (e.g. 0712345678)'
    if (password.length < 6) e.password = 'Password must be at least 6 characters'
    return e
  }

  const handleRegister = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onRegister({ username, phone, otpChannel })
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>CREATE ACCOUNT</h2>
      <p style={styles.sub}>Verify yours to start winning</p>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>CHOOSE USERNAME</div>
        <input
          style={{ ...styles.input, borderColor: errors.username ? 'var(--red)' : 'rgba(255,255,255,0.08)' }}
          type="text" value={username}
          onChange={e => { setUsername(e.target.value); setErrors(ev => ({ ...ev, username: null })) }}
          placeholder="e.g. BadmanUG"
        />
        {errors.username && <span style={styles.errorText}>{errors.username}</span>}
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>MY PHONE NUMBER</div>
        <input
          style={{ ...styles.input, borderColor: errors.phone ? 'var(--red)' : 'rgba(255,255,255,0.08)' }}
          type="tel" value={phone}
          onChange={e => { setPhone(e.target.value); setErrors(ev => ({ ...ev, phone: null })) }}
          placeholder="07XXXXXXXX"
        />
        {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>SECURE PASSWORD</div>
        <input
          style={{ ...styles.input, borderColor: errors.password ? 'var(--red)' : 'rgba(255,255,255,0.08)' }}
          type="password" value={password}
          onChange={e => { setPassword(e.target.value); setErrors(ev => ({ ...ev, password: null })) }}
          placeholder="Min. 6 characters"
        />
        {errors.password && <span style={styles.errorText}>{errors.password}</span>}
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>SEND OTP CODE TO</div>
        <div style={styles.channelGrid}>
          {[
            { id: 'telegram', label: 'TELEGRAM', color: '#0088cc' },
            { id: 'whatsapp', label: 'WHATSAPP', color: '#25D366' },
          ].map(ch => (
            <button
              key={ch.id}
              onClick={() => setOtpChannel(ch.id)}
              style={{
                ...styles.channelBtn,
                borderColor: otpChannel === ch.id ? ch.color : 'rgba(255,255,255,0.05)',
                background: otpChannel === ch.id ? `${ch.color}1A` : 'rgba(255,255,255,0.02)',
              }}
            >
              <span style={{ color: otpChannel === ch.id ? ch.color : 'rgba(255,255,255,0.4)', fontWeight: 800 }}>
                {ch.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleRegister} style={styles.ctaBtn}>JOIN QUIZPOT</button>
      <button onClick={onBack} style={styles.textBtn}>BACK TO HOME</button>
    </div>
  )
}

export function DepositScreen({ onBack, onDeposit }) {
  const [network, setNetwork] = useState(null)
  const [rawAmount, setRawAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const displayAmount = rawAmount ? Number(rawAmount).toLocaleString() : ''
  const numericAmount = parseInt(rawAmount) || 0

  const handleAmountChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '')
    setRawAmount(digits)
    setErrors(ev => ({ ...ev, amount: null }))
  }

  const validate = () => {
    const e = {}
    if (!network) e.network = 'Select a network'
    if (numericAmount < 500) e.amount = 'Minimum deposit is UGX 500'
    if (!/^0[37]\d{8}$/.test(phone)) e.phone = 'Enter a valid Ugandan number'
    return e
  }

  const handleDeposit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onDeposit(numericAmount, network)
    }, 2500)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ADD FUNDS</h2>
      <p style={styles.sub}>Deposit to your secure wallet</p>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>DEPOSIT AMOUNT (UGX)</div>
        <input
          style={{ ...styles.input, borderColor: errors.amount ? 'var(--red)' : 'rgba(255,255,255,0.08)' }}
          type="text"
          inputMode="numeric"
          value={displayAmount}
          onChange={handleAmountChange}
          placeholder="1,000"
        />
        {errors.amount && <span style={styles.errorText}>{errors.amount}</span>}
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>CHOOSE OPERATOR</div>
        {errors.network && <span style={styles.errorText}>{errors.network}</span>}
        <div style={styles.networkGrid}>
          {[
            { id: 'mtn', label: 'MTN MoMo', src: '/mtn.png', activeColor: '#FFCC00', activeBg: 'rgba(255,204,0,0.1)' },
            { id: 'airtel', label: 'Airtel Money', src: '/airtel.png', activeColor: '#FF0000', activeBg: 'rgba(255,0,0,0.1)' },
          ].map(net => (
            <button
              key={net.id}
              onClick={() => { setNetwork(net.id); setErrors(ev => ({ ...ev, network: null })) }}
              style={{
                ...styles.networkBtn,
                borderColor: network === net.id ? net.activeColor : 'rgba(255,255,255,0.05)',
                background: network === net.id ? net.activeBg : 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ ...styles.networkLogoWrap, background: net.activeColor }}>
                <img src={net.src} alt={net.label} style={styles.logoImg} />
              </div>
              <span style={{ fontSize: 11, color: network === net.id ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: 4 }}>
                {net.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PAYMENT PHONE NUMBER</div>
        <input
          style={{ ...styles.input, borderColor: errors.phone ? 'var(--red)' : 'rgba(255,255,255,0.08)' }}
          type="tel" value={phone}
          onChange={e => { setPhone(e.target.value); setErrors(ev => ({ ...ev, phone: null })) }}
          placeholder="07XXXXXXXX"
        />
        {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
      </div>

      <button
        onClick={handleDeposit}
        disabled={loading}
        style={{
          ...styles.ctaBtn,
          background: network === 'mtn' ? '#FFCC00' : network === 'airtel' ? '#FF0000' : 'var(--gold)',
          color: network === 'mtn' ? '#000' : network === 'airtel' ? '#fff' : '#000',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? <span style={styles.spinner} /> : 'CONFIRM DEPOSIT'}
      </button>
      <button onClick={onBack} style={styles.textBtn}>CANCEL</button>
    </div>
  )
}

const styles = {
  container: { padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: 28, animation: 'fadeUp 0.5s ease' },
  title: { fontSize: 36, fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: -0.5 },
  sub: { fontSize: 13, color: 'var(--text-dim)', marginTop: -16 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 10 },
  inputLabel: { fontSize: 10, fontWeight: 900, color: 'var(--text-dim)', letterSpacing: 1.5, marginLeft: 4 },
  input: { background: 'rgba(255,255,255,0.03)', border: '1px solid', borderRadius: 20, padding: '20px 24px', color: '#fff', fontSize: 18, outline: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1 },
  errorText: { fontSize: 11, color: 'var(--red)', marginLeft: 4 },
  channelGrid: { display: 'flex', gap: 12 },
  channelBtn: { flex: 1, height: '60px', border: '2px solid', borderRadius: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s', background: 'transparent', fontSize: 13, letterSpacing: 1 },
  networkGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  networkBtn: { padding: '16px', borderRadius: '24px', border: '2px solid', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', gap: 6 },
  networkLogoWrap: { width: 44, height: 44, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  ctaBtn: { height: '70px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 35, fontWeight: 900, fontSize: 18, fontFamily: 'var(--font-display)', letterSpacing: 1, cursor: 'pointer', marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'all 0.2s' },
  textBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 800, cursor: 'pointer', textAlign: 'center', letterSpacing: 1 },
  spinner: { width: 22, height: 22, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' },
}
