import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import InfoCliente from './pages/InfoCliente'
import Error from './pages/Error'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/clientes' element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path='nuevo' element={<NuevoCliente />} />
          <Route path='editar/:id' element={<EditarCliente />} />
          <Route path=':id' element={<InfoCliente />} />          
        </Route>

        <Route path='/' element={<Layout />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
