import { useContext } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth"

const Address = () => {

  const {logged} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    !logged && navigate('/')
  }, [])

  return (
    <>
        <address>Rua tal</address>
        <small>Copyright</small>
    </>
  )
}
export default Address