import { Field, Formik, Form} from 'formik';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { useParams } from 'react-router-dom';
import { maskCPF, maskData } from '../../utils/masked';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { ToastContainer } from 'react-toastify';
import { toastError } from '../../components/Toast/Toast';
import moment from 'moment';
import {cpf} from 'cpf-cnpj-validator'

const PeopleForm = () => {

  const {handleCreate, handleUpdate, getPersonById, pessoa} = useContext(PeopleContext)
  const {id} = useParams()
  const [isUpdate, setIsUpdate] = useState(false)
  const [user, setUser] = useState([])

  const api = async () => {
    getPersonById(id)
  }

  const RegisterSchema = Yup.object().shape({
      nome: Yup.string()
        .min(2, 'Nome muito curto!')
        .max(50, 'Nome muito longo!')
        .required('Nome obrigatorio!'),
      cpf: Yup.string()
      .test('CPFValidation', 'Cpf inválida',(value) => cpf.isValid(value))
      .required('Cpf obrigatório'),
      email: Yup.string()
        .email('Email inválido!')
        .required('Email obrigatório!'),
      dataNascimento: Yup.string()
      .test('DateValidation', 'Data inválida', (value) => moment(value).isValid())
      .required('Data obrigatória'),
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
      setIsUpdate(true)
      return
    }
    setIsUpdate(false)
  }, [])

  useEffect(() => {
      setUser(pessoa)
  }, [pessoa])

  console.log(pessoa.length)
  if(pessoa.length === 0 && isUpdate){
    return
  }

  return (
    <>
        <Formik
            initialValues={{ 
                nome: pessoa ? pessoa.nome : '' ,
                cpf: pessoa ? pessoa.cpf : '',
                dataNascimento: pessoa ? moment(pessoa.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY') : '',
                email: pessoa ? pessoa.email : '',
            }}
            onSubmit={(values) => {
              const newValues = {
                nome: values.nome,
                cpf: values.cpf.replaceAll('.', '').replace('-', ''),
                dataNascimento: moment(values.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                email: values.email
              }
              id ? handleUpdate(newValues, id) : handleCreate(newValues)
            }}
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

            <MaskedInput
            name='dataNascimento'
            id='dataNascimento'
            placeholder='Data de Nascimento'
            value={values.dataNascimento} 
            onChange={handleChange}
            mask={maskData}
            type='text'
            />

            <MaskedInput
            name='cpf'
            id='cpf'
            placeholder='cpf'
            value={values.cpf} 
            onChange={handleChange}
            mask={maskCPF}
            type='text'
            />

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