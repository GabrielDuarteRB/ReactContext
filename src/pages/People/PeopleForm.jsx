import { useFormik} from 'formik';
import { useParams } from 'react-router-dom';
import { maskCPF, maskCPFAdd, maskData } from '../../utils/masked';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { ToastContainer } from 'react-toastify';
import { toastError } from '../../components/Toast/Toast';
import moment from 'moment';
import { ValidationCreate } from '../../utils/ValidationsForm/ValidationsForm';
import { Campos, Formulario } from './People.styled';
import { Input, InputMask } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';


const PeopleForm = () => {

  const {handleCreate, handleUpdate, getPersonById, pessoa} = useContext(PeopleContext)
  const {id} = useParams()
  const [isUpdate, setIsUpdate] = useState(false)

  const api = async () => {
    await getPersonById(id)
  }

  const formik = useFormik({
    initialValues: { 
      nome: '' ,
      cpf: '',
      dataNascimento: '',
      email: '',
  },
  onSubmit: values => {
    const newValues = {
      nome: values.nome,
      cpf: values.cpf.replaceAll('.', '').replace('-', ''),
      dataNascimento: moment(values.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      email: values.email
    }
    id ? handleUpdate(newValues, id) : handleCreate(newValues)
  },
  validationSchema: ValidationCreate
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
    if(pessoa.length !== 0 && isUpdate){
      formik.setFieldValue('nome', pessoa.nome)
      formik.setFieldValue('cpf', maskCPFAdd(pessoa.cpf))
      formik.setFieldValue('dataNascimento', moment(pessoa.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY'))
      formik.setFieldValue('email', pessoa.email)
    }
  }, [pessoa])

  if(pessoa.length === 0 && isUpdate){
    return (
      <div>Loading</div>
    )
  }

  return (
    <>
          <Formulario onSubmit={formik.handleSubmit}>
            <Campos>
              <Input
              id="nome"
              name="nome"
              placeholder="nome"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.nome}
              />

              <InputMask
              name='dataNascimento'
              id='dataNascimento'
              placeholder='Data de Nascimento'
              value={formik.values.dataNascimento} 
              onChange={formik.handleChange}
              mask={maskData}
              type='text'
              />

              <InputMask
              name='cpf'
              id='cpf'
              placeholder='cpf'
              value={formik.values.cpf} 
              onChange={formik.handleChange}
              mask={maskCPF}
              type='text'
              />

              <Input 
                name='email' 
                type='email' 
                placeholder='email' 
                value={formik.values.email} 
                onChange={formik.handleChange}
              />
              <Button width='100%' backgroundColor='green' onClick={() => buttonSubmit(formik.errors)} type="submit">{id ? 'Atualizar' : 'Criar'}</Button>
            </Campos>
          </Formulario>
        <ToastContainer />
    </>
  )
}
export default PeopleForm