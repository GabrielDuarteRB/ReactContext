import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/authProvider';
import { Card, LoginDiv, TextoPequeno, SubTitulo, Titulo, Label, Input, Campo, Button, Password, Azul } from './Login.styled';
import Imagem from '../../components/Imagem/Imagem';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Login = () => {

  const {handleLogin} = useContext(AuthContext)

  return (
    <LoginDiv>
      <Card>
        <Imagem fontsize={'30px'}/>
        <SubTitulo>DashBoard Kit</SubTitulo>
        <Titulo>Log In to Dashboard Kit</Titulo>
        <TextoPequeno>Enter yout email adn password below</TextoPequeno>
        <Formik 
          initialValues={{
            login: '',
            senha: '',
          }}
          onSubmit={values => console.log(values)}
        >
          
          {({errors, touched}) => (
              <Form>
                <Campo>
                  <div>
                    <Label htmlFor='login'>EMAIL</Label>
                  </div>
                  <Input name="login" placeholder='Email address'/>
                  { errors.login && touched.login ? ( 
                    <div>{errors.login}</div>
                  ) : null}
                </Campo>

                <Campo>
                  <Password>
                    <Label htmlFor='senha'>PASSWORD</Label>
                    <TextoPequeno small>Forgot Password</TextoPequeno>
                  </Password>
                  <Input name="senha" type="password" placeholder='password'/>
                  {errors.senha && touched.senha ? ( 
                    <div>{errors.senha}</div>
                  ) : null}
                </Campo>
                
                <Button type='submit'>Log In</Button>
              </Form>
          )}
        </Formik>
        <TextoPequeno>Don't have an account? <Link to={'/usuario'}><Azul>Sign up</Azul></Link></TextoPequeno>
      </Card>
    </LoginDiv>
  )
}
export default Login    