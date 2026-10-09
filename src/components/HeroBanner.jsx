import { useState, useEffect } from 'react'
import { Trophy, Dices, Gift, ArrowRight, Sparkles } from 'lucide-react'
import styles from './HeroBanner.module.css'

const slides = [
  {
    id: 1,
    badge: 'VELoop PLAY & EARN',
    title: 'PLAY ARCADE GAMES & EARN COINS',
    subtitle: '13+ Action Packed Arcade Games waiting for your high scores!',
    ctaText: 'Explore Games',
    icon: Trophy,
    color: '#ff2a85',
    bgGradient: 'linear-gradient(135deg, rgba(255, 42, 133, 0.25) 0%, rgba(15, 6, 30, 0.95) 100%)',
    borderColor: 'rgba(255, 42, 133, 0.4)',
  },
  {
    id: 2,
    badge: 'DAILY LUCKY WHEEL',
    title: 'SPIN THE WHEEL - WIN UP TO 1000 COINS',
    subtitle: '1 Token = 1 Spin! Test your luck & instant win every day.',
    ctaText: 'Spin Now',
    icon: Dices,
    color: '#00f0ff',
    bgGradient: 'linear-gradient(135deg, rgba(0, 240, 255, 0.22) 0%, rgba(6, 18, 30, 0.95) 100%)',
    borderColor: 'rgba(0, 240, 255, 0.4)',
  },
  {
    id: 3,
    badge: 'REDEEM CENTER',
    title: 'EXCHANGE COINS FOR REAL REWARDS',
    subtitle: 'Claim Amazon Vouchers, Shopping Cards & Gaming Pass instantly.',
    ctaText: 'Claim Vouchers',
    icon: Gift,
    color: '#00ff88',
    bgGradient: 'linear-gradient(135deg, rgba(0, 255, 136, 0.22) 0%, rgba(4, 25, 16, 0.95) 100%)',
    borderColor: 'rgba(0, 255, 136, 0.4)',
  },
]

export default function HeroBanner({ onSpinClick, onScrollToGames }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[currentSlide]
  const IconComponent = slide.icon

  return (
    <div className={styles.bannerWrapper}>
      <div 
        className={styles.slideCard}
        style={{
          background: slide.bgGradient,
          borderColor: slide.borderColor,
        }}
      >
        <div className={styles.glowEffect} style={{ background: slide.color }} />
        
        <div className={styles.contentLeft}>
          <div className={styles.badge} style={{ color: slide.color, borderColor: slide.borderColor }}>
            <Sparkles size={12} />
            <span>{slide.badge}</span>
          </div>

          <h2 className={styles.title}>{slide.title}</h2>
          <p className={styles.subtitle}>{slide.subtitle}</p>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.iconGraphic} style={{ color: slide.color, boxShadow: `0 0 20px ${slide.color}33` }}>
            <IconComponent size={28} />
          </div>

          <button 
            type="button" 
            className={styles.ctaBtn} 
            style={{ backgroundColor: slide.color, boxShadow: `0 0 16px ${slide.color}66` }}
            onClick={() => {
              if (slide.id === 2 && onSpinClick) onSpinClick()
              else if (onScrollToGames) onScrollToGames()
            }}
          >
            <span>{slide.ctaText}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className={styles.dotsContainer}>
        {slides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.dot} ${idx === currentSlide ? styles.activeDot : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              backgroundColor: idx === currentSlide ? s.color : 'rgba(255, 255, 255, 0.2)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
