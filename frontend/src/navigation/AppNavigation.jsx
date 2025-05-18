import { Routes, Route, HashRouter } from 'react-router-dom'
import BasePage from '../components/BasePage/BasePage'
import Bingo from '../pages/Bingo/Bingo'


export default function AppNavigator() {
  return (
    <HashRouter>
      <Routes>

        <Route element={<BasePage />}>
          <Route path="/" element={<Bingo />} />
        </Route>

      </Routes>
    </HashRouter>
  )
}