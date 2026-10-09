import { Link } from 'react'
import { ShieldCheck, Zap, Heart } from 'lucide-react'
import { publicAsset } from '../utils/publicAsset'
import styles from './VeloopFooter.module.css'

export default function VeloopFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <div className={styles.logoRow}>
            <img src={publicAsset('/veloop-logo.gif')} alt="VELoop Logo" className={styles.logoImg} />
            <span className={styles.brandTitle}>VELoop<span> / REWARDS</span></span>
          </div>
          <p className={styles.brandDesc}>
            The ultimate arcade gaming platform where entertainment meets real rewards. Play games, spin the lucky wheel, and earn VELoop Coins.
          </p>
          <div className={styles.guaranteeTag}>
            <ShieldCheck size={16} color="#00ff88" />
            <span>100% Verified Rewards & Instant Transfers</span>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="#games-section">VELoop Games</a></li>
            <li><a href="#how-it-works">How VELoop Works</a></li>
            <li><a href="/redeem">Redemption Store</a></li>
            <li><a href="#spin-wheel">Lucky Spin Wheel</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>FAQS & SUPPORT</h4>
          <ul>
            <li><a href="#faq">How to earn 1 Token?</a></li>
            <li><a href="#faq">1 Token = 1 Spin rules</a></li>
            <li><a href="#faq">Reward Voucher Delivery</a></li>
            <li><a href="#support">Customer Support</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} VELoop Rewards Ecosystem. All rights reserved.</span>
        <div className={styles.craftedBy}>
          <span>Made with</span> <Heart size={13} color="#ff2a85" fill="#ff2a85" /> <span>for VELoop Gamers</span>
        </div>
      </div>
    </footer>
  )
}
