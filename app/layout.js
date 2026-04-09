import './globals.css'

export const metadata = {
  title: 'QuizPot UG — Answer. Survive. Win Big.',
  description: 'Uganda\'s #1 elimination quiz game. Pay 1,000 UGX, answer 10 questions, last one standing wins the pot.',
  themeColor: '#060608',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
