import { Gamepad2, Coins, Dices, Gift } from 'lucide-react'
import styles from './VeloopHowItWorks.module.css'

const steps = [
  {
    num: '01',
    title: 'PLAY ARCADE GAMES',
    desc: 'Select from 13+ exciting arcade & casual mini-games.',
    icon: Gamepad2,
    color: '#00f0ff',
  },
  {
    num: '02',
    title: 'EARN GAME COINS',
    desc: 'Achieve high scores and convert tokens into VELoop Coins.',
    icon: Coins,
    color: '#ffb703',
  },
  {
    num: '03',
    title: 'SPIN LUCKY WHEEL',
    desc: 'Use 1 Token for 1 Spin to win bonus coins & daily jackpots.',
    icon: Dices,
    color: '#ff2a85',
  },
  {
    num: '04',
    title: 'REDEEM PRIZES',
    desc: 'Exchange your Game Coins for Amazon vouchers, cash & pass.',
    icon: Gift,
    color: '#00ff88',
  },
]

export default function VeloopHowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>ECOSYSTEM FLOW</span>
        <h2>HOW <span>VELoop REWARDS</span> WORK</h2>
        <p>Turn your gaming skills into real rewards in 4 easy steps</p>
      </div>

      <div className={styles.grid}>
        {steps.map((step) => {
          const IconComp = step.icon
          return (
            <div key={step.num} className={styles.stepCard} style={{ borderColor: `${step.color}33` }}>
              <div className={styles.topRow}>
                <span className={styles.stepNum} style={{ color: step.color }}>{step.num}</span>
                <div className={styles.iconBox} style={{ color: step.color, borderColor: step.color }}>
                  <IconComp size={20} />
                </div>
              </div>

              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
