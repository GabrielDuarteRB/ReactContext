import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth"

const People = () => {

  const {logged} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    !logged && navigate('/')
  }, [])

  return (
    <div>People</div>
  )
}
export default People