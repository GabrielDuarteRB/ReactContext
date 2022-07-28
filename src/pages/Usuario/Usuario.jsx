import { useContext } from 'react';
import { AuthContext } from '../../context/authProvider';
import { Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import { apiCEP } from '../../api';
import MaskedInput from 'react-text-mask';  
import toast, { Toaster } from 'react-hot-toast'

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  senha: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  cep: Yup.string()
    .min(7, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Required'),
  logradouro: Yup.string().min(2, 'Too Short!').required('Required'),
  complemento: Yup.string().min(2, 'Too Short!').required('Required'),
  bairro: Yup.string().min(2, 'Too Short!').required('Required'),
  localidade: Yup.string().min(2, 'Too Short!').required('Required'),
  uf: Yup.string().min(2, 'Too Short!').required('Required'),
  ibge: Yup.number()
  .min(7, 'Too Short!')
  .max(7, 'Too Long')
  .required('Required'),
  gia: Yup.string().min(2, 'Too Short!').required('Required'),
  ddd: Yup.number()
  .min(2, 'Too Short!')
  .max(3, 'Too Long!')
  .required('Required'),
  siafi: Yup.string().min(2, 'Too Short!').required('Required'),
})

const Usuario = () => {

  const {handleSingUp} = useContext(AuthContext)
  const regexCEP = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  ];
  
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

  const wrong = (mensagem) => {
    toast.error(mensagem)
  }


  return (
    <div>
      <h1>Faça seu cadastro</h1>

      <Formik 
        initialValues={{
          login: '',
          senha: '',
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          localidade: '',
          uf: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => handleSingUp(values)}
      >
        
        {({errors, touched, setFieldValue, handleChange}) => (
            <Form>
              <div> 
                <label htmlFor='login'>Login</label>
                <Field name="login"/>
              {errors.login && touched.login ? (
                <div><Toaster>{wrong(`login error => ${errors.login}`)}</Toaster></div>
              ) : null}

                <label htmlFor='senha'>Senha</label>
                <Field name="senha" type="password"/>
                {errors.senha && touched.senha ?(   
                  <div><Toaster>{wrong(`senha error => ${errors.senha}`)}</Toaster></div>
                  ) : null}
              </div>

              <div> 
                
                <label htmlFor='cep'>CEP</label>
                <Field 
                    name="cep"                 
                >
                  {field => (
                      <MaskedInput
                      {...field}
                      id='cep'
                      mask={regexCEP}
                      onBlur={(event) => validationCEP(event, setFieldValue)}
                      onChange={handleChange}
                      type='text'
                      />
                    )
                  }
                </Field>

                {errors.cep && touched.cep ? (
                 <div><Toaster>{wrong(`cep error => ${errors.cep}`)}</Toaster></div>
                ) : null}

                <label htmlFor='logradouro'>logradouro</label>
                <Field name="logradouro"/>
                {errors.logradouro && touched.logradouro ? (
                  <div><Toaster>{wrong(`logradouro error => ${errors.logradouro}`)}</Toaster></div>
                ) : null}

                <label htmlFor='numero'>Número</label>
                <Field name="numero"/>
                {errors.numero && touched.numero ? (
                  <div><Toaster>{wrong(`numero error => ${errors.numero}`)}</Toaster></div>
                ) : null}

                <label htmlFor='complemento'>complemento</label>
                <Field name="complemento"/>
                {errors.complemento && touched.complemento ? (
                  <div><Toaster>{wrong(`complemento error => ${errors.complemento}`)}</Toaster></div>
                ) : null}

                <label htmlFor='bairro'>Bairro</label>
                <Field name="bairro"/>
                {errors.bairro && touched.bairro ? ( 
                  <div><Toaster>{wrong(`bairro error => ${errors.bairro}`)}</Toaster></div>
                ) : null}

                <label htmlFor='localidade'>Municipio</label>
                <Field name="localidade"/>
                {errors.localidade && touched.localidade ? ( 
                  <div><Toaster>{wrong(`localidade error => ${errors.localidade}`)}</Toaster></div>
                ) : null}

                <label htmlFor='uf'>UF</label>
                <Field name="uf"/>
                {errors.uf && touched.uf ? ( 
                  <div><Toaster>{wrong(`uf error => ${errors.uf}`)}</Toaster></div>
                ) : null} 

              </div>
              <button type='submit'>Submit</button>
            </Form>
        )}

          
      </Formik>
    </div>
  )
}
export default Usuario    