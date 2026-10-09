import { Trophy, Sparkles } from 'lucide-react'
import styles from './VeloopLiveTicker.module.css'

const initialTickerData = [
  { name: 'Rahul K.', action: 'won 500 Coins on Spin Wheel', time: '2m ago', color: '#00f0ff' },
  { name: 'Priya S.', action: 'redeemed ₹250 Amazon Voucher', time: '5m ago', color: '#ffb703' },
  { name: 'Amit M.', action: 'scored 2,450 in Space Invaders', time: '8m ago', color: '#ff2a85' },
  { name: 'Sneha R.', action: 'won 1,000 MEGA Jackpot on Wheel', time: '12m ago', color: '#00ff88' },
  { name: 'Vikram P.', action: 'redeemed Google Play Gift Card', time: '15m ago', color: '#a855f7' },
]

export default function VeloopLiveTicker() {
  return (
    <div className={styles.tickerContainer}>
      <div className={styles.tickerBadge}>
        <Sparkles size={12} color="#ffb703" />
        <span>LIVE ACTIVITY</span>
      </div>

      <div className={styles.tickerTrack}>
        <div className={styles.tickerContent}>
          {initialTickerData.concat(initialTickerData).map((item, idx) => (
            <div key={`${item.name}-${idx}`} className={styles.tickerItem}>
              <Trophy size={13} color={item.color} />
              <span className={styles.playerName}>{item.name}</span>
              <span className={styles.actionText}>{item.action}</span>
              <span className={styles.timeTag}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
