import { useEffect, useState } from "react"
import { createContext } from "react"
import { apiDBC } from '../api' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    localStorage.removeItem('token')
    apiDBC.defaults.headers.common['Authorization'] = undefined
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
      toast.error('Deu Ruim')
    }
  }

  const handleSingUp = async (values) => {
    try {
      // await apiDBC.post('/auth/create', values)
      console.log('funcionou!')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  if(loading) {
    return(
      <h1>Loading</h1>
    )
  }

  return (
    <AuthContext.Provider value={{handleLogin, handleLogout, handleSingUp, auth}}>
        {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider