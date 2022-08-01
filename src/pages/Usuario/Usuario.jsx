import { useContext } from 'react';
import { AuthContext } from '../../context/authProvider';
import { Field, Form, Formik, useFormik} from 'formik';
import {ToastContainer} from 'react-toastify';
import { toastError} from '../../components/Toast/Toast';
import { ValidationSignup } from '../../utils/ValidationsForm/ValidationsForm';

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
        validationSchema={ValidationSignup}
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