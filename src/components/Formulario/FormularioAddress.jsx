import { maskCEP } from "../../utils/masked"
import { validationCEP } from "../../utils/ValidationsForm/ValidationsForm"
import { Button } from "../Button/Button"
import { Input, InputMask } from "../Input/Input"
import { Campos, Formulario, Select } from "./Formulario.module"

const FormularioAddress = ({formik, funcao}) => {
  return (
    <Formulario onSubmit={formik.handleSubmit}>
        <Campos> 
          <label htmlFor='cep'>CEP*</label>
          <InputMask
            name="cep"
            id='cep'
            mask={maskCEP}
            onBlur={(event) => validationCEP(event, formik)}
            onChange={formik.handleChange}
            value={formik.values.cep}
            type='text'
            placeholder="CEP"
          />
          <label htmlFor='tipo'>tipo*</label>
          <Select
          name="tipo"
          id="tipo"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.tipo}
          >
            <option value=""></option>
            <option value="RESIDENCIAL">RESIDENCIAL</option>
            <option value="COMERCIAL">COMERCIAL</option>
          </Select>

          <label htmlFor='logradouro'>logradouro*</label>
          <Input
           name="logradouro"
           id="logradouro"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.logradouro}
           placeholder="Logradouro"
          />

          <label htmlFor='numero'>Número*</label>
          <Input
          id="numero"
          name="numero"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.numero}
          placeholder="Número"
          />

          <label htmlFor='complemento'>complemento*</label>
          <Input
          id="complemento"
          name="complemento"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.complemento}
          placeholder="Complemento"
          />
          
          <label htmlFor='cidade'>cidade*</label>
          <Input
          id="cidade"
          name="cidade"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.cidade}
          placeholder="cidade"
          />
          <label htmlFor='estado'>estado*</label>
          <Input
          id="estado"
          name="estado"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.estado}
          placeholder="estado"
          />

          <label htmlFor='pais'>país*</label>
          <Input
          id="pais"
          name="pais"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.pais}
          placeholder="país"
          />

          <Button width='100%' backgroundColor='green' type='submit'>{funcao === 'add' ? 'adicionar' : 'atualizar'}</Button>
        </Campos>

      </Formulario>
  )
}
export default FormularioAddress