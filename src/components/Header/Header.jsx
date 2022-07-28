import { useContext } from "react"
import { AuthContext } from "../../context/authProvider"
import Imagem from "../Imagem/Imagem"
import Menu from "../Menu/Menu"

const Header = () => {
  const {handleLogout, auth} = useContext(AuthContext)

  return (
    <header>
        <Imagem fontsize={'30px'}/>
        <Menu />
        {
            auth && <button onClick={handleLogout}>Sair</button>
        }
        
    </header>
  )
}
export default Header