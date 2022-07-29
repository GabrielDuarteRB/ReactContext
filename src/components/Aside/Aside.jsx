import {Body, Itens, SubTitulo, LogOut, LogOutDiv} from "./Aside.styled"
import Imagem from '../Imagem/Imagem'
import { FaSignOutAlt } from "react-icons/fa"
import Navbar from "../Navbar/Navbar"
import { useContext } from "react"
import { AuthContext } from "../../context/authProvider"

const Aside = () => {

  const {handleLogout} = useContext(AuthContext)
  return (
    <Body>
        <div>
            <Imagem />
            <SubTitulo>DashBoard Kit</SubTitulo>
        </div>
        <Itens>
            <Navbar/>
            <LogOutDiv onClick={handleLogout}>
              <LogOut>Sign out</LogOut>
              <FaSignOutAlt/>
            </LogOutDiv>
        </Itens>
    </Body>
  )
}
export default Aside