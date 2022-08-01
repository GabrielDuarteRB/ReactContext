import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiDBC } from "../api";
import { toastError, toastSucess } from "../components/Toast/Toast";
import Loading from "../pages/Loading/Loading"

export const AddressContext = createContext()

const AddressProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    const GetAddress = async (values, id) => {
        try {
            await apiDBC.get(`/pessoa/lista-com-enderecos`)
        } catch (error) {
            toastError('Ocorreu um erro!')
        }
    }

    const handleCreateAddress = async (values, id) => {
        try {
            await apiDBC.post(`/endereco/{idPessoa}?idPessoa=${id}`, values)
            navigate('/pessoas')
            toastSucess('Endereco criado com sucesso')
        } catch (error) {
            toastError('Ocorreu um erro!')
        }
    }

    const handleDeleteAddress = async (values, id) => {
        try {
            await apiDBC.delete(`/endereco/idPessoa=${id}`)
            navigate('/pessoas')
            toastSucess('Endereco deletado com sucesso')
            return
        } catch (error) {
            toastError('Ocorreu um erro!')
            return
        }
    }

    const handleUpdateAddress = async (values, id) => {
        try {
            await apiDBC.delete(`/endereco/${id}`, values)
            navigate('/pessoas')
            toastSucess('Endereco atualizado com sucesso')
            return
        } catch (error) {
            toastError('Ocorreu um erro!')
            return
        }
    }

    if(loading) {
        return(
          <Loading/>
        )
      }

    return(
        <AddressContext.Provider value={{ handleCreateAddress, handleDeleteAddress, handleUpdateAddress, GetAddress }}>
        {children}
        </AddressContext.Provider>
    )
}

export default AddressProvider