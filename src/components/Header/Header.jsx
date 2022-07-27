import { useContext } from "react"
import { AuthContext } from "../../context/auth"
import Imagem from "../Imagem/Imagem"
import Menu from "../Menu/Menu"

const Header = () => {
  const {handleLogout, logged} = useContext(AuthContext)

  return (
    <header>
        <Imagem fontsize={'30px'}/>
        <Menu />
        {
            logged && <button onClick={handleLogout}>Sair</button>
        }
        
    </header>
  )
}
export default Header