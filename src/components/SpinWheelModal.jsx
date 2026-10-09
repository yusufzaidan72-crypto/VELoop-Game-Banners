import { useState, useRef } from 'react'
import { Dices, X, Sparkles, Trophy, Coins, Zap } from 'lucide-react'
import useGameStore from '../store/useGameStore'
import styles from './SpinWheelModal.module.css'

const segments = [
  { label: '50 COINS', val: 50, color: '#00f0ff', text: '#000' },
  { label: '10 COINS', val: 10, color: '#a855f7', text: '#fff' },
  { label: '100 COINS', val: 100, color: '#ffb703', text: '#000' },
  { label: '500 JACKPOT', val: 500, color: '#ff2a85', text: '#fff' },
  { label: '20 COINS', val: 20, color: '#10b981', text: '#fff' },
  { label: '250 COINS', val: 250, color: '#f97316', text: '#fff' },
  { label: '5 COINS', val: 5, color: '#3b82f6', text: '#fff' },
  { label: '1000 MEGA', val: 1000, color: '#ff0055', text: '#fff' },
]

export default function SpinWheelModal({ isOpen, onClose }) {
  const tokenBalance = useGameStore((state) => state.tokenBalance)
  const deductTokens = useGameStore((state) => state.deductTokens)
  const addGameCoins = useGameStore((state) => state.addGameCoins)

  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [wonReward, setWonReward] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const wheelRef = useRef(null)

  if (!isOpen) return null

  const handleSpin = () => {
    if (spinning) return
    setErrorMsg('')

    if (tokenBalance < 1) {
      setErrorMsg('You need at least 1 Token to spin!')
      return
    }

    const success = deductTokens(1)
    if (!success) {
      setErrorMsg('Insufficient Tokens!')
      return
    }

    setSpinning(true)
    setWonReward(null)

    // Random winner index
    const winningIndex = Math.floor(Math.random() * segments.length)
    const segmentAngle = 360 / segments.length
    
    // Calculate final angle to land on pointer (pointer is at top 270 deg)
    // Extra full 5 to 8 rotations for excitement
    const fullSpins = (5 + Math.floor(Math.random() * 4)) * 360
    const targetDegree = fullSpins + (360 - (winningIndex * segmentAngle + segmentAngle / 2))

    setRotation(targetDegree)

    setTimeout(() => {
      setSpinning(false)
      const reward = segments[winningIndex]
      setWonReward(reward)
      addGameCoins(reward.val)
    }, 4500)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close Wheel">
          <X size={20} />
        </button>

        <div className={styles.header}>
          <div className={styles.titleBadge}>
            <Dices size={16} />
            <span>VELoop LUCKY SPIN</span>
          </div>
          <h2>SPIN & WIN GAME COINS</h2>
          <p className={styles.costInfo}>
            <Zap size={14} color="#00f0ff" /> <span><strong>1 Token</strong> = 1 Lucky Spin</span>
          </p>
        </div>

        <div className={styles.wheelContainer}>
          {/* Top Pointer Arrow */}
          <div className={styles.pointer}>▼</div>

          {/* Wheel Graphic */}
          <div
            ref={wheelRef}
            className={styles.wheel}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            }}
          >
            {segments.map((seg, idx) => {
              const angle = (360 / segments.length) * idx
              return (
                <div
                  key={seg.label}
                  className={styles.segment}
                  style={{
                    transform: `rotate(${angle}deg)`,
                    backgroundColor: seg.color,
                    color: seg.text,
                  }}
                >
                  <span className={styles.segmentText}>{seg.label}</span>
                </div>
              )
            })}
            <div className={styles.centerCap}>
              <Sparkles size={24} color="#ffb703" />
            </div>
          </div>
        </div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        {wonReward && (
          <div className={styles.winnerAlert}>
            <Trophy size={22} color="#ffb703" />
            <div>
              <span className={styles.congratsText}>CONGRATULATIONS!</span>
              <p>You won <strong>+{wonReward.val} Game Coins!</strong></p>
            </div>
          </div>
        )}

        <div className={styles.footerAction}>
          <button
            type="button"
            className={styles.spinButton}
            onClick={handleSpin}
            disabled={spinning}
          >
            {spinning ? 'SPINNING...' : 'SPIN NOW (1 TOKEN)'}
          </button>
          
          <div className={styles.tokenStatus}>
            <Coins size={14} />
            <span>Your Balance: <strong>{tokenBalance} Tokens</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
