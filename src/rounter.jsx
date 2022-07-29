import { useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from './context/authProvider';
import Address from "./pages/Address/Address";
import Login from './pages/Login/Login';
import People from "./pages/People/People";
import Usuario from './pages/Usuario/Usuario';
import NotFound from "./pages/NotFound/NotFound";
import PeopleForm from "./pages/People/PeopleForm";
import PeopleProvider from "./context/PeopleContext";

const Router = () => {

  const {auth} = useContext(AuthContext)
  console.log(auth)

  return (
  <BrowserRouter>
    {/* <Header /> */}
    <PeopleProvider>
      <Routes>
        {
          !auth ? (
            <>
              <Route path='/' element={<Login />}/>
              <Route path='/usuario' element={<Usuario />}/>
            </>
          )
          :
          <>
            <Route path='/endereco' element={<Address />}/>
            <Route path='/pessoas' element={<People />}/>
            <Route path='/atualizarPessoas/:id' element={<PeopleForm />}/>
            <Route path='/criarPessoas' element={<PeopleForm />}/>
          </>
        }
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </PeopleProvider>
    
  </BrowserRouter>
  )
}
export default Router