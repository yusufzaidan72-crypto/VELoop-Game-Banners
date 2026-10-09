import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import useGameStore from '../../store/useGameStore'
import { publicAsset } from '../../utils/publicAsset'
import styles from './GameCoinBalance.module.css'

/**
 * Displays the centralised Game Coin balance.
 * Animates the number when it changes.
 */
export default function GameCoinBalance({ size = 'md', showLabel = false }) {
  const gameCoinBalance = useGameStore((s) => s.gameCoinBalance)
  const [displayVal, setDisplayVal]   = useState(gameCoinBalance)
  const [flash, setFlash]             = useState(false)

  useEffect(() => {
    if (gameCoinBalance !== displayVal) {
      setFlash(true)
      const timer = setTimeout(() => {
        setDisplayVal(gameCoinBalance)
        setFlash(false)
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [gameCoinBalance]) // eslint-disable-line

  const sizeClass = size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : ''

  return (
    <motion.div
      className={`${styles.balance} ${sizeClass}`}
      animate={flash ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.25 }}
      aria-label={`Game Coin balance: ${gameCoinBalance}`}
      role="status"
    >
      <img
        src={publicAsset('/assets/games/optimized/game-coin.png')}
        alt="Game Coin"
        className={styles.coinImg}
      />
      <div>
        <AnimatePresence mode="wait">
          <motion.span
            key={gameCoinBalance}
            className={styles.amount}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            {gameCoinBalance.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        {showLabel && <div className={styles.label}>Game Coins</div>}
      </div>
    </motion.div>
  )
}
