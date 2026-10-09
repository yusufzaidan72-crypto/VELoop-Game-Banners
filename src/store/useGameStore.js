import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/**
 * Central VELOOP Game Store
 * Single source of truth for all currency balances and game state.
 */
const useGameStore = create(persist((set, get) => ({
  // ── Balances ──────────────────────────────────────────────
  tokenBalance: 1000,      // Starting VELOOP Tokens (1000 for testing)
  gameCoinBalance: 500,    // Central Game Coin balance

  // ── Game tracking (for first-time guide) ─────────────────
  playedGames: {},         // { [gameId]: true }

  // ── Redemption history ───────────────────────────────────
  redemptionHistory: [],

  // ── Token actions ────────────────────────────────────────
  deductTokens: (amount) => {
    const { tokenBalance } = get()
    if (tokenBalance < amount) return false
    set({ tokenBalance: tokenBalance - amount })
    return true
  },

  hasEnoughTokens: (amount) => get().tokenBalance >= amount,

  addTokens: (amount) => set((s) => ({ tokenBalance: s.tokenBalance + amount })),

  // ── Game Coin actions ────────────────────────────────────
  addGameCoins: (amount) =>
    set((s) => ({ gameCoinBalance: s.gameCoinBalance + amount })),

  deductGameCoins: (amount) => {
    const { gameCoinBalance } = get()
    if (gameCoinBalance < amount) return false
    set({ gameCoinBalance: gameCoinBalance - amount })
    return true
  },

  hasEnoughGameCoins: (amount) => get().gameCoinBalance >= amount,

  // ── Guide tracking ───────────────────────────────────────
  markGamePlayed: (gameId) =>
    set((s) => ({ playedGames: { ...s.playedGames, [gameId]: true } })),

  hasPlayedGame: (gameId) => !!get().playedGames[gameId],

  // ── Redemption history ───────────────────────────────────
  addRedemption: (entry) =>
    set((s) => ({
      redemptionHistory: [
        {
          ...entry,
          id: Date.now(),
          date: new Date().toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          }),
        },
        ...s.redemptionHistory.slice(0, 19), // Keep last 20
      ],
    })),
}), {
  name: 'veloop-games-wallet-v1',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    tokenBalance: state.tokenBalance,
    gameCoinBalance: state.gameCoinBalance,
    playedGames: state.playedGames,
    redemptionHistory: state.redemptionHistory,
  }),
}))

export default useGameStore
