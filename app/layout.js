import './globals.css'

export const metadata = {
  title: 'QuizPot UG — Answer. Survive. Win Big.',
  description: 'Uganda\'s #1 elimination quiz game. Pay 1,000 UGX, answer 10 questions, last one standing wins the pot.',
}

export const viewport = {
  themeColor: '#060608',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
