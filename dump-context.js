// Run with: node dump-context.js GameScreen AuthScreens
// Dumps specified components + lib/data.js into one pasteable block

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)

const filesToDump = [
  'lib/data.js',
  ...args.map(a => {
    if (a.includes('/')) return a
    if (a === 'page') return 'app/page.js'
    return `components/${a}.js`
  })
]

let output = `=== QUIZPOT CODEBASE CONTEXT ===\n`
output += `Project: QuizPot — Telegram Mini App trivia game (Next.js)\n`
output += `Stack: Next.js 14, React, no external UI libs\n\n`

for (const file of filesToDump) {
  const fullPath = path.join(__dirname, file)
  if (!fs.existsSync(fullPath)) {
    output += `// FILE NOT FOUND: ${file}\n\n`
    continue
  }
  const content = fs.readFileSync(fullPath, 'utf8')
  output += `${'='.repeat(60)}\n`
  output += `FILE: ${file}\n`
  output += `${'='.repeat(60)}\n`
  output += content + '\n\n'
}

const outFile = 'ai-studio-context.txt'
fs.writeFileSync(outFile, output)
console.log(`\n✅ Context dumped to: ${outFile}`)
console.log(`📋 Copy that file's contents and paste into AI Studio\n`)
console.log(`Files included:`)
filesToDump.forEach(f => console.log(`  - ${f}`))
