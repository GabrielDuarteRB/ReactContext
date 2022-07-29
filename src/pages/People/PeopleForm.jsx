import { Field, Formik, Form} from 'formik';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { useParams } from 'react-router-dom';
import { maskCPF, maskData } from '../../utils/masked';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { apiDBC } from '../../api';
import { ToastContainer } from 'react-toastify';
import { toastError } from '../../components/Toast/Toast';

const PeopleForm = () => {

  const [pessoa, setPessoa] = useState([])
  const {handleCreate, handleUpdate} = useContext(PeopleContext)
  const {id} = useParams()

  const api = async () => {
    try {
      const {data} = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${id}`)
      data.map(d => setPessoa(d))
    } catch (error) {
      alert(error);
    }
  }

  const RegisterSchema = Yup.object().shape({
      nome: Yup.string()
        .min(2, 'Nome muito curto!')
        .max(50, 'Nome muito longo!')
        .required('Nome obrigatorio!'),
      cpf: Yup.string().required('Cpf obrigatório'),
      email: Yup.string()
        .email('Email inválido!')
        .required('Email obrigatório!'),
      dataNascimento: Yup.string().required('Data obrigatória'),
  })

  const buttonSubmit = (error) => {
    toastError(error.nome)
    toastError(error.cpf)
    toastError(error.email)
    toastError(error.dataNascimento)
  }

  useEffect(() => {
    if(id){
      api()
      return
    }
  }, [])

  
  return (
    <>
        <Formik
            initialValues={{ 
                nome: '',
                cpf: `${pessoa.cpf}`,
                dataNascimento:`${pessoa.dataNascimento}`,
                email: `${pessoa.email}`,
            }}
            onSubmit={(values) => id ? handleUpdate(values, id) : handleCreate(values)}
            validationSchema={RegisterSchema}
        >
        {({ handleChange, values, errors}) => ( 
          <Form>
            <Field
             id="nome"
             name="nome"
             placeholder="nome"
             type="text"
             onChange={handleChange}
             value={values.nome}
             />

            <Field name='dataNascimento'>
            {field => (
              <MaskedInput
              {...field}
              id='dataNascimento'
              placeholder='Data de Nascimento'
              value={values.dataNascimento} 
              onChange={handleChange}
              mask={maskData}
              type='text'
              />
            )} 
            </Field>

            <Field name='cpf'>
              {field => (
                  <MaskedInput
                  {...field}
                  id='cpf'
                  placeholder='cpf'
                  value={values.cpf} 
                  onChange={handleChange}
                  mask={maskCPF}
                  type='text'
                  />
              )} 
            </Field>
            <Field 
            name='email' 
            type='email' 
            placeholder='email' 
            value={values.email} 
            onChange={handleChange}/>
            <button onClick={() => buttonSubmit(errors)} type="submit">{id ? 'Atualizar' : 'Criar'}</button>
          </Form>
        )}
        </Formik>
        <ToastContainer />
    </>
  )
}
export default PeopleForm