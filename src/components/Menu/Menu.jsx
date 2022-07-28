import Item from "../Item/Item"
import { useContext } from "react"
import { AuthContext } from "../../context/authProvider"

const Menu = () => {
  
  const {auth} = useContext(AuthContext)

  return (

    <nav>
        <ul>
          {
            !auth
            ?
            <>
              <Item name='Home' url='/' />
              <Item name='Cadastrar' url='/usuario' />
            </>
            :
           <>
              <Item name='Endereço' url='/endereco' />
              <Item name='Pessoas' url='/pessoas' />
            </>
          }
            
        </ul>
    </nav>
  )
}
export default Menu