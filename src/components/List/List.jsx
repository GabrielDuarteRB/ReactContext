import { useContext, useEffect, useState } from "react"
import { PeopleContext } from "../../context/PeopleContext"
import { Lista, Texto, Legenda, Buttons, Pessoas } from "./List.styled"
import {FaEllipsisV} from 'react-icons/fa'
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button"
import { customStyles } from "../Modal/Modal"
import Modal from 'react-modal';

Modal.setAppElement('#root');

const List = () => {
  
  const {handleGet, handleDelete} = useContext(PeopleContext)
  const [visivel, setVisivel] = useState(false)
  const [pessoas, setPessoas] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [idPessoa, setIdPessoa] = useState('')
  const navigate = useNavigate()

  const handleUpdate = (pessoa) => {  
    navigate(`/atualizarPessoas/${pessoa.idPessoa}`)
  }
  
  const handleGetPessoas = async () => {
    const getPessoas = await handleGet()
    setPessoas(getPessoas)
  }

  const openModal = (id) => {
    setModalIsOpen(true)
    setIdPessoa(id)
  }
  
  const deletar = (idPessoa, setModalIsOpen) => {
    handleDelete(idPessoa, setModalIsOpen)
    handleGetPessoas()
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const visibilidade = () => {
    visivel ? setVisivel(false) : setVisivel(true)
  }
 
  useEffect(() => {
    handleGetPessoas()
  }, [pessoas])

  return (
    
      <Pessoas>
        <Lista>
            <Legenda>Ticket details</Legenda>
            <Legenda>Customer name</Legenda>
            <Legenda>Date</Legenda>
            <Legenda>Priority</Legenda>
        </Lista>
        {pessoas.map((pessoa) => (
              <Lista key={pessoa.idPessoa}>
                  <Texto >{pessoa.email}</Texto>
                  <Texto>{pessoa.nome}</Texto>
                  <Texto>{moment(pessoa.dataNascimento).locale('ptbr').format('ll')}</Texto>
                  <Buttons id={pessoa.idPessoa}>
                    {
                      visivel
                      ?
                      (<>
                      <Button backgroundColor='yellow' type="button" onClick={() => handleUpdate(pessoa)}>Atualizar</Button>
                      <Button backgroundColor='red' type="button" onClick={() => openModal(pessoa.idPessoa)}>Excluir</Button>
                      </>)
                      :
                      null
                    }
                    <FaEllipsisV onClick={visibilidade  } />
                  </Buttons >
              </Lista>
          ))}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
              <div>Tem certeza que deseja excluir?</div>
              <div style={customStyles.butoes}>
                <button onClick={() => deletar(idPessoa, setModalIsOpen)}>Sim</button>
                <button onClick={closeModal}>Não</button>
              </div>
          </Modal>
      </Pessoas>
   
  )
}
export default List