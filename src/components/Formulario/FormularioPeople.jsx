
import { maskCPF, maskData } from "../../utils/masked"
import { Button } from "../Button/Button"
import { Input, InputMask } from "../Input/Input"
import { toastError } from "../Toast/Toast"
import { Campos, Formulario } from "./Formulario.module"

const FormularioPeople = ({formik, id}) => {

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