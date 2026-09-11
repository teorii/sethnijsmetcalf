import { useState, useRef, useEffect } from 'react'
import { projects } from './projects-data'
import './terminal.css'

const PROMPT = 'seth@sethnijsmetcalf:~/projects$'
const SLUG_CHARS = Math.max(...projects.map((project) => project.slug.length))

const BANNER = [
  "seth metcalf's project archive.",
  "click any project to open it, or type 'help' if you'd rather use commands."
]

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
  'names are the short slugs on the left. tab completes them.'
]

function flagsFor(project) {
  return [project.live ? 'live' : null, project.private ? 'private' : null].filter(Boolean)
}

// Public projects render their title as a real link, so the page is usable
// without typing a single command
function ProjectName({ project }) {
  if (project.private || !project.link) {
    return <span className="terminal-name">{project.title}</span>
  }
  return (
    <a
      className="terminal-name terminal-link"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {project.title}
    </a>
  )
}

// Each entry is a grid, so a title that wraps stays in its own column instead
// of falling back under the slug the way padded spaces would
function Listing() {
  return (
    <div className="terminal-block" style={{ '--slug-col': `${SLUG_CHARS}ch` }}>
      <div className="terminal-line">{projects.length} projects</div>
      <div className="terminal-line"> </div>
      {projects.map((project) => {
        const flags = flagsFor(project)
        return (
          <div key={project.slug} className="terminal-entry">
            <span className="terminal-slug">{project.slug}</span>
            <span>
              <ProjectName project={project} />
              {flags.length > 0 && <span className="terminal-flags"> [{flags.join(', ')}]</span>}
            </span>
            <div className="terminal-desc">{project.description}</div>
          </div>
        )
      })}
    </div>
  )
}

function Details({ project }) {
  const flags = flagsFor(project)
  return (
    <div className="terminal-block">
      <div className="terminal-line">
        <ProjectName project={project} />
        {flags.length > 0 && <span className="terminal-flags">  [{flags.join(', ')}]</span>}
      </div>
      <div className="terminal-line"> </div>
      <div className="terminal-line">{project.description}</div>
      <div className="terminal-line"> </div>
      <div className="terminal-line">{`  stack     ${project.tech.join(', ')}`}</div>
      <div className="terminal-line">
        {'  link      '}
        {project.private || !project.link ? (
          'private, no public link'
        ) : (
          <a className="terminal-link" href={project.link} target="_blank" rel="noopener noreferrer">
            {project.link}
          </a>
        )}
      </div>
    </div>
  )
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
    { type: 'output', lines: BANNER },
    { type: 'command', text: 'ls' },
    { type: 'listing' }
  ])
  const [input, setInput] = useState('')
  const [past, setPast] = useState([])
  const [pastIndex, setPastIndex] = useState(-1)
  const inputRef = useRef(null)
  const endRef = useRef(null)
  // Only follow output the visitor asked for. Scrolling on mount would carry
  // them past the banner and the listing before they had read a word.
  const pendingScroll = useRef(false)

  useEffect(() => {
    if (!pendingScroll.current) return
    pendingScroll.current = false
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [history])

  const print = (entries) => setHistory((prev) => [...prev, ...entries])

  const run = (raw) => {
    const text = raw.trim()
    if (!text) return

    pendingScroll.current = true
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
        print([echo, { type: 'listing' }])
        return
      case 'cat': {
        const project = find(argument)
        print([
          echo,
          project
            ? { type: 'details', project }
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
    <main className="terminal">
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
            if (entry.type === 'listing') return <Listing key={index} />
            if (entry.type === 'details') return <Details key={index} project={entry.project} />
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

        {/* Clicking blank space focuses the prompt, but only for people who want it */}
        <div
          className="terminal-input-row"
          onClick={() => {
            if (!window.getSelection()?.toString()) inputRef.current?.focus()
          }}
        >
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
