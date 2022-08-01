import { useFormik} from 'formik';
import { useParams } from 'react-router-dom';
import { maskCPFAdd } from '../../utils/masked';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { ToastContainer } from 'react-toastify';
import { ValidationCreate } from '../../utils/ValidationsForm/ValidationsForm';
import FormularioPeople from '../../components/Formulario/FormularioPeople';
import moment from 'moment';
import Loading from '../Loading/Loading';

const PeopleForm = () => {

  const {handleCreate, handleUpdate, getPersonById, pessoa} = useContext(PeopleContext)
  const {id} = useParams()
  const [isUpdate, setIsUpdate] = useState(false)

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

  useEffect(() => {
    if(id){
      getPersonById(id)
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
      <Loading/>
    )
  }

  return (
    <>
      <FormularioPeople formik={formik} id={id}/>
      <ToastContainer />
    </>
  )
}
export default PeopleForm