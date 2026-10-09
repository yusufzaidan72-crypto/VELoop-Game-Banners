import { Routes, Route, Navigate } from 'react-router-dom'
import Games from './pages/Games'
import GameHome from './pages/GameHome'
import GameRedeem from './pages/GameRedeem'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/"               element={<Navigate to="/games" replace />} />
      <Route path="/games"          element={<Games />} />
      <Route path="/games/:slug"    element={<GameHome />} />
      <Route path="/redeem"         element={<GameRedeem />} />
      {/* Catch-all */}
      <Route path="*"               element={<Navigate to="/games" replace />} />
    </Routes>
  )
}
