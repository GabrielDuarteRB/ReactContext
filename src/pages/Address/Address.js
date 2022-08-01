import {  useFormik } from "formik"
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AddressContext } from "../../context/AddressContext";
import { maskCEP } from "../../utils/masked";
import { ValidationAddress, validationCEP } from "../../utils/ValidationsForm/ValidationsForm";
import {Button} from '../../components/Button/Button'
import {Input, InputMask} from '../../components/Input/Input'
import { Campos, Formulario } from "./Address.module";

const Address = () => {

  const {id} = useParams()
  const [funcao, setFuncao] = useState('')
  const {handleCreateAddress} = useContext(AddressContext)

  const formik = useFormik({
    initialValues: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
    },
    onSubmit: values => { 

      const newValues = {
        "idPessoa": id,
        "tipo": values.tipo,
        "logradouro": values.logradouro,
        "numero": values.numero,
        "complemento": values.complemento,
        "cep": values.cep,
        "cidade": values.cidade,
        "estado": values.estado,
        "pais": values.pais
      }
      handleCreateAddress(newValues, id) 
    },
    validationSchema: ValidationAddress
  });

  return (
    <>
      <Formulario onSubmit={formik.handleSubmit}>
        <Campos> 
          <label htmlFor='cep'>CEP</label>
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
          <label htmlFor='tipo'>tipo</label>
          <Input
          name="tipo"
          id="tipo"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.tipo}
          placeholder="Tipo"
          />

          <label htmlFor='logradouro'>logradouro</label>
          <Input
           name="logradouro"
           id="logradouro"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.logradouro}
           placeholder="Logradouro"
          />

          <label htmlFor='numero'>Número</label>
          <Input
          id="numero"
          name="numero"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.numero}
          placeholder="Número"
          />

            <label htmlFor='complemento'>complemento</label>
            <Input
            id="complemento"
            name="complemento"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.complemento}
            placeholder="Complemento"
            />
          
           <label htmlFor='cidade'>cidade</label>
            <Input
            id="cidade"
            name="cidade"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cidade}
            placeholder="cidade"
            />

            <label htmlFor='estado'>estado</label>
            <Input
            id="estado"
            name="estado"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.estado}
            placeholder="estado"
            />

            <label htmlFor='pais'>país</label>
            <Input
            id="pais"
            name="pais"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.pais}
            placeholder="país"
            />
          <div>
              <Button backgroundColor='green' onClick={() => setFuncao('add')} type='submit'>adicionar</Button>
              <Button backgroundColor='red' onClick={() => setFuncao('delete')} type='submit'>excluir</Button>
          </div>
        </Campos>

      </Formulario>
    </>
  )
}
export default Address