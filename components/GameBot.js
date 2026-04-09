'use client'
import { useState } from 'react'

export default function GameBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hey! I'm the QuizPot Bot. 👋 How can I help you today?", isBot: true }
  ])

  const FAQs = [
    { q: "How do I play?", a: "Deposit money to your wallet. Join a pool (200, 500, or 1k). Answer trivia questions fast. Last person standing wins the pot!" },
    { q: "How do I withdraw?", a: "Go to your dashboard wallet and click withdraw. Funds are sent instantly to your registered Phone Number via MoMo." },
    { q: "What is Cash Out?", a: "After a correct answer, you can 'Cash Out' to take your current multiplier winnings, or 'Risk It' to double your reward in the next round." }
  ]

  const ask = (q, a) => {
    setMessages([...messages, { text: q, isBot: false }, { text: a, isBot: true }])
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.fab}>
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div style={styles.drawer}>
          <div style={styles.header}>QUIZPOT ASSISTANT</div>
          <div style={styles.chatArea}>
            {messages.map((m, i) => (
              <div key={i} style={{ ...styles.msg, alignSelf: m.isBot ? 'flex-start' : 'flex-end', background: m.isBot ? 'rgba(255,255,255,0.05)' : 'var(--gold)', color: m.isBot ? '#fff' : '#000' }}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={styles.faqList}>
             <p style={{fontSize: 10, color: 'var(--text-dim)', marginBottom: 8}}>QUICK QUESTIONS:</p>
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
  fab: { position: 'fixed', bottom: 24, left: 24, zIndex: 1001, background: 'var(--gold)', color: '#000', border: 'none', borderRadius: '50%', width: 56, height: 56, fontSize: 24, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  drawer: { position: 'fixed', bottom: 90, left: 24, width: 'calc(100% - 48px)', maxWidth: 350, background: '#0a0a0c', border: '1px solid var(--border)', borderRadius: 24, zIndex: 1001, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.8)', animation: 'fadeUp 0.3s ease' },
  header: { fontSize: 12, fontWeight: 900, color: 'var(--gold)', letterSpacing: 1 },
  chatArea: { maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 },
  msg: { padding: '10px 14px', borderRadius: 16, fontSize: 13, maxWidth: '85%', lineHeight: 1.4 },
  faqList: { display: 'flex', flexDirection: 'column', gap: 6 },
  faqBtn: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px', color: '#fff', fontSize: 12, textAlign: 'left', cursor: 'pointer' }
}
