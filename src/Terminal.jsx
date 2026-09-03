import { useState, useRef, useEffect } from 'react'
import { projects } from './projects-data'
import './terminal.css'

const PROMPT = 'seth@sethnijsmetcalf:~/projects$'

const HELP = [
  'available commands',
  '',
  '  ls                list every project',
  '  cat <name>        show one project in full',
  '  open <name>       open a project in a new tab',
  '  clear             clear the screen',
  '  home              back to the main site',
  '  help              this list',
  '',
  'names are the short slugs shown by ls. tab completes them.'
]

// `ls` output, padded into columns so it reads like a real listing
function listing() {
  const width = Math.max(...projects.map((project) => project.slug.length))
  return [
    `${projects.length} projects`,
    '',
    ...projects.map((project) => {
      const flags = [project.live ? 'live' : null, project.private ? 'private' : null]
        .filter(Boolean)
        .join(', ')
      return `  ${project.slug.padEnd(width + 2)}${project.title}${flags ? `  [${flags}]` : ''}`
    })
  ]
}

function details(project) {
  return [
    project.title,
    '',
    project.description,
    '',
    `  stack     ${project.tech.join(', ')}`,
    `  status    ${project.live ? 'live' : 'not currently live'}${project.private ? ', private' : ''}`,
    `  link      ${project.private || !project.link ? 'private, no public link' : project.link}`
  ]
}

function find(name) {
  if (!name) return null
  const needle = name.toLowerCase()
  return (
    projects.find((project) => project.slug === needle) ||
    projects.find((project) => project.slug.startsWith(needle)) ||
    projects.find((project) => project.title.toLowerCase().includes(needle)) ||
    null
  )
}

export default function Terminal() {
  const [history, setHistory] = useState(() => [
    { type: 'output', lines: ["seth metcalf's project archive. type 'help' for commands."] },
    { type: 'command', text: 'ls' },
    { type: 'output', lines: listing() }
  ])
  const [input, setInput] = useState('')
  const [past, setPast] = useState([])
  const [pastIndex, setPastIndex] = useState(-1)
  const inputRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  const print = (entries) => setHistory((prev) => [...prev, ...entries])

  const run = (raw) => {
    const text = raw.trim()
    if (!text) return

    setPast((prev) => [text, ...prev])
    setPastIndex(-1)

    const [command, ...rest] = text.split(/\s+/)
    const argument = rest.join(' ')
    const echo = { type: 'command', text }

    switch (command.toLowerCase()) {
      case 'clear':
        setHistory([])
        return
      case 'help':
        print([echo, { type: 'output', lines: HELP }])
        return
      case 'ls':
        print([echo, { type: 'output', lines: listing() }])
        return
      case 'cat': {
        const project = find(argument)
        print([
          echo,
          project
            ? { type: 'output', lines: details(project) }
            : { type: 'error', lines: [`cat: ${argument || 'missing name'}: no such project`] }
        ])
        return
      }
      case 'open': {
        const project = find(argument)
        if (!project) {
          print([echo, { type: 'error', lines: [`open: ${argument || 'missing name'}: no such project`] }])
          return
        }
        if (project.private || !project.link) {
          print([echo, { type: 'error', lines: [`open: ${project.slug} is private, there is no public link`] }])
          return
        }
        window.open(project.link, '_blank', 'noopener,noreferrer')
        print([echo, { type: 'output', lines: [`opening ${project.link}`] }])
        return
      }
      case 'home':
        window.location.href = '/'
        return
      default:
        print([echo, { type: 'error', lines: [`${command}: command not found. type 'help'.`] }])
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      run(input)
      setInput('')
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const [command, ...rest] = input.split(/\s+/)
      const partial = rest.join(' ')
      if (!partial) return
      const match = projects.find((project) => project.slug.startsWith(partial.toLowerCase()))
      if (match) setInput(`${command} ${match.slug}`)
      return
    }

    // Up and down walk previously entered commands
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (past.length === 0) return
      event.preventDefault()
      const next =
        event.key === 'ArrowUp'
          ? Math.min(pastIndex + 1, past.length - 1)
          : Math.max(pastIndex - 1, -1)
      setPastIndex(next)
      setInput(next === -1 ? '' : past[next])
    }
  }

  return (
    <main
      className="terminal"
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus()
      }}
    >
      <div className="terminal-bar">
        <span className="terminal-title">projects</span>
        <a className="terminal-exit" href="/">
          exit
        </a>
      </div>

      <div className="terminal-body">
        <div className="terminal-log" role="log" aria-live="polite" aria-label="Terminal output">
          {history.map((entry, index) => {
            if (entry.type === 'command') {
              return (
                <div key={index} className="terminal-line">
                  <span className="terminal-prompt">{PROMPT}</span> {entry.text}
                </div>
              )
            }
            return (
              <div
                key={index}
                className={entry.type === 'error' ? 'terminal-block is-error' : 'terminal-block'}
              >
                {entry.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="terminal-line">
                    {line || ' '}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <div className="terminal-input-row">
          <label className="terminal-prompt" htmlFor="terminal-input">
            {PROMPT}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            className="terminal-input"
            value={input}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal command input"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div ref={endRef} />
      </div>
    </main>
  )
}
