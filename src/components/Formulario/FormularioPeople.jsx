import { useFormik } from "formik"
import moment from "moment"
import { Campos, Formulario } from "../../pages/Address/Address.module"
import { maskCPF, maskData } from "../../utils/masked"
import { ValidationCreate } from "../../utils/ValidationsForm/ValidationsForm"
import { Button } from "../Button/Button"
import { Input, InputMask } from "../Input/Input"
import { toastError } from "../Toast/Toast"

const FormularioPeople = (id, handleUpdate, handleCreate) => {
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

  return (
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
  )
}
export default FormularioPeople