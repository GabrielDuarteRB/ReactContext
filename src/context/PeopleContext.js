import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiDBC } from "../api";
import { toastError, toastSucess } from "../components/Toast/Toast";
import Loading from "../pages/Loading/Loading"

export const PeopleContext = createContext()

const PeopleProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        // handleGet()
        setLoading(false)
    }, [])

    const handleGet = async () => {
        try {
            const {data} = await apiDBC.get('/pessoa?pagina=0&tamanhoDasPaginas=20')
            return (data.content)
        } catch (error) {
            alert(error);
        }
    }

    const getPersonById = async (id) => {
        try {
            const {data} = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${id}`)
            data.map(d => setPessoa(d))
          } catch (error) {
            toastError('Ocorreu um erro!')
            console.log(error);
          }
    }
 
    const handleUpdate =  async (values, id) => { 
        try {
            await apiDBC.put(`/pessoa/${id}`, values)
            navigate('/pessoas')
            toastSucess('Usuário atualizado com sucesso')
        } catch (error) {
            toastError('Ocorreu um erro!')            
        }
    }
    
    const handleCreate = async (values) => {
        try {
            await apiDBC.post('/pessoa', values)
            navigate('/pessoas')
            toastSucess('Usuário criado com sucesso')
            return
        } catch (error) {
            toastError('Ocorreu um erro!')
            return
        }
    }
    
    const handleDelete = async (id, setModalIsOpen) => {
        setModalIsOpen(false)
        try {
            await apiDBC.delete(`/pessoa/${id}`)
            toastSucess('Usuário deletado com sucesso')
        } catch (error) {
            toastError('Ocorreu um erro!')
        }
    }

    if(loading) {
        return(
          <Loading/>
        )
      }

    return(
        <PeopleContext.Provider value={{handleUpdate, handleCreate, handleDelete, handleGet, getPersonById, setPessoa, pessoa}}>
        {children}
        </PeopleContext.Provider>
    )
}

export default PeopleProvider