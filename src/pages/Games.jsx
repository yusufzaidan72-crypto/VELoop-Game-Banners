import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Coins, Dices, Gamepad2, Sparkles } from 'lucide-react'
import GameCard from '../components/games/GameCard'
import GameCoinBalance from '../components/games/GameCoinBalance'
import HeroBanner from '../components/HeroBanner'
import SpinWheelModal from '../components/SpinWheelModal'
import VeloopHowItWorks from '../components/VeloopHowItWorks'
import VeloopLiveTicker from '../components/VeloopLiveTicker'
import VeloopFooter from '../components/VeloopFooter'
import gamesData from '../data/gamesData'
import { publicAsset } from '../utils/publicAsset'
import useGameStore from '../store/useGameStore'
import styles from './Games.module.css'

const categories = ['ALL', 'ARCADE', 'ACTION', 'PUZZLE', 'CASUAL']

export default function Games() {
  const tokenBalance = useGameStore((state) => state.tokenBalance)
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [isWheelOpen, setIsWheelOpen] = useState(false)

  const filteredGames = selectedCategory === 'ALL'
    ? gamesData
    : gamesData.filter((g) => g.category?.toUpperCase() === selectedCategory)

  const scrollToGames = () => {
    const el = document.getElementById('games-grid-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>
      {/* ── Header ────────────────────────────────────────── */}
      <header className={styles.topbar}>
        <Link to="/games" className={styles.brand} aria-label="VELoop Games home">
          <img src={publicAsset('/veloop-logo.gif')} alt="VELoop Logo" className={styles.logoAnim} />
          <span>VELoop<span className={styles.brandAccent}> / GAMES</span></span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link className={styles.navActive} to="/games">Games</Link>
          <button type="button" className={styles.wheelNavBtn} onClick={() => setIsWheelOpen(true)}>
            <Dices size={14} color="#ff2a85" />
            <span>Spin</span>
          </button>
          <Link to="/redeem">Redeem</Link>
        </nav>

        <div className={styles.balances}>
          <div className={styles.tokenPill}>
            <Coins size={14} color="#ffb703" />
            <span><strong>{tokenBalance}</strong> Tokens</span>
          </div>
          <GameCoinBalance size="sm" />
        </div>
      </header>

      {/* ── Main Content Container ───────────────────────── */}
      <main className={styles.mainContainer}>
        {/* Live Activity Ticker */}
        <VeloopLiveTicker />

        {/* Compact Poster Banner Slideshow */}
        <HeroBanner 
          onSpinClick={() => setIsWheelOpen(true)}
          onScrollToGames={scrollToGames}
        />

        {/* Daily Wheel Callout Banner */}
        <section className={styles.spinCalloutCard}>
          <div className={styles.spinCalloutContent}>
            <div className={styles.spinBadge}>
              <Sparkles size={12} />
              <span>SPIN & WIN DAILY</span>
            </div>
            <h2>LUCKY WHEEL OF FORTUNE</h2>
            <p>1 Token = 1 Spin! Win up to 1,000 VELoop Game Coins instantly.</p>
          </div>

          <button 
            type="button" 
            className={styles.spinCtaBtn}
            onClick={() => setIsWheelOpen(true)}
          >
            <Dices size={18} />
            <span>SPIN NOW (1 TOKEN)</span>
          </button>
        </section>

        {/* ── Games Section Grid ───────────────────────────── */}
        <section id="games-grid-section" className={styles.gamesSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleRow}>
              <div className={styles.titleRowLeft}>
                <Gamepad2 size={22} color="#00f0ff" />
                <h2>VELoop ARCADE GAMES</h2>
              </div>
              <span className={styles.gameCounter}>{filteredGames.length} GAMES AVAILABLE</span>
            </div>

            {/* Category Filter Pills */}
            <div className={styles.categoryBar}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.catChip} ${selectedCategory === cat ? styles.activeCat : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontally scrollable game collection */}
          <div className={styles.gamesGrid} role="region" aria-label="Games" tabIndex={0}>
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* How VELoop Rewards Work Section */}
        <VeloopHowItWorks />
      </main>

      {/* VELoop Footer */}
      <VeloopFooter />

      {/* Interactive Spin Wheel Modal */}
      <SpinWheelModal 
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
      />
    </div>
  )
}