import Item from "../Item/Item"
import { useContext } from "react"
import { AuthContext } from "../../context/auth"

const Menu = () => {
  
  const {logged} = useContext(AuthContext)

  return (

    <nav>
        <ul>
          {
            !logged
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