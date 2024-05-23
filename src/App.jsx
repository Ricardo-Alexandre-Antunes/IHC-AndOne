import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '/src/pages/HomePage'
import HelpPage from './pages/HelpPage'
import SapatilhasPage from '/src/pages/SapatilhasPage'
import EquipamentosPage from '/src/pages/EquipamentosPage'
import AcessoriosPage from '/src/pages/AcessoriosPage'
import ConjuntosPage from '/src/pages/ConjuntosPage'
import MaterialPage from '/src/pages/MaterialPage'
import PerfilPage from '/src/pages/PerfilPage'
import FavoritosPage from '/src/pages/FavoritosPage'
import CarrinhoPage from '/src/pages/CarrinhoPage'
import ProductPage from '/src/pages/ProductPage'
import PagamentoPage from '/src/pages/PagamentoPage'
import EntregaPage from '/src/pages/EntregaPage'
import ConfirmacaoPage from '/src/pages/ConfirmacaoPage'
import SearchPage from '/src/pages/SearchPage'
import LoginPage from '/src/pages/LoginPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('login') ;
    if (storedLogin === null) {
      localStorage.setItem('login', false);
    }
    
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage}/>
          <Route path="/help" Component={HelpPage} />
          <Route path="/search/:searchTerm" Component={SearchPage} />
          <Route path="/sapatilhas" Component={SapatilhasPage} />
          <Route path="/sapatilhas/:searchTerm" Component={SapatilhasPage} />
          <Route path="/equipamentos" Component={EquipamentosPage} />
          <Route path="/equipamentos/:searchTerm" Component={EquipamentosPage} />
          <Route path="/acessorios" Component={AcessoriosPage} />
          <Route path="/acessorios/:searchTerm" Component={AcessoriosPage} />
          <Route path="/conjuntos" Component={ConjuntosPage} />
          <Route path="/conjuntos/:searchTerm" Component={ConjuntosPage} />
          <Route path="/material" Component={MaterialPage} />
          <Route path="/material/:searchTerm" Component={MaterialPage} />
          <Route path="/perfil" Component={PerfilPage} />
          <Route path="/favoritos" Component={FavoritosPage} />
          <Route path="/carrinho" Component={CarrinhoPage} />
          <Route path="/produtoDetalhado/:category/:id" Component={ProductPage} />
          <Route path="/checkout" Component={EntregaPage} />
          <Route path="/pagamento" Component={PagamentoPage} />
          <Route path="/confirmacao" Component={ConfirmacaoPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
