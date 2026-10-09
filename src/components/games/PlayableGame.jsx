import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Heart, RotateCcw, Sparkles, X } from 'lucide-react'
import { publicAsset } from '../../utils/publicAsset'
import styles from './PlayableGame.module.css'

function BlockCrush({ onFinish }) {
  const canvasRef = useRef(null)
  const finishRef = useRef(onFinish)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [ended, setEnded] = useState(false)
  const [revives, setRevives] = useState(0)
  const stateRef = useRef({ score: 0, lives: 3, ended: false })
  finishRef.current = onFinish

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const width = 760
    const height = 430
    const state = stateRef.current
    state.blocks = Array.from({ length: 40 }, (_, index) => ({ x: 32 + (index % 8) * 88, y: 46 + Math.floor(index / 8) * 42, alive: true, color: ['#e98b72', '#e5b857', '#6fae96', '#80a9d2'][Math.floor(index / 8)] }))
    state.ball = { x: width / 2, y: height - 78, vx: 3.1, vy: -3.6, radius: 8 }
    state.paddle = { x: width / 2 - 56, y: height - 42, width: 112, height: 12 }
    state.score = 0
    state.lives = 3
    state.ended = false
    setScore(0)
    setLives(3)
    setEnded(false)
    let frame = 0
    let last = 0

    const draw = (time) => {
      const delta = Math.min((time - last) / 16.67 || 1, 2)
      last = time
      context.clearRect(0, 0, width, height)
      context.fillStyle = '#eff4ef'
      context.fillRect(0, 0, width, height)
      for (const block of state.blocks) {
        if (!block.alive) continue
        context.fillStyle = block.color
        context.beginPath()
        context.roundRect(block.x, block.y, 72, 24, 6)
        context.fill()
      }
      const ball = state.ball
      const paddle = state.paddle
      ball.x += ball.vx * delta
      ball.y += ball.vy * delta
      if (ball.x < ball.radius || ball.x > width - ball.radius) ball.vx *= -1
      if (ball.y < ball.radius) ball.vy = Math.abs(ball.vy)
      if (ball.vy > 0 && ball.y + ball.radius >= paddle.y && ball.y < paddle.y + paddle.height && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
        ball.vy = -Math.abs(ball.vy)
        ball.vx = ((ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)) * 4.2
      }
      const hit = state.blocks.find((block) => block.alive && ball.x > block.x && ball.x < block.x + 72 && ball.y + ball.radius > block.y && ball.y - ball.radius < block.y + 24)
      if (hit) {
        hit.alive = false
        ball.vy *= -1
        state.score += 10
        setScore(state.score)
      }
      if (ball.y > height + ball.radius) {
        state.lives -= 1
        setLives(state.lives)
        ball.x = paddle.x + paddle.width / 2
        ball.y = height - 78
        ball.vx = 3.1
        ball.vy = -3.6
        if (!state.lives) {
          state.ended = true
          setEnded(true)
        }
      }
      context.fillStyle = '#355d4d'
      context.beginPath()
      context.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 7)
      context.fill()
      context.fillStyle = '#dfaa4f'
      context.beginPath()
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      context.fill()
      if (!state.blocks.some((block) => block.alive)) {
        state.ended = true
        setEnded(true)
      }
      if (!state.ended) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    const movePaddle = (clientX) => {
      const rect = canvas.getBoundingClientRect()
      const position = (clientX - rect.left) / rect.width * width
      state.paddle.x = Math.max(0, Math.min(width - state.paddle.width, position - state.paddle.width / 2))
    }
    const onPointer = (event) => movePaddle(event.clientX)
    const onKey = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      state.paddle.x += event.key === 'ArrowLeft' ? -28 : 28
      state.paddle.x = Math.max(0, Math.min(width - state.paddle.width, state.paddle.x))
    }
    canvas.addEventListener('pointermove', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('pointermove', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const revive = () => {
    if (revives > 0) return
    const state = stateRef.current
    state.lives = 1
    state.ended = false
    state.ball.y = 330
    state.ball.vy = -Math.abs(state.ball.vy)
    setLives(1)
    setEnded(false)
    setRevives(1)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const width = 760
    const height = 430
    let frame
    let last = 0
    const draw = (time) => {
      const delta = Math.min((time - last) / 16.67 || 1, 2); last = time
      context.clearRect(0, 0, width, height); context.fillStyle = '#eff4ef'; context.fillRect(0, 0, width, height)
      for (const block of state.blocks) if (block.alive) { context.fillStyle = block.color; context.beginPath(); context.roundRect(block.x, block.y, 72, 24, 6); context.fill() }
      const ball = state.ball; const paddle = state.paddle
      ball.x += ball.vx * delta; ball.y += ball.vy * delta
      if (ball.x < 8 || ball.x > width - 8) ball.vx *= -1
      if (ball.y < 8) ball.vy = Math.abs(ball.vy)
      if (ball.vy > 0 && ball.y + 8 >= paddle.y && ball.y < paddle.y + 12 && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) { ball.vy = -Math.abs(ball.vy); ball.vx = ((ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)) * 4.2 }
      const hit = state.blocks.find((block) => block.alive && ball.x > block.x && ball.x < block.x + 72 && ball.y + 8 > block.y && ball.y - 8 < block.y + 24)
      if (hit) { hit.alive = false; ball.vy *= -1; state.score += 10; setScore(state.score) }
      if (ball.y > height + 8) { state.ended = true; setEnded(true); return }
      context.fillStyle = '#355d4d'; context.beginPath(); context.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 7); context.fill()
      context.fillStyle = '#dfaa4f'; context.beginPath(); context.arc(ball.x, ball.y, 8, 0, Math.PI * 2); context.fill()
      if (!state.blocks.some((block) => block.alive)) { state.ended = true; setEnded(true); return }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    const canvasMove = (event) => { const rect = canvas.getBoundingClientRect(); state.paddle.x = Math.max(0, Math.min(width - state.paddle.width, ((event.clientX - rect.left) / rect.width * width) - state.paddle.width / 2)) }
    canvas.addEventListener('pointermove', canvasMove)
    state.reviveFrame = frame
    state.reviveCleanup = () => { cancelAnimationFrame(frame); canvas.removeEventListener('pointermove', canvasMove) }
  }

  useEffect(() => () => stateRef.current.reviveCleanup?.(), [])

  return (
    <div className={styles.playArea}>
      <div className={styles.hud}><span>BLOCK CRUSH <small>ARCADE / 01</small></span><span>SCORE <strong>{score}</strong></span><span className={styles.lives}>{Array.from({ length: lives }, (_, index) => <Heart size={15} fill="currentColor" key={index} />)}</span></div>
      <canvas ref={canvasRef} width="760" height="430" className={styles.canvas} aria-label="Block Crush game area. Move your pointer or arrow keys to control the paddle." />
      {ended && <ResultOverlay score={score} onFinish={() => finishRef.current(score)} onRevive={revive} revivesUsed={revives} />}
    </div>
  )
}

function SliceStorm({ onFinish }) {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [seconds, setSeconds] = useState(30)
  const [targets, setTargets] = useState([])
  const [ended, setEnded] = useState(false)
  const [revives, setRevives] = useState(0)
  const finishRef = useRef(onFinish)
  finishRef.current = onFinish
  const icons = ['🍊', '🍓', '🍋', '🍉', '🍐']

  useEffect(() => {
    if (ended) return undefined
    const tick = window.setInterval(() => {
      setSeconds((value) => value <= 1 ? 0 : value - 1)
      setTargets((current) => {
        if (current.some((target) => !target.hit && !target.bomb)) setLives((value) => Math.max(0, value - 1))
        return Array.from({ length: 3 }, (_, index) => ({ id: `${Date.now()}-${index}`, x: 12 + Math.random() * 72, y: 13 + Math.random() * 60, fruit: icons[Math.floor(Math.random() * icons.length)], bomb: Math.random() < .14, hit: false }))
      })
    }, 1150)
    return () => window.clearInterval(tick)
  }, [ended])

  useEffect(() => { if (seconds <= 0 || lives <= 0) setEnded(true) }, [seconds, lives])
  const hitTarget = (target) => {
    if (target.bomb) { setLives(0); setEnded(true); return }
    setScore((value) => value + 10)
    setTargets((current) => current.map((entry) => entry.id === target.id ? { ...entry, hit: true } : entry))
  }
  const revive = () => { setLives(1); setSeconds((value) => value + 12); setEnded(false); setRevives((value) => value + 1) }

  return (
    <div className={`${styles.playArea} ${styles.sliceArea}`}>
      <div className={styles.hud}><span>SLICE STORM <small>ARCADE / 02</small></span><span>TIME <strong>{seconds}s</strong></span><span>SCORE <strong>{score}</strong></span><span className={styles.lives}>{Array.from({ length: lives }, (_, index) => <Heart size={15} fill="currentColor" key={index} />)}</span></div>
      <div className={styles.sliceBoard}>
        <span className={styles.sliceHint}>Tap a fruit. Avoid the bombs.</span>
        {targets.map((target) => !target.hit && <button key={target.id} className={`${styles.fruit} ${target.bomb ? styles.bomb : ''}`} style={{ left: `${target.x}%`, top: `${target.y}%` }} onClick={() => hitTarget(target)} aria-label={target.bomb ? 'Bomb' : `Slice ${target.fruit}`} type="button">{target.bomb ? '✹' : target.fruit}</button>)}
        {ended && <ResultOverlay score={score} onFinish={() => finishRef.current(score)} onRevive={revive} revivesUsed={revives} />}
      </div>
      <p className={styles.touchHint}>Tap the flying fruit to score. Each miss costs a life. {revives > 0 ? `Revives used: ${revives}` : ''}</p>
    </div>
  )
}

function ResultOverlay({ score, onFinish, onRevive, revivesUsed }) {
  return (
    <div className={styles.resultShade}>
      <section className={styles.resultCard} role="dialog" aria-modal="true" aria-labelledby="result-title">
        <span className={styles.resultIcon}><Sparkles size={20} /></span>
        <p className={styles.resultEyebrow}>ROUND COMPLETE</p>
        <h2 id="result-title">Nice run.</h2>
        <div className={styles.scoreLabel}>FINAL SCORE <strong>{score}</strong></div>
        <p>Continue this round or bank your reward?</p>
        <button className={styles.reviveButton} onClick={onRevive} disabled={revivesUsed > 0} type="button"><RotateCcw size={15} /> {revivesUsed > 0 ? 'Revive used' : 'Revive once'}</button>
        <button className={styles.finishButton} onClick={onFinish} type="button">No thanks, collect reward <ArrowLeft size={15} /></button>
      </section>
    </div>
  )
}

export default function PlayableGame({ game, onFinish, onClose }) {
  return (
    <div className={styles.screen} role="dialog" aria-modal="true" aria-label={`${game.name} gameplay`}>
      <header className={styles.gameTopbar}><span><img src={publicAsset('/assets/games/optimized/game-coin.png')} alt="" /> GAME SESSION</span><button onClick={onClose} aria-label="Close game" type="button"><X size={20} /></button></header>
      {game.slug === 'block-crush' ? <BlockCrush onFinish={onFinish} /> : <SliceStorm onFinish={onFinish} />}
    </div>
  )
}