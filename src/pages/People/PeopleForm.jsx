import { Field, Formik, Form} from 'formik';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { useParams } from 'react-router-dom';
import { maskCPF, maskData } from '../../utils/masked';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { apiDBC } from '../../api';

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
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
      cpf: Yup.string()
        .length(14, 'Cpf tem que conter 11 números'), 
  })

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
        {({ handleChange, values }) => ( 
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
            <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
            </Form>
        )}
        </Formik>
    </>
  )
}
export default PeopleForm