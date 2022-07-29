import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiDBC } from "../api";
import { toastError, toastSucess } from "../components/Toast/Toast";

export const PeopleContext = createContext()

const PeopleProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [pessoa, setPessoa] = useState([])

    useEffect(() => {
        // handleGet()
        setLoading(false)
    }, [])

    const conversorCPF = (cpf) => {
        cpf = cpf.replaceAll('.', '')
        cpf = cpf.replaceAll('_', '')
        cpf = cpf.replace('-', '')
        return cpf
    }
    
    const conversorData = (data) => {
        data = data.replaceAll('_', '')
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
            toastSucess('Usuário atualizado com sucesso')
        } catch (error) {
            if(data.length !== 10) {
                toastError('Data incorreto!')
                return
            }
            if(cpf.length !== 11) {
                toastError('Cpf incorreto!')
                return
            }
            toastError('Ocorreu um erro!')            
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
            toastSucess('Usuário criado com sucesso')
        } catch (error) {
            if(data.length !== 10) {
                toastError('Data incorreto!')
                return
            }
            if(cpf.length !== 11) {
                toastError('Cpf incorreto!')
                return
            }
            toastError('Ocorreu um erro!')
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
          <h1>Loading</h1>
        )
      }

    return(
        <PeopleContext.Provider value={{handleUpdate, handleCreate, handleDelete, handleGet, getPersonById, setPessoa, pessoa}}>
        {children}
        </PeopleContext.Provider>
    )
}

export default PeopleProvider