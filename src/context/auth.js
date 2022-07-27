import { useState } from "react"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"
import { apiDBC } from '../api' 

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [logged, setLogged] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('key')
    setLogged(false)
    navigate('/')
  }

  const handleLogin = async (values) => {
    try {
      const {data} = await apiDBC.post('/auth', values)
      localStorage.setItem('key', JSON.stringify(data))
      navigate('/pessoas')
      console.log('funcionou')
      setLogged(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSingUp = async (values) => {
    try {
      // await apiDBC.post('/auth/create', values)
      console.log('funcionou!')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{handleLogin, handleLogout, handleSingUp, logged}}>
        {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider