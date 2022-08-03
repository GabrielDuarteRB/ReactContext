import { useFormik } from 'formik';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import FormularioContact from '../../components/Formulario/FormularioContact';
import { ContactContext } from '../../context/ContactContext';
import { ValidationContact } from '../../utils/ValidationsForm/ValidationsForm';

const Contact = () => {
    
  const {handleAddContact, handleUpdateContact} = useContext(ContactContext)
  const {idPessoa, idContato} = useParams()

  const formik = useFormik({
    initialValues: {
      idPessoa: idPessoa,
      tipoContato: '' ,
      telefone: '',
      descricao: '',
    },
    onSubmit: values => {
      idContato !== 'undefined' ? handleUpdateContact(idContato, idPessoa, values) : handleAddContact(idPessoa, values)
    },
    validationSchema: ValidationContact
  })

  return (
    <>
        <FormularioContact formik={formik} idContato={idContato} idPessoa={idPessoa}/>
    </>
  )
}
export default Contact