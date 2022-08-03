import { maskNumero } from "../../utils/masked"
import { InputMask } from "../Input/Input"
import { Button } from "../Button/Button"
import { Campos, Formulario, Select, TextArea } from "./Formulario.module"
import { toastError } from "../Toast/Toast"
import { useContext, useEffect, useState } from "react"
import { ContactContext } from "../../context/ContactContext"
import Loading from "../../pages/Loading/Loading"
import { useParams } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const FormularioContact = ({formik}) => {

  const {GetContactId} = useContext(ContactContext)
  const [contato, setContato] = useState([])
  const {idPessoa, idContato} = useParams()

  const api = async () => {
    const data = await GetContactId(idPessoa)
    setContato(data)
  }

  const buttonSubmit = (error) => {
    toastError(error.tipoContato)
    toastError(error.telefone)
  }

  useEffect(() => {
    api()
  }, [])

  useEffect(() => {
    if(idContato !== 'undefined') {
        console.log(contato)
        const contatoPessoa = contato.filter(c => {
            return parseInt(c.idContato) === parseInt(idContato)
        })
        formik.setFieldValue('tipoContato', contatoPessoa[0]?.tipoContato)
        formik.setFieldValue('telefone', contatoPessoa[0]?.telefone)
        formik.setFieldValue('descricao', contatoPessoa[0]?.descricao)
    }
  }, [contato])

  if(idContato && contato.length === 0) {
    return(
        <Loading/>
    )
  }

  return (
    <>
    
      <Formulario onSubmit={formik.handleSubmit}>
          <Campos>
            <label htmlFor='tipoContato'>tipo*</label>
            <Select
              name="tipoContato"
              id="tipoContato"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.tipoContato}
            >
              <option value=""></option>
              <option value="RESIDENCIAL">RESIDENCIAL</option>
              <option value="COMERCIAL">COMERCIAL</option>
            </Select>

            <label htmlFor="numero">Telefone*</label>
            <InputMask
              name="telefone"
              id='telefone'
              mask={maskNumero}
              onChange={formik.handleChange}
              value={formik.values.telefone}
              type='text'
              placeholder="telefone"
            />

            <label htmlFor="numero">Descricao</label>
            <TextArea
              name="descricao"
              id='descricao'
              mask={maskNumero}
              onChange={formik.handleChange}
              value={formik.values.descricao}
              type='text'
            />

            <Button 
              width='100%' 
              backgroundColor='green' 
              onClick={() => buttonSubmit(formik.errors)} 
              type='submit'>
              {idContato === 'undefined' ? 'Adicionar' : 'Atualizar'}
            </Button>
          </Campos>
      </Formulario>
    </>
  )
}
export default FormularioContact