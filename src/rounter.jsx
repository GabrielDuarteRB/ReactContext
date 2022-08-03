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
import AddressProvider from "./context/AddressContext";
import PeopleAddress from "./pages/People/PeopleAddress";
import AddressUpdate from "./pages/Address/AddressUpdate";
import ContactProvider from "./context/ContactContext";
import Contact from "./pages/Contact/Contact";
import PeopleContact from "./pages/People/PeopleContact";

const Router = () => {

  const {auth} = useContext(AuthContext)

  return (
  <BrowserRouter>
    {/* <Header /> */}
    <AddressProvider>
      <PeopleProvider>
        <ContactProvider>
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
                <Route path='/endereco/:id' element={<Address />}/>
                <Route path='/atualizarendereco/:idPessoa/:idEndereco' element={<AddressUpdate />}/>
                <Route path='/endereco' element={<PeopleAddress />}/>
                <Route path='/pessoas' element={<People />}/>
                <Route path='/atualizarPessoas/:id' element={<PeopleForm />}/>
                <Route path='/criarPessoas' element={<PeopleForm />}/>
                <Route path='/criarcontato/:idPessoa/:idContato' element={<Contact />}/>
                <Route path='/contatos/:id' element={<PeopleContact />}/>
              </>
            }
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </ContactProvider>
      </PeopleProvider>
    </AddressProvider>
    
  </BrowserRouter>
  )
}
export default Router