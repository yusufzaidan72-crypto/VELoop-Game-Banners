/**
 * VELOOP Game Coin Redemption Options
 * Dummy rates — NOT real financial values.
 */
import { publicAsset } from '../utils/publicAsset'

export const redemptionOptions = [
  {
    id: 'ves',
    name: 'VEs',
    description: 'VELOOP Coins — the primary in-app currency',
    image: publicAsset('/assets/games/optimized/ves-icon.png'),
    cost: 100,
    reward: 10,
    rewardUnit: 'VEs',
    color: '#f5a623',
    gradient: 'linear-gradient(135deg, #1a1206 0%, #2d1f08 100%)',
    border: 'rgba(245,166,35,0.35)',
  },
  {
    id: 'sves',
    name: 'SVEs',
    description: 'Super VELOOP Coins — premium silver currency',
    image: publicAsset('/assets/games/optimized/sves-icon.png'),
    cost: 150,
    reward: 5,
    rewardUnit: 'SVEs',
    color: '#a8b4c8',
    gradient: 'linear-gradient(135deg, #0f1520 0%, #1a2030 100%)',
    border: 'rgba(168,180,200,0.30)',
  },
  {
    id: 'gems',
    name: 'Gems',
    description: 'Rare purple gems for special upgrades',
    image: publicAsset('/assets/games/optimized/gems-icon.png'),
    cost: 200,
    reward: 3,
    rewardUnit: 'Gems',
    color: '#9c5cf5',
    gradient: 'linear-gradient(135deg, #130d20 0%, #1e1030 100%)',
    border: 'rgba(156,92,245,0.30)',
  },
  {
    id: 'tokens',
    name: 'Tokens',
    description: 'Replenish your play Tokens to keep gaming',
    image: publicAsset('/assets/games/optimized/token-icon.png'),
    cost: 50,
    reward: 20,
    rewardUnit: 'Tokens',
    color: '#f5a623',
    gradient: 'linear-gradient(135deg, #1a1206 0%, #251a0a 100%)',
    border: 'rgba(245,166,35,0.30)',
  },
  {
    id: 'spins',
    name: 'Spins',
    description: 'Spin Wheel vouchers for exciting random rewards',
    image: publicAsset('/assets/games/optimized/spins-icon.png'),
    cost: 75,
    reward: 1,
    rewardUnit: 'Spin',
    color: '#4a8fe8',
    gradient: 'linear-gradient(135deg, #0d1525 0%, #101d35 100%)',
    border: 'rgba(74,143,232,0.30)',
  },
]

export default redemptionOptions
