'use client'
import { useState } from 'react'

export function PaymentScreen({ onPay }) {
  const [network, setNetwork] = useState(null)
  const [phone, setPhone] = useState('')
  const [amountStr, setAmountStr] = useState('')
  const [loading, setLoading] = useState(false)

  const amount = parseInt(amountStr.replace(/,/g, '')) || 0;
  const valid = network && phone.length >= 9 && amount >= 200;

  const handlePay = () => {
    if (!valid) return;
    setLoading(true)
    setTimeout(() => { 
      setLoading(false); 
      onPay(amount, network);
    }, 2000)
  }

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) {
      setAmountStr('')
      return
    }
    const num = parseInt(raw, 10)
    setAmountStr(num.toLocaleString())
  }

  const addAmount = (add) => {
    setAmountStr((amount + add).toLocaleString())
  }

  return (
    <div style={styles.container}>
      <div style={styles.bgGlow} />

      <div style={styles.authCard}>
        <div style={styles.topSection}>
          <h1 style={styles.title}>DEPOSIT TO PLAY</h1>
          <p style={styles.subtitle}>Win up to 50x your stake instantly</p>
        </div>

        {/* Amount Input */}
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Amount to Stake (Min: 200)</label>
          <div style={{ ...styles.inputWrapper, borderColor: amount >= 200 ? 'var(--gold)' : 'var(--border)' }}>
            <span style={styles.prefix}>UGX</span>
            <input 
              style={{ ...styles.input, color: 'var(--gold)' }} 
              type="text" 
              placeholder="0"
              value={amountStr}
              onChange={handleAmountChange}
            />
          </div>
          <div style={styles.quickAmounts}>
            <button style={styles.quickBtn} onClick={() => addAmount(1000)}>+1K</button>
            <button style={styles.quickBtn} onClick={() => addAmount(5000)}>+5K</button>
            <button style={styles.quickBtn} onClick={() => addAmount(10000)}>+10K</button>
            <button style={{...styles.quickBtn, color: 'var(--text)'}} onClick={() => setAmountStr('50000')}>MAX</button>
          </div>
        </div>

        {/* Network Selection */}
        <div style={{ ...styles.inputGroup, opacity: amount >= 200 ? 1 : 0.4, transition: 'opacity 0.3s' }}>
          <label style={styles.inputLabel}>Mobile Money Network</label>
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

        {/* Phone Input */}
        <div style={{ ...styles.inputGroup, opacity: network ? 1 : 0.4, pointerEvents: network ? 'auto' : 'none', transition: 'all 0.3s' }}>
          <label style={styles.inputLabel}>MoMo Number</label>
          <div style={styles.inputWrapper}>
            <span style={styles.prefix}>+256</span>
            <input 
              style={styles.input} 
              type="tel" 
              placeholder={network === 'mtn' ? "77X XXX XXX" : "75X XXX XXX"}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handlePay} 
          disabled={!valid || loading}
          style={{
            ...styles.payBtn,
            background: valid ? (network === 'mtn' ? '#FFCC00' : (network === 'airtel' ? '#FF0000' : 'var(--gold)')) : 'rgba(255,255,255,0.1)',
            color: valid && (network === 'mtn' || !network) ? '#000' : (valid ? '#fff' : 'var(--text-dim)'),
            transform: loading ? 'scale(0.98)' : 'scale(1)',
            boxShadow: valid ? (network === 'mtn' ? '0 10px 30px rgba(255,204,0,0.3)' : (network === 'airtel' ? '0 10px 30px rgba(255,0,0,0.3)' : '0 10px 30px rgba(245,200,66,0.3)')) : 'none',
          }}
        >
          {loading ? (
            <div style={styles.loaderWrap}>
              <span style={{...styles.spinner, borderTopColor: network === 'mtn' ? '#000' : '#fff'}} /> PROCESSING...
            </div>
          ) : (
             `DEPOSIT & PLAY`
          )}
        </button>

      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', maxWidth: '440px', margin: '0 auto', position: 'relative' },
  bgGlow: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(245,200,66,0.05) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' },

  authCard: { width: '100%', background: 'rgba(20, 20, 25, 0.7)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 40, padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 1, boxShadow: '0 30px 60px rgba(0,0,0,0.6)', animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)' },
  topSection: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 },
  title: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: 'var(--text-dim)', fontFamily: 'var(--font-body)' },

  networkGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  networkBtn: { padding: '12px', borderRadius: '30px', border: '2px solid', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' },
  networkLogoWrap: { width: 64, height: 64, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },

  inputGroup: { display: 'flex', flexDirection: 'column', gap: 10 },
  inputLabel: { fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: 'var(--font-display)', fontWeight: 700, marginLeft: 16 },
  inputWrapper: { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', transition: 'all 0.3s ease' },
  prefix: { padding: '18px 0 18px 24px', fontSize: 15, color: 'var(--text-dim)', fontWeight: 600, fontFamily: 'var(--font-body)' },
  input: { flex: 1, padding: '18px 20px', background: 'transparent', border: 'none', color: '#fff', fontSize: 18, outline: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, minWidth: 0 },

  quickAmounts: { display: 'flex', gap: 8, marginTop: 4, padding: '0 8px' },
  quickBtn: { flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '10px 0', color: 'var(--gold)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'background 0.2s' },

  payBtn: { width: '100%', padding: '20px', borderRadius: 999, border: 'none', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, letterSpacing: 1, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', marginTop: '8px' },
  loaderWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 },
  spinner: { width: 20, height: 20, border: '3px solid rgba(255,255,255,0.2)', borderRadius: '50%', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' },
}
