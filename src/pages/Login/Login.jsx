import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  senha: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const Login = () => {


  const {handleLogin} = useContext(AuthContext)

  return (
    <div>
      <h1>Faça seu login</h1>

      <Formik 
        initialValues={{
          login: '',
          senha: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => handleLogin(values)}
      >
        
        {({errors, touched}) => (
            <Form>
              <label htmlFor='login'>Login</label>
              <Field name="login"/>
             { errors.login && touched.login ? ( 
                <div>{errors.login}</div>
              ) : null}

              <label htmlFor='senha'>Senha</label>
              <Field name="senha" type="password"/>
              {errors.senha && touched.senha ? ( 
                <div>{errors.senha}</div>
              ) : null}
              <button type='submit'>Submit</button>
            </Form>
        )}

          
      </Formik>
    </div>
  )
}
export default Login    