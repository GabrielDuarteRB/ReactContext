import { createContext} from "react";
import { useNavigate } from "react-router-dom";
import { apiDBC } from "../api";

import { toastError, toastSucess } from "../components/Toast/Toast";

export const ContactContext = createContext()

const ContactProvider = ({children}) => {

    const navigate = useNavigate()

    const GetContactId = async (id) => {
        try {
            const {data} = await apiDBC.get(`/contato/${id}`)
            return data
        } catch (error) {
            toastError('Ocorreu um erro!')
        }
    }

    const handleAddContact = async (id, values) => {

        try {
            await apiDBC.post(`/contato/${id}`, values)
            navigate(`/contatos/${id}`)
            toastSucess('Cadastrado com sucesso!')
        } catch (error) {
            toastError('Ocorreu um erro!')
        }
    }

    const handleUpdateContact = async (idContato, idPessoa, values) => {
        try {
            await apiDBC.put(`/contato/${idContato}`, values)
            navigate(`/contatos/${idPessoa}`)
            toastSucess('Atualizado com sucesso!')
        } catch (error) {
            toastError('Ocorreu um erro!')
        }
    }

    const handleDeleteContact = async (id, setModalIsOpen) => {
        try {
            await apiDBC.delete(`/contato/${id}`)
            setModalIsOpen(false)
            toastSucess('Deletado com sucesso!')
        } catch (error) {
            toastError('Ocorreu um erro!')
            console.log(error)
        }
    }

    return(
        <ContactContext.Provider value={{handleAddContact, handleDeleteContact, GetContactId, handleUpdateContact}}>
            {children}
        </ContactContext.Provider>
    )
}

export default ContactProvider