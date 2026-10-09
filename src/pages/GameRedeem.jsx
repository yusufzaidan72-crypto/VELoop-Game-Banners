import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Coins, History, ShieldCheck, Sparkles, X } from 'lucide-react'
import GameCoinBalance from '../components/games/GameCoinBalance'
import redemptionOptions from '../data/redemptionData'
import { publicAsset } from '../utils/publicAsset'
import useGameStore from '../store/useGameStore'
import styles from './GameRedeem.module.css'

export default function GameRedeem() {
  const balance = useGameStore((state) => state.gameCoinBalance)
  const history = useGameStore((state) => state.redemptionHistory)
  const deductGameCoins = useGameStore((state) => state.deductGameCoins)
  const addTokens = useGameStore((state) => state.addTokens)
  const addRedemption = useGameStore((state) => state.addRedemption)
  const [selected, setSelected] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')

  const confirmRedemption = () => {
    if (!selected) return
    if (!deductGameCoins(selected.cost)) {
      setError(`You have ${balance} Game Coins. ${selected.cost} are required for this exchange.`)
      return
    }
    if (selected.id === 'tokens') addTokens(selected.reward)
    addRedemption({ optionName: selected.name, cost: selected.cost, reward: selected.reward, rewardUnit: selected.rewardUnit })
    setSuccess(selected)
    setSelected(null)
    setError('')
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link to="/games" className={styles.back}><ArrowLeft size={17} /> Games</Link>
        <Link to="/games" className={styles.brand}>VELOOP <span>/ REWARDS</span></Link>
        <GameCoinBalance showLabel />
      </header>

      <section className={styles.intro}>
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}><span /> REWARDS EXCHANGE</p>
          <h1>Make your<br /><em>coins count.</em></h1>
          <p>Exchange your Game Coins for VELOOP rewards. Review the rate, then confirm your choice.</p>
        </div>
        <div className={styles.balancePanel}>
          <span>AVAILABLE BALANCE</span>
          <GameCoinBalance size="lg" showLabel />
          <div className={styles.balanceRule}><ShieldCheck size={14} /> Your balance is saved on this device.</div>
        </div>
      </section>

      <section className={styles.exchange} aria-labelledby="exchange-title">
        <div className={styles.sectionTitle}><div><span>01 / CONVERSION MENU</span><h2 id="exchange-title">Choose a reward</h2></div><span className={styles.dummyLabel}>DEMO RATES</span></div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <div className={styles.options}>
          {redemptionOptions.map((option, index) => (
            <article className={styles.option} key={option.id} style={{ '--accent': option.color, '--order': index }}>
              <div className={styles.optionTop}>
                <div className={styles.rewardIcon}><img src={option.image} alt="" /></div>
                <span className={styles.optionIndex}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{option.name}</h3>
              <p className={styles.description}>{option.description}</p>
              <div className={styles.rate}>
                <span><img src={publicAsset('/assets/games/optimized/game-coin.png')} alt="" /> {option.cost} Game Coins</span>
                <ArrowRight size={15} />
                <strong>{option.reward} {option.rewardUnit}</strong>
              </div>
              <button className={styles.redeemButton} type="button" onClick={() => { setSelected(option); setError('') }}>
                Redeem <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.history}>
        <div className={styles.historyTitle}><span><History size={16} /></span><div><p>02 / YOUR ACTIVITY</p><h2>Recent exchanges</h2></div></div>
        {history.length ? (
          <div className={styles.historyList}>{history.slice(0, 8).map((entry) => <div className={styles.historyRow} key={entry.id}><span className={styles.historyMark}><Check size={14} /></span><div><strong>{entry.cost} Game Coins <ArrowRight size={13} /> {entry.reward} {entry.rewardUnit}</strong><span>{entry.optionName}</span></div><time>{entry.date}</time></div>)}</div>
        ) : <p className={styles.emptyHistory}>Your completed exchanges will appear here.</p>}
      </section>

      <footer className={styles.footer}><span>VELOOP REWARDS</span><Link to="/games">Back to games <ArrowRight size={13} /></Link></footer>

      {selected && (
        <div className={styles.modalShade} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }} role="presentation">
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <button className={styles.close} onClick={() => setSelected(null)} aria-label="Close" type="button"><X size={18} /></button>
            <span className={styles.modalIcon}><img src={selected.image} alt="" /></span>
            <p className={styles.eyebrow}>CONFIRM EXCHANGE</p>
            <h2 id="confirm-title">Redeem {selected.name}?</h2>
            <div className={styles.confirmRate}><span><img src={publicAsset('/assets/games/optimized/game-coin.png')} alt="" />{selected.cost} Game Coins</span><ArrowRight size={17} /><strong>{selected.reward} {selected.rewardUnit}</strong></div>
            {balance < selected.cost ? <p className={styles.modalError}>Not enough Game Coins. You have <strong>{balance}</strong>, and this exchange needs <strong>{selected.cost}</strong>. Keep playing to earn more.</p> : <p className={styles.remaining}>Balance after exchange <strong>{(balance - selected.cost).toLocaleString()} Game Coins</strong></p>}
            <div className={styles.modalActions}><button onClick={() => setSelected(null)} type="button">Cancel</button><button className={styles.confirm} onClick={confirmRedemption} disabled={balance < selected.cost} type="button">Confirm exchange <ArrowRight size={15} /></button></div>
          </section>
        </div>
      )}

      {success && (
        <div className={styles.modalShade} role="presentation">
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="success-title">
            <span className={`${styles.modalIcon} ${styles.successIcon}`}><Sparkles size={21} /></span>
            <p className={styles.eyebrow}>EXCHANGE COMPLETE</p>
            <h2 id="success-title">A little more VELOOP.</h2>
            <p className={styles.successText}>You exchanged {success.cost} Game Coins for <strong>{success.reward} {success.rewardUnit}</strong>.</p>
            <div className={styles.successBalance}><Coins size={16} /> New balance <strong>{balance.toLocaleString()} Game Coins</strong></div>
            <button className={styles.confirm} onClick={() => setSuccess(null)} type="button">Done <Check size={16} /></button>
          </section>
        </div>
      )}
    </main>
  )
}