
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
          <label name='nome'>Nome*</label>
          <Input
          id="nome"
          name="nome"
          placeholder="nome"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nome}
          />
          <label name='dataNascimento'>Data de nascimento*</label>
          <InputMask
          name='dataNascimento'
          id='dataNascimento'
          placeholder='Data de Nascimento'
          value={formik.values.dataNascimento} 
          onChange={formik.handleChange}
          mask={maskData}
          type='text'
          />
          <label name='cpf'>CPF*</label>
          <InputMask
          name='cpf'
          id='cpf'
          placeholder='cpf'
          value={formik.values.cpf} 
          onChange={formik.handleChange}
          mask={maskCPF}
          type='text'
          />
          <label name='email'>email*</label>
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