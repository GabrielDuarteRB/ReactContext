import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authProvider';
import { Card, LoginDiv, TextoPequeno, SubTitulo, Titulo, Label, Campo, Button, Password, Azul } from '../Login/Login.styled';
import Imagem from '../../components/Imagem/Imagem';
import { FaEye } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';

const Usuario = () => {

  const {handleSignUp} = useContext(AuthContext)
  const [type, setType] = useState('password')

  const viewPassword = () => {
    if (type === 'password') {
      setType('text')
      return
    }
    setType('password')
  }
  
  return (
    <LoginDiv>
      <Card>
        <Imagem fontsize={'30px'}/>
        <SubTitulo>DashBoard Kit</SubTitulo>
        <Titulo>sign up to Dashboard Kit</Titulo>
        <TextoPequeno>Enter your email adn password below</TextoPequeno>
        <Formik 
          initialValues={{
            login: '',
            senha: '',
          }}
          onSubmit={values => handleSignUp(values)}
        >
          
          {({values}) => (
              <Form>
                <Campo>
                  <div>
                    <Label htmlFor='login'>EMAIL*</Label>
                  </div>
                  <Field name="login" placeholder='Email address'/>
                </Campo>

                <Campo>
                  <Password>
                    <Label htmlFor='senha'>PASSWORD*</Label>
                  </Password>
                  <Field name="senha" type={type} placeholder='password' />
                  <TextoPequeno small><FaEye onClick={viewPassword}/></TextoPequeno>
                </Campo>
                <ToastContainer />
                <Button type='submit'>Sign up</Button>
              </Form>
          )}
        </Formik>
      </Card>
    </LoginDiv>
  )
}
export default Usuario    