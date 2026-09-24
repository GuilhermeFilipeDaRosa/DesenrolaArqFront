import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import Dashboard from './pages/Dashboard/Dashboard'
import Vagas from './pages/Vagas/Vagas'
import Candidatos from './pages/Candidatos/Candidatos'
import Configuracoes from './pages/Configuracoes/Configuracoes'
import NovaVaga from './pages/Vagas/NovaVaga'
import DetalhesVaga from './pages/Vagas/DetalhesVaga'

function App() {
  return (
    <BrowserRouter>

      <Routes>

         <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/vagas" element={<Vagas />} />

           <Route
  path="/vagas/:id"
  element={<DetalhesVaga />}
/>

          <Route path="/vagas/nova" element={<NovaVaga />} />

          <Route path="/candidatos" element={<Candidatos />} />

          <Route path="/configuracoes" element={<Configuracoes />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App