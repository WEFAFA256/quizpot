'use client'
import { useState } from 'react'
import { formatUGX } from '../lib/data'

export function LoginScreen({ onBack, onLogin }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>WELCOME BACK</h2>
      <p style={styles.sub}>Login to access your QuizPot wallet</p>
      
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
      <h2 style={styles.title}>NEW ACCOUNT</h2>
      <p style={styles.sub}>Join 10k+ Ugandans winning daily</p>
      
      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>USERNAME</div>
        <input style={styles.input} type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="BadmanUG" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PHONE NUMBER</div>
        <input style={styles.input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>CHOOSE PIN/PASSWORD</div>
        <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>SEND VERIFICATION CODE VIA</div>
        <div style={styles.channelGrid}>
          <button 
            onClick={() => setOtpChannel('telegram')} 
            style={{ ...styles.channelBtn, borderColor: otpChannel === 'telegram' ? '#0088cc' : 'var(--border)' }}>
            🔵 TELEGRAM
          </button>
          <button 
            onClick={() => setOtpChannel('whatsapp')} 
            style={{ ...styles.channelBtn, borderColor: otpChannel === 'whatsapp' ? '#25D366' : 'var(--border)' }}>
            🟢 WHATSAPP
          </button>
        </div>
      </div>

      <button onClick={() => onRegister({ username, phone, otpChannel })} style={styles.ctaBtn}>CREATE ACCOUNT</button>
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
      <h2 style={styles.title}>DEPOSIT FUNDS</h2>
      <p style={styles.sub}>Add money to your QuizPot Wallet</p>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>AMOUNT (UGX)</div>
        <input style={styles.input} type="text" value={amount} onChange={e => setAmount(e.target.value.replace(/\D/g,'').toLocaleString())} placeholder="1,000" />
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>SELECT OPERATOR</div>
        <div style={styles.networkGrid}>
          <button 
            onClick={() => setNetwork('mtn')} 
            style={{
              ...styles.networkBtn, 
              borderColor: network === 'mtn' ? '#FFCC00' : 'var(--border)',
              background: network === 'mtn' ? 'rgba(255, 204, 0, 0.1)' : 'var(--surface)'
            }}
          >
            <div style={{ ...styles.networkLogoWrap, background: '#FFCC00' }}>
              <img src="/mtn.png" alt="MTN" style={styles.logoImg} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="color:#000; font-weight: 800; font-size: 14px;">MTN</span>'; }} />
            </div>
          </button>

          <button 
            onClick={() => setNetwork('airtel')} 
            style={{
              ...styles.networkBtn, 
              borderColor: network === 'airtel' ? '#FF0000' : 'var(--border)',
              background: network === 'airtel' ? 'rgba(255, 0, 0, 0.1)' : 'var(--surface)'
            }}
          >
            <div style={{ ...styles.networkLogoWrap, background: '#FF0000' }}>
              <img src="/airtel.png" alt="Airtel" style={styles.logoImg} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="color:#fff; font-weight: 800; font-size: 14px;">Airtel</span>'; }} />
            </div>
          </button>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputLabel}>PHONE NUMBER</div>
        <input style={styles.input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
      </div>

      <button 
        onClick={handleDeposit} 
        disabled={!valid || loading}
        style={{
          ...styles.ctaBtn,
          background: valid ? (network === 'mtn' ? '#FFCC00' : '#FF0000') : 'rgba(255,255,255,0.1)',
          color: valid && network === 'mtn' ? '#000' : (valid ? '#fff' : 'var(--text-dim)'),
        }}
      >
        {loading ? (
             <span style={styles.spinner} />
          ) : (
             `DEPOSIT VIA ${network ? network.toUpperCase() : '...'}`
          )}
      </button>
      <button onClick={onBack} style={styles.textBtn}>CANCEL</button>
    </div>
  )
}

const styles = {
  container: { padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeUp 0.5s ease' },
  title: { fontSize: 32, fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff' },
  sub: { fontSize: 13, color: 'var(--text-dim)', marginTop: -12 },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 10 },
  inputLabel: { fontSize: 10, fontWeight: 800, color: 'var(--text-dim)', letterSpacing: 1.5 },
  input: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 20px', color: '#fff', fontSize: 16, outline: 'none' },
  channelGrid: { display: 'flex', gap: 10 },
  channelBtn: { flex: 1, padding: '14px', background: 'rgba(255,255,255,0.02)', border: '2px solid', borderRadius: 16, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' },
  
  networkGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  networkBtn: { padding: '12px', borderRadius: '16px', border: '2px solid', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' },
  networkLogoWrap: { width: 44, height: 44, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  
  ctaBtn: { padding: '20px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 24, fontWeight: 900, fontSize: 18, cursor: 'pointer', marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 },
  textBtn: { background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'center' },
  spinner: { width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' },
}
