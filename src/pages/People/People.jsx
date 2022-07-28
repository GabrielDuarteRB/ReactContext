import { useEffect, useState } from "react"
import { apiDBC } from '../../api'
import { Field, useFormik, Formik, Form} from 'formik';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";
import { updatePerson, addPerson, deletePerson} from "./PeopleCrud";
import Modal from 'react-modal';
import moment from 'moment';

const People = () => {

  const [pessoas, setPessoas] = useState([]);
  const [idPessoa, setIdPessoa] = useState('')
  const [nomePessoa, setNomePessoa] = useState('')
  const [emailPessoa, setEmailPessoa] = useState('')
  const [cpfPessoa, setCpfPessoa] = useState('')
  const [dataPessoa, setDataPessoa] = useState('')
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const regexCPF = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/,];
  const regexData = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/,];

  async function setup() {
    try {
      const {data} = await apiDBC.get('/pessoa?pagina=0&tamanhoDasPaginas=20')
      setPessoas(data.content);
    } catch (error) {
      alert(error);
    }
  }
 
  const buttonUpdate = (pessoa) => {  
    setNomePessoa(pessoa.nome)
    setCpfPessoa(pessoa.cpf)
    setEmailPessoa(pessoa.email)
    setDataPessoa(pessoa.data)
    setIdPessoa(pessoa.idPessoa)
    setAdd(false)
    setUpdate(true)
  }

  const buttonAdd = (pessoa) => {
    setNomePessoa('')
    setCpfPessoa('')
    setEmailPessoa('')
    setDataPessoa('')
    setUpdate(false)
    setAdd(true)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    butoes: {
      display: 'flex',
      alignItens: 'center',
      justifyContent: 'space-around',
      paddingTop: '16px'
    }
  };
  Modal.setAppElement('#root');

  function openModal(id) {
    setIdPessoa(id)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const   RegisterSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    cpf: Yup.string()
      .length(14, 'Cpf tem que conter 11 números'),
    dataNascimento: Yup.date('Data inválida')
    
  })

  useEffect(() => {
    setup();
  }, []);

  return (
    <>
      { 
      add || update
      ?
        (<Formik
        initialValues={{ 
          nome: `${nomePessoa ? nomePessoa : ''}`,
          cpf: cpfPessoa,
          dataNascimento: moment(dataPessoa).format('DD/MM/YYYY'),
          email: emailPessoa,
        }}
        onSubmit={(values) => {
          add ? addPerson(values) : updatePerson(idPessoa ,values)
        }}
        validationSchema={RegisterSchema}
      >
        {({ errors, touched, setFieldValue, handleChange, values }) => ( 
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
              mask={regexData}
              type='text'
              />
            )} 
            </Field>
            {errors.nome && touched.nome ?(   
                  alert('nome incorreto')
            ) : null}
            <Field name='cpf'>
              {field => (
                  <MaskedInput
                  {...field}
                  id='cpf'
                  placeholder='cpf'
                  value={values.cpf} 
                  onChange={handleChange}
                  mask={regexCPF}
                  type='text'
                  />
              )} 
            </Field>
            <Field name='email' type='email' placeholder='email' value={values.email} onChange={handleChange}/>
            <button type="submit">{add ? 'Adicionar' : 'Atualizar'}</button>
          </Form>
        )}
      </Formik>)
      :
      null
      }
          
      <button onClick={() => buttonAdd()}>Adicionar</button>
      <div>
        { pessoas.map((pessoa) => (
          <div key={pessoa.idPessoa}>
            <h1>{pessoa.nome}</h1>
            <p>{pessoa.dataNascimento}</p>
            <p>{pessoa.email}</p>
            <p>{pessoa.cpf}</p>
            <button onClick={() => buttonUpdate(pessoa)}>Atualizar</button>
            <button onClick={() => openModal(pessoa.idPessoa)}>Excluir</button>
          </div>
        ))}
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
          <div>Tem certeza que deseja excluir?</div>
          <div style={customStyles.butoes}>
            <button onClick={() => deletePerson(idPessoa, setIsOpen)}>Sim</button>
            <button onClick={closeModal}>Não</button>
          </div>
        </Modal>
    </div>
    </>
  )
}
export default People