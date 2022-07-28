import { useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from './context/authProvider';
import Header from "./components/Header/Header";
import Address from "./pages/Address/Address";
import Login from './pages/Login/Login';
import People from "./pages/People/People";
import Usuario from './pages/Usuario/Usuario';
import NotFound from "./pages/NotFound/NotFound";

const Router = () => {

  const {auth} = useContext(AuthContext)
  console.log(auth  )

  return (
  <BrowserRouter>
    {/* <Header /> */}
    <Routes>
      {
        !auth ? (
          <>
            <Route path='' element={<Login />}/>
            <Route path='/usuario' element={<Usuario />}/>
          </>
        )
        :
        <>
          <Route path='/endereco' element={<Address />}/>
          <Route path='/pessoas' element={<People />}/>
        </>
      }
      {/* <Route path='*' element={<NotFound/>} /> */}
    </Routes>
  </BrowserRouter>
  )
}
export default Router