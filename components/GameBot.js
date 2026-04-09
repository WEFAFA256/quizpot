'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function GameBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hey! I'm Quizzo AI. 👋 Your personal QuizPot assistant. How can I help you today?", isBot: true }
  ])

  const FAQs = [
    { q: "How do I play?", a: "Deposit money to your wallet. Join a pool (200, 500, or 1k). Answer trivia questions fast. Last person standing wins the pot!" },
    { q: "How do I withdraw?", a: "Go to your dashboard wallet and click withdraw. Funds are sent instantly to your registered Phone Number via MoMo." },
    { q: "What is Cash Out?", a: "After a correct answer, you can 'Cash Out' to take your current multiplier winnings, or 'Risk It' to double your reward." }
  ]

  const ask = (q, a) => {
    setMessages([...messages, { text: q, isBot: false }, { text: a, isBot: true }])
  }

  return (
    <>
      <motion.button 
        drag
        dragConstraints={{ left: 0, right: 300, top: 0, bottom: 600 }}
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.fab}
      >
        {isOpen ? '✕' : <img src="/logo.png" style={styles.botAvatar} />}
      </motion.button>

      {isOpen && (
        <div style={styles.drawer}>
          <div style={styles.header}>
            <div style={styles.logoBlock}>
              <img src="/logo.png" style={styles.miniLogo} />
              <span>QUIZZO AI ASSISTANT</span>
            </div>
          </div>
          <div style={styles.chatArea}>
            {messages.map((m, i) => (
              <div key={i} style={{ ...styles.msg, alignSelf: m.isBot ? 'flex-start' : 'flex-end', background: m.isBot ? 'rgba(255,255,255,0.05)' : 'var(--gold)', color: m.isBot ? '#fff' : '#000' }}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={styles.faqList}>
             <p style={{fontSize: 10, color: 'var(--text-dim)', marginBottom: 8}}>QUICK LINKS:</p>
             {FAQs.map((f, i) => (
               <button key={i} onClick={() => ask(f.q, f.a)} style={styles.faqBtn}>{f.q}</button>
             ))}
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  fab: { position: 'fixed', bottom: 100, left: 24, zIndex: 1001, background: 'var(--gold)', border: 'none', borderRadius: '50%', width: 64, height: 64, cursor: 'grab', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, overflow: 'hidden' },
  botAvatar: { width: '100%', height: '100%', objectFit: 'cover' },
  drawer: { position: 'fixed', bottom: 180, left: 24, width: 'calc(100% - 48px)', maxWidth: 350, background: 'rgba(10,10,12,0.95)', backdropFilter: 'blur(20px)', border: '1px solid var(--border)', borderRadius: 32, zIndex: 1001, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 30px 60px rgba(0,0,0,0.8)', animation: 'fadeUp 0.3s ease' },
  header: { borderBottom: '1px solid var(--border)', paddingBottom: 12 },
  logoBlock: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 900, color: 'var(--gold)', letterSpacing: 1 },
  miniLogo: { width: 24, height: 24, borderRadius: 6 },
  chatArea: { maxHeight: 250, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 4 },
  msg: { padding: '12px 16px', borderRadius: 20, fontSize: 13, maxWidth: '85%', lineHeight: 1.45, animation: 'fadeIn 0.3s ease' },
  faqList: { display: 'flex', flexDirection: 'column', gap: 8 },
  faqBtn: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px', color: '#fff', fontSize: 12, textAlign: 'left', cursor: 'pointer', transition: 'background 0.2s' }
}
