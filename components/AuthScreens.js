'use client'
import { useState } from 'react'
import { formatUGX } from '../lib/data'

export function LoginScreen({ onBack, onLogin }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>WELCOME BACK</h2>
      <p style={styles.sub}>Securely login to your QuizPot account</p>
      
      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PHONE NUMBER</div>
        <input style={styles.input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PASSWORD</div>
        <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••" />
      </div>

      <button onClick={() => onLogin({ phone })} style={styles.ctaBtn}>LOGIN →</button>
      <button onClick={onBack} style={styles.textBtn}>BACK TO HOME</button>
    </div>
  )
}

export function RegisterScreen({ onBack, onRegister }) {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [otpChannel, setOtpChannel] = useState('telegram')

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>CREATE ACCOUNT</h2>
      <p style={styles.sub}>Verify yours to start winning</p>
      
      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>CHOOSE USERNAME</div>
        <input style={styles.input} type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. BadmanUG" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>MY PHONE NUMBER</div>
        <input style={styles.input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>SECURE PASSWORD</div>
        <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>SEND OTP CODE TO</div>
        <div style={styles.channelGrid}>
          <button 
            onClick={() => setOtpChannel('telegram')} 
            style={{ 
              ...styles.channelBtn, 
              borderColor: otpChannel === 'telegram' ? '#0088cc' : 'rgba(255,255,255,0.05)',
              background: otpChannel === 'telegram' ? 'rgba(0,136,204,0.1)' : 'rgba(255,255,255,0.02)'
            }}>
            <img src="/telegram.png" style={styles.channelIcon} onError={(e) => e.target.style.display = 'none'} />
            <span style={{ color: otpChannel === 'telegram' ? '#0088cc' : 'rgba(255,255,255,0.4)', fontWeight: 800 }}>TELEGRAM</span>
          </button>
          
          <button 
            onClick={() => setOtpChannel('whatsapp')} 
            style={{ 
              ...styles.channelBtn, 
              borderColor: otpChannel === 'whatsapp' ? '#25D366' : 'rgba(255,255,255,0.05)',
              background: otpChannel === 'whatsapp' ? 'rgba(37,211,102,0.1)' : 'rgba(255,255,255,0.02)'
            }}>
            <img src="/whatsapp.png" style={styles.channelIcon} onError={(e) => e.target.style.display = 'none'} />
            <span style={{ color: otpChannel === 'whatsapp' ? '#25D366' : 'rgba(255,255,255,0.4)', fontWeight: 800 }}>WHATSAPP</span>
          </button>
        </div>
      </div>

      <button onClick={() => onRegister({ username, phone, otpChannel })} style={styles.ctaBtn}>JOIN QUIZPOT</button>
      <button onClick={onBack} style={styles.textBtn}>BACK TO HOME</button>
    </div>
  )
}

export function DepositScreen({ onBack, onDeposit }) {
  const [network, setNetwork] = useState(null)
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDeposit = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onDeposit(parseInt(amount.replace(/,/g,'')) || 0, network) }, 2500)
  }

  const valid = network && amount.length >= 3 && phone.length >= 7;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ADD FUNDS</h2>
      <p style={styles.sub}>Deposit to your secure wallet</p>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>DEPOSIT AMOUNT (UGX)</div>
        <input style={styles.input} type="text" value={amount} onChange={e => setAmount(e.target.value.replace(/\D/g,'').toLocaleString())} placeholder="1,000" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>CHOOSE OPERATOR</div>
        <div style={styles.networkGrid}>
          <button 
            onClick={() => setNetwork('mtn')} 
            style={{
              ...styles.networkBtn, 
              borderColor: network === 'mtn' ? '#FFCC00' : 'rgba(255,255,255,0.05)',
              background: network === 'mtn' ? 'rgba(255, 204, 0, 0.1)' : 'rgba(255,255,255,0.02)'
            }}
          >
            <div style={{ ...styles.networkLogoWrap, background: '#FFCC00' }}>
              <img src="/mtn.png" alt="MTN" style={styles.logoImg} onError={(e) => e.target.style.display = 'none'} />
            </div>
          </button>

          <button 
            onClick={() => setNetwork('airtel')} 
            style={{
              ...styles.networkBtn, 
              borderColor: network === 'airtel' ? '#FF0000' : 'rgba(255,255,255,0.05)',
              background: network === 'airtel' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255,255,255,0.02)'
            }}
          >
            <div style={{ ...styles.networkLogoWrap, background: '#FF0000' }}>
              <img src="/airtel.png" alt="Airtel" style={styles.logoImg} onError={(e) => e.target.style.display = 'none'} />
            </div>
          </button>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PAYMENT PHONE NUMBER</div>
        <input style={styles.input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
      </div>

      <button 
        onClick={handleDeposit} 
        disabled={!valid || loading}
        style={{
          ...styles.ctaBtn,
          background: valid ? (network === 'mtn' ? '#FFCC00' : '#FF0000') : 'rgba(255,255,255,0.05)',
          color: valid && network === 'mtn' ? '#000' : (valid ? '#fff' : 'rgba(255,255,255,0.2)'),
        }}
      >
        {loading ? <span style={styles.spinner} /> : `CONFIRM DEPOSIT`}
      </button>
      <button onClick={onBack} style={styles.textBtn}>CANCEL</button>
    </div>
  )
}

const styles = {
  container: { padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: 28, animation: 'fadeUp 0.5s ease' },
  title: { fontSize: 36, fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: -0.5 },
  sub: { fontSize: 13, color: 'var(--text-dim)', marginTop: -16 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 12 },
  inputLabel: { fontSize: 10, fontWeight: 900, color: 'var(--text-dim)', letterSpacing: 1.5, marginLeft: 4 },
  input: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '20px 24px', color: '#fff', fontSize: 18, outline: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1 },
  
  channelGrid: { display: 'flex', gap: 12 },
  channelBtn: { flex: 1, height: '70px', border: '2px solid', borderRadius: 24, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s' },
  channelIcon: { width: 20, height: 20 },
  
  networkGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  networkBtn: { padding: '16px', borderRadius: '24px', border: '2px solid', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' },
  networkLogoWrap: { width: 44, height: 44, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  
  ctaBtn: { height: '70px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 35, fontWeight: 900, fontSize: 18, fontFamily: 'var(--font-display)', letterSpacing: 1, cursor: 'pointer', marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
  textBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 800, cursor: 'pointer', textAlign: 'center', letterSpacing: 1 },
  spinner: { width: 22, height: 22, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' },
}
