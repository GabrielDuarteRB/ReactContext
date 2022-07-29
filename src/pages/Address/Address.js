import { Field, Form, Formik } from "formik"
import MaskedInput from "react-text-mask";
import * as Yup from 'yup';
import { apiCEP } from "../../api";
import { maskCEP } from "../../utils/masked";

const Address = () => {

  const SignupSchema = Yup.object().shape({
    cep: Yup.string()
      .min(7, 'Too Short!')
      .max(8, 'Too Long!')
      .required('Required'),
    logradouro: Yup.string().min(2, 'Too Short!').required('Required'),
    complemento: Yup.string().min(2, 'Too Short!').required('Required'),
    bairro: Yup.string().min(2, 'Too Short!').required('Required'),
    localidade: Yup.string().min(2, 'Too Short!').required('Required'),
    uf: Yup.string().min(2, 'Too Short!').required('Required'),
  })

  const validationCEP = async (event, setFieldValue) => {
    const cep = event.target.value?.replace(/[^0-9]/g, '')
    
    if (cep.length !== 8) {
      return
    }

    try {
      const {data} = await apiCEP.get(`/${cep}/json/`)
      setFieldValue('logradouro', data.logradouro)
      setFieldValue('complemento', data.complemento)
      setFieldValue('bairro', data.bairro)
      setFieldValue('localidade', data.localidade)
      setFieldValue('uf', data.uf)
      setFieldValue('ibge', data.ibge)
      setFieldValue('gia', data.gia)
      setFieldValue('ddd', data.ddd)
      setFieldValue('siafi', data.siafi)
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <Formik
        initialValues={{
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          localidade: '',
          uf: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => console.log(values)}
      >
        
        {({errors, touched, setFieldValue, handleChange}) => (
            <Form>
              <div> 
                <label htmlFor='cep'>CEP</label>
                <Field 
                    name="cep"                 
                >
                  {field => (
                      <MaskedInput
                      {...field}
                      id='cep'
                      mask={maskCEP}
                      onBlur={(event) => validationCEP(event, setFieldValue)}
                      onChange={handleChange}
                      type='text'
                      />
                    )
                  }
                </Field>

                {errors.cep && touched.cep ? (
                  console.log(errors.cep)
                ) : null}

                <label htmlFor='logradouro'>logradouro</label>
                <Field name="logradouro"/>
                {errors.logradouro && touched.logradouro ? (
                  <div>{console.log(errors.logradouro)}</div>
                ) : null}

                <label htmlFor='numero'>Número</label>
                <Field name="numero"/>
                {errors.numero && touched.numero ? (
                  <div>{console.log(errors.numero)}</div>
                ) : null}

                <label htmlFor='complemento'>complemento</label>
                <Field name="complemento"/>
                {errors.complemento && touched.complemento ? (
                  <div></div>
                ) : null}

                <label htmlFor='bairro'>Bairro</label>
                <Field name="bairro"/>
                {errors.bairro && touched.bairro ? ( 
                  <div></div>
                ) : null}

                <label htmlFor='localidade'>Municipio</label>
                <Field name="localidade"/>
                {errors.localidade && touched.localidade ? ( 
                  <div></div>
                ) : null}

                <label htmlFor='uf'>UF</label>
                <Field name="uf"/>
                {errors.uf && touched.uf ? ( 
                  <div></div>
                ) : null} 

              </div>
              <button type='submit'>Submit</button>
            </Form>
        )}

          
      </Formik>
    </>
  )
}
export default Address