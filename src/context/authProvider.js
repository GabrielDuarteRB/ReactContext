import { useEffect, useState } from "react"
import { createContext } from "react"
import { apiDBC } from '../api' 
import { toastError } from "../components/Toast/Toast"
import Loading from "../pages/Loading/Loading"

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if(token) {
      apiDBC.defaults.headers.common['Authorization'] = token;
      setAuth(true)
    }

    setLoading(false)
  }, [])

  const handleLogout = () => {
    apiDBC.defaults.headers.common['Authorization'] = undefined
    localStorage.removeItem('token')
    setAuth(false)
    window.location.href = '/'
  }

  const handleLogin = async (values) => {
    try {
      const {data} = await apiDBC.post('/auth', values)
      localStorage.setItem('token', data)
      apiDBC.defaults.headers.common['Authorization'] = 'data';
      window.location.href = '/pessoas'
      setAuth(true)
    } catch (error) {
      toastError('login ou senha inválidos!')
    }
  }

  const handleSignUp = async (values) => {
    try {
      await apiDBC.post('/auth/create', values)
      console.log('funcionou!')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  if(loading) {
    return(
      <Loading/>
    )
  }

  return (
    <AuthContext.Provider value={{handleLogin, handleLogout, handleSignUp, auth}}>
        {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider