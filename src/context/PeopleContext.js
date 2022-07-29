import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiDBC } from "../api";

export const PeopleContext = createContext()

const PeopleProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleGet()
        setLoading(false)
    }, [])

    const conversorCPF = (cpf) => {
        cpf = cpf.replaceAll('.', '')
        cpf = cpf.replace('-', '')
        return cpf
    }
    
    const conversorData = (data) => {
        data = data.split('/')
        data = `${data[2]}-${data[1]}-${data[0]}`
        return data
    }

    const handleGet = async () => {
        try {
            const {data} = await apiDBC.get('/pessoa?pagina=0&tamanhoDasPaginas=20')
            return (data.content)
        } catch (error) {
            alert(error);
        }
    }
 
    const handleUpdate =  async (values, id) => {
        console.log(id)
        const cpf = conversorCPF(values.cpf)
        const data = conversorData(values.dataNascimento)    
    
        try {
            await apiDBC.put(`/pessoa/${id}`, {
            'nome': values.nome,
            'dataNascimento': data,
            'cpf': cpf,
            'email': values.email,
            })
            navigate('/pessoas')
            console.log('atualizou')
        } catch (error) {
            alert(error);
        }
    }
    
    const handleCreate = async (values) => {
        const cpf = conversorCPF(values.cpf)
        const data = conversorData(values.dataNascimento)    
    
        try {
            await apiDBC.post('/pessoa', {
                'nome': values.nome,
                'dataNascimento': data,
                'cpf': cpf,
                'email': values.email
            })
            navigate('/pessoas')
        } catch (error) {
            alert(error);
        }
    }
    
    const handleDelete = async (id, setModalIsOpen) => {
        setModalIsOpen(false)
        try {
            await apiDBC.delete(`/pessoa/${id}`)
        } catch (error) {
            alert(error);
        }
    }

    if(loading) {
        return(
          <h1>Loading</h1>
        )
      }

    return(
        <PeopleContext.Provider value={{handleUpdate, handleCreate, handleDelete, handleGet}}>
        {children}
        </PeopleContext.Provider>
    )
}

export default PeopleProvider