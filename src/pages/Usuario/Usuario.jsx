import { useContext } from 'react';
import { AuthContext } from '../../context/authProvider';
import { Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
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
              <button type='submit'>Submit</button>
            </Form>
        )}

          
      </Formik>
    </div>
  )
}
export default Usuario    