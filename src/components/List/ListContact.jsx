import { useContext, useEffect, useState } from "react"
import { Lista, Texto, Legenda, Buttons, Pessoas } from "./List.styled"
import { useNavigate, useParams } from "react-router-dom";
import { customStyles } from "../Modal/Modal"
import Modal from 'react-modal';
import {FaTrashAlt, FaSyncAlt, } from "react-icons/fa";
import { ContactContext } from "../../context/ContactContext";

const ListContact = () => { 

  const [contatos, setContatos] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState()
  const [idContato, setIdContato] = useState()
  const {GetContactId, handleDeleteContact} = useContext(ContactContext)
  const navigate = useNavigate()
  const {id} = useParams()

  const api = async () => {
    const data = await GetContactId(id)
    setContatos(data)  
  }

  const openModal = (id) => {
    setModalIsOpen(true)
    console.log(id)
    setIdContato(id)
  }
  
  const deletar = () => {
    console.log(idContato)
    handleDeleteContact(idContato, setModalIsOpen)
    api()
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    api()
  })

  return (
    <Pessoas>
      <Lista>
          <Legenda>Telefone</Legenda>
          <Legenda>Tipo</Legenda>
          <Legenda>descrição</Legenda>
      </Lista>
      {contatos.map((contato) => (
        <Lista key={contato.Contato}>
          <Texto>{contato.telefone}</Texto>
          <Texto>{contato.tipoContato}</Texto>
          <Texto>{contato.descricao}</Texto>
          <Buttons id={contato.idPessoa}>
              <FaSyncAlt onClick={() => navigate(`/criarcontato/${id}/${contato.idContato}`)}/>
              <FaTrashAlt onClick={() => openModal(contato.idContato)}/>
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
            <button style={customStyles.sim} onClick={deletar}>Sim</button>
            <button style={customStyles.nao} onClick={closeModal}>Não</button>
          </div>
      </Modal>
  
    </Pessoas>
  )
}
export default ListContact