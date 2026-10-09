import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Coins, Gamepad2, LockKeyhole, RotateCcw, Sparkles } from 'lucide-react'
import GameCoinBalance from '../components/games/GameCoinBalance'
import PlayableGame from '../components/games/PlayableGame'
import games from '../data/gamesData'
import { publicAsset } from '../utils/publicAsset'
import useGameStore from '../store/useGameStore'
import styles from './GameHome.module.css'

export default function GameHome() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const game = games.find((entry) => entry.slug === slug)
  const tokenBalance = useGameStore((state) => state.tokenBalance)
  const deductTokens = useGameStore((state) => state.deductTokens)
  const addGameCoins = useGameStore((state) => state.addGameCoins)
  const markGamePlayed = useGameStore((state) => state.markGamePlayed)
  const hasPlayed = useGameStore((state) => state.hasPlayedGame(game?.id))
  const [guideOpen, setGuideOpen] = useState(false)
  const [sessionOpen, setSessionOpen] = useState(false)
  const [pendingStart, setPendingStart] = useState(false)
  const [message, setMessage] = useState(() => game && tokenBalance < game.cost ? `You need ${game.cost} Tokens. Your balance is ${tokenBalance}.` : '')
  const [reward, setReward] = useState(0)

  if (!game) return <main className={styles.notFound}><Gamepad2 size={32} /><h1>Game not found</h1><Link to="/games">Back to games</Link></main>

  const begin = () => {
    if (!game.playable) return
    if (!deductTokens(game.cost)) {
      setMessage(`You need ${game.cost} Tokens. Your balance is ${tokenBalance}.`)
      return
    }
    markGamePlayed(game.id)
    setMessage('')
    if (hasPlayed) setSessionOpen(true)
    else {
      setPendingStart(true)
      setGuideOpen(true)
    }
  }

  const completeRound = (score) => {
    const earned = Math.max(1, Math.min(game.reward, Math.floor(score / (game.slug === 'block-crush' ? 35 : 25))))
    addGameCoins(earned)
    setReward(earned)
    setSessionOpen(false)
  }

  const openGuide = () => setGuideOpen(true)
  const dismissGuide = () => {
    setGuideOpen(false)
    if (pendingStart) setSessionOpen(true)
    setPendingStart(false)
  }

  return (
    <main className={styles.page}>
      <div className={`${styles.ambient} ${game.slug === 'slice-storm' ? styles.ambientFruit : ''}`} />
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/games')} aria-label="Back to games" type="button"><ArrowLeft size={18} /><span>Games</span></button>
        <GameCoinBalance showLabel />
      </header>

      <section className={`${styles.hero} ${game.slug === 'slice-storm' ? styles.fruitHero : ''}`}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>{game.category} <i /> VELOOP ORIGINAL</span>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <div className={styles.entryLine}><img src={publicAsset('/assets/games/optimized/token-icon.png')} alt="" /> Entry fee <strong>{game.cost} Tokens</strong></div>
          {message && <p className={styles.notice} role="alert"><LockKeyhole size={15} />{message}</p>}
          {reward > 0 && <p className={styles.rewardNotice} role="status"><Sparkles size={16} /> Round complete: +{reward} Game Coins</p>}
          <div className={styles.actions}>
            {game.playable ? (
              <button className={styles.playButton} onClick={begin} type="button"><span><Gamepad2 size={18} /></span>{sessionOpen ? 'Round in progress' : hasPlayed ? 'Play again' : 'Play now'} <ArrowRight size={17} /></button>
            ) : (
              <button className={styles.soonButton} disabled type="button"><LockKeyhole size={16} /> Gameplay coming soon</button>
            )}
            <button className={styles.guideButton} onClick={openGuide} type="button"><BookOpen size={16} /> How to play</button>
          </div>
          {tokenBalance < game.cost && game.playable && <div className={styles.balanceHint}><Coins size={14} /> Balance: {tokenBalance} Tokens</div>}
        </div>
        <div className={styles.artWrap}>
          <span className={styles.artIndex}>{String(game.id).padStart(2, '0')} <i /> 13</span>
          <img src={game.image} alt={`${game.name} artwork`} className={styles.heroArt} />
        </div>
      </section>

      <section className={styles.details}>
        <div className={styles.detailBlock}><span className={styles.detailLabel}>THE CHALLENGE</span><strong>{game.tagline}</strong><span>One round. One score. A little more in your Game Coin balance.</span></div>
        <div className={styles.detailBlock}><span className={styles.detailLabel}>ROUND REWARD</span><strong><img className={styles.coin} src={publicAsset('/assets/games/optimized/game-coin.png')} alt="" /> Up to {game.reward} Game Coins</strong><span>Rewards are based on your round score.</span></div>
      </section>

      <footer className={styles.bottomNav}>
        <Link to={`/games/${game.slug}`} className={styles.bottomActive}><Gamepad2 size={17} /> Home</Link>
        <Link to="/redeem"><Coins size={17} /> Redeem <ArrowRight size={14} /></Link>
      </footer>

      {sessionOpen && <PlayableGame game={game} onFinish={completeRound} onClose={() => setSessionOpen(false)} />}
      {guideOpen && (
        <div className={styles.modalShade} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) dismissGuide() }}>
          <section className={styles.guideModal} role="dialog" aria-modal="true" aria-labelledby="guide-title">
            <div className={styles.guideTop}><span><BookOpen size={17} /></span><button onClick={dismissGuide} aria-label="Close guide" type="button">×</button></div>
            <p className={styles.detailLabel}>QUICK BRIEF / {game.category.toUpperCase()}</p>
            <h2 id="guide-title">How to play</h2>
            <ol>{game.howToPlay.map((tip) => <li key={tip}>{tip}</li>)}</ol>
            <button className={styles.guideCta} onClick={dismissGuide} type="button">Got it <ArrowRight size={16} /></button>
            {!game.playable && <p className={styles.comingNote}>This title is in the games lineup; playable rounds are coming soon.</p>}
          </section>
        </div>
      )}
    </main>
  )
}