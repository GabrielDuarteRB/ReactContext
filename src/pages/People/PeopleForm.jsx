import { Field, Formik, Form} from 'formik';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { useParams } from 'react-router-dom';
import { maskCPF, maskData } from '../../utils/masked';
import { useContext, useEffect } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { ToastContainer } from 'react-toastify';
import { toastError } from '../../components/Toast/Toast';

const PeopleForm = () => {

  const {handleCreate, handleUpdate, getPersonById, pessoa} = useContext(PeopleContext)
  const {id} = useParams()

  const api = async () => {
    getPersonById(id)
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
                nome: `${pessoa ? pessoa.nome : ''}`,
                cpf: '',
                dataNascimento:'',
                email: '',
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
              onChange={handleChange}
            />
            <button onClick={() => buttonSubmit(errors)} type="submit">{id ? 'Atualizar' : 'Criar'}</button>
          </Form>
        )}
        </Formik>
        <ToastContainer />
    </>
  )
}
export default PeopleForm