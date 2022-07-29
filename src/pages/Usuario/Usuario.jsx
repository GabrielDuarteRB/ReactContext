import { useContext } from 'react';
import { AuthContext } from '../../context/authProvider';
import { Field, Form, Formik} from 'formik';
import * as Yup from 'yup'; 
import {ToastContainer} from 'react-toastify';
import { toastError, toastSucess } from '../../components/Toast/Toast';

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Nome muito curto!')
    .max(50, 'Nome muito longo!')
    .required('Nome obrigatório!'),
  senha: Yup.string()
    .min(2, 'Senha muito curta!')
    .max(50, 'Senha muito longa!')
    .required('Senha obrigatoria!'),
})

const Usuario = () => {

  const {handleSingUp} = useContext(AuthContext)
  const buttonSubmit = (error) => {
    toastError(error.login)
    toastError(error.senha)
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
        onSubmit={values =>  handleSingUp(values)}
      >
        
        {({errors, setFieldValue, handleChange}) => (
            <Form>
              <div> 
                <label htmlFor='login'>Login</label>
                <Field name="login"/>
                
                <label htmlFor='senha'>Senha</label>
                <Field name="senha" type="password"/>
              </div>
              <ToastContainer />
              <button type='submit' onClick={() => buttonSubmit(errors)}>Submit</button>              
            </Form>
        )}
      </Formik>
    </div>
  )
}
export default Usuario    