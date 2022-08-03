import { useContext, useEffect, useState } from "react"
import { PeopleContext } from "../../context/PeopleContext"
import { Lista, Texto, Legenda, Buttons, Pessoas } from "./List.styled"
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { customStyles } from "../Modal/Modal"
import Modal from 'react-modal';
import { FaHouseUser, FaTrashAlt, FaSyncAlt, FaAddressBook } from "react-icons/fa";

Modal.setAppElement('#root');

const List = () => {
  
  const {handleGet, handleDelete} = useContext(PeopleContext)
  const [pessoas, setPessoas] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [idPessoa, setIdPessoa] = useState('')
  const navigate = useNavigate()

  const handleUpdate = (pessoa) => {  
    navigate(`/atualizarPessoas/${pessoa.idPessoa}`)
  }

  const handleAddAddress = (pessoa) => {  
    navigate(`/endereco/${pessoa.idPessoa}`)
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
 
  useEffect(() => {
    handleGetPessoas()
  }, [pessoas])

  return (
    
      <Pessoas>
        <Lista>
            <Legenda>Ticket details</Legenda>
            <Legenda>Customer name</Legenda>
            <Legenda>Date</Legenda>
        </Lista>
        {pessoas.map((pessoa) => (
          <Lista key={pessoa.idPessoa}>
                  <Texto >{pessoa.email}</Texto>
                  <Texto>{pessoa.nome}</Texto>
                  <Texto>{moment(pessoa.dataNascimento).locale('ptbr').format('ll')}</Texto>
                  <Buttons id={pessoa.idPessoa}>
                      <FaSyncAlt onClick={() => handleUpdate(pessoa)}/>
                      <FaHouseUser onClick={() => handleAddAddress(pessoa)}/>
                      <FaAddressBook onClick={() => navigate(`/contatos/${pessoa.idPessoa}`)}/>
                      <FaTrashAlt onClick={() => openModal(pessoa.idPessoa)}/>
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
                <button style={customStyles.sim} onClick={() => deletar(idPessoa, setModalIsOpen)}>Sim</button>
                <button style={customStyles.nao} onClick={closeModal}>Não</button>
              </div>
          </Modal>
      </Pessoas>
   
  )
}
export default List