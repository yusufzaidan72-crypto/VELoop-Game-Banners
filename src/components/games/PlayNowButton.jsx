import { useState } from 'react'
import { Play, AlertCircle, Loader } from 'lucide-react'
import useGameStore from '../../store/useGameStore'
import { publicAsset } from '../../utils/publicAsset'
import styles from './PlayNowButton.module.css'

/**
 * Play Now button — validates token balance before calling onPlay.
 * States: normal | loading | insufficient | disabled
 */
export default function PlayNowButton({
  cost = 20,
  onPlay,
  onInsufficient,
  size = 'md',
  disabled = false,
  showCost = true,
}) {
  const [loading, setLoading] = useState(false)
  const tokenBalance   = useGameStore((s) => s.tokenBalance)
  const hasEnough      = tokenBalance >= cost

  const handleClick = async () => {
    if (loading || disabled) return
    if (!hasEnough) {
      onInsufficient?.()
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 420))   // brief loading feel
    setLoading(false)
    onPlay?.()
  }

  const sizeClass    = size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : ''
  const stateClass   = !hasEnough ? styles.insufficient : loading ? styles.loading : ''
  const label        = loading ? 'Starting…' : !hasEnough ? `Need ${cost} Tokens` : 'Play Now'
  const ariaLabel    = !hasEnough
    ? `Insufficient tokens. You need ${cost} Tokens but have ${tokenBalance}.`
    : `Play Now — costs ${cost} Tokens`

  return (
    <button
      className={`${styles.btn} ${sizeClass} ${stateClass}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      type="button"
    >
      {loading ? (
        <Loader size={15} className={styles.icon} style={{ animation: 'spin 0.8s linear infinite' }} />
      ) : !hasEnough ? (
        <AlertCircle size={15} className={styles.icon} />
      ) : (
        <Play size={15} className={styles.icon} fill="currentColor" />
      )}

      <span>{label}</span>

      {showCost && hasEnough && !loading && (
        <span className={styles.tokenCost} aria-hidden="true">
          <img
            src={publicAsset('/assets/games/multi_token.jpeg')}
            alt=""
            className={styles.tokenImg}
          />
          {cost}
        </span>
      )}
    </button>
  )
}
