import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AuthProvider from './context/auth';
import Address from "./pages/Address/Address";
import Login from './pages/Login/Login';
import People from "./pages/People/People";
import Usuario from './pages/Usuario/Usuario';

const Router = () => {
  return (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/usuario' element={<Usuario />}/>
        <Route path='/endereco' element={<Address />}/>
        <Route path='/pessoas' element={<People />}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  )
}
export default Router