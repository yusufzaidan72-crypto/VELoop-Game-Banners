import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coins, Play } from 'lucide-react'
import styles from './GameCard.module.css'

/**
 * Reusable Arcade Game Card — Scalable UI, mobile optimized with game title, category, and token cost.
 */
export default function GameCard({ game }) {
  const navigate = useNavigate()

  const goToGame = () => navigate(`/games/${game.slug}`)

  return (
    <motion.article 
      className={styles.card} 
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={goToGame}
    >
      <div className={styles.artwork}>
        <img
          src={game.image}
          alt={`${game.name} game artwork`}
          className={styles.artworkImg}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.artworkOverlay} />
        <span className={styles.badge}>{game.category}</span>
        
        <div className={styles.tokenCostTag}>
          <Coins size={12} color="#ffb703" />
          <span>{game.cost} TOKENS</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.metaInfo}>
          <h3 className={styles.title}>{game.name}</h3>
          <p className={styles.description}>{game.description || 'Play & earn high scores!'}</p>
        </div>

        <button type="button" className={styles.playBtn} onClick={goToGame} aria-label={`Play ${game.name}`}>
          <Play size={14} fill="#000" color="#000" />
          <span>PLAY NOW</span>
        </button>
      </div>
    </motion.article>
  )
}
