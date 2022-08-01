import { useContext, useEffect, useState } from "react"
import { Lista, Texto, Legenda, Buttons, Pessoas } from "../../components/List/List.styled"
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../components/Modal/Modal"
import Modal from 'react-modal';
import Aside from "../../components/Aside/Aside";
import { Tela } from "./People.styled";
import { ToastContainer } from "react-toastify";
import { Button } from "../../components/Button/Button";
import { AddressContext } from "../../context/AddressContext";
import Loading from "../Loading/Loading";

Modal.setAppElement('#root');

const PeopleAddress = () => {

  const {GetAddress} = useContext(AddressContext)
  const [enderecos, setEnderecos] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [idPessoa, setIdPessoa] = useState('')
  const navigate = useNavigate()

  const handleUpdate = (pessoa) => {  
    console.log(pessoa.idPessoa) 
    navigate(`/atualizarPessoas/${pessoa.idPessoa}`)
  }

  const handleAddAddress = (pessoa) => {  
    console.log(pessoa.idPessoa)
    navigate(`/endereco/${pessoa.idPessoa}`)
  }
  
  const handleGetEndereco = async () => {
    const getAddress = await GetAddress()
    setEnderecos(getAddress)
  }

  const openModal = (id) => {
    setModalIsOpen(true)
    setIdPessoa(id)
  }
  
  const deletar = (idPessoa, setModalIsOpen) => {
    // handleDelete(idPessoa, setModalIsOpen)
    // handleGetPessoas()
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
 
  useEffect(() => {
    handleGetEndereco()
  }, [enderecos])

  if(enderecos.length === 0){
    return(
      <Loading/>
    )
  }

  return (
    <Tela>
      <Aside />
      <Pessoas>
        <Lista>
            <Legenda>Nome</Legenda>
            <Legenda>Rua</Legenda>
            <Legenda>Complemento</Legenda>
            <Legenda>funções</Legenda>
        </Lista>
        {enderecos.map((pessoa) => (
          pessoa.endereco.map((endereco) => (
            <Lista key={pessoa.idPessoa}>
              <Texto>{pessoa.nome}</Texto>
              <Texto>{endereco.logradouro}</Texto>
              <Texto>{endereco.complemento}</Texto>
              <Buttons id={pessoa.idPessoa}>
                <Button backgroundColor='yellow' type="button" onClick={() => handleUpdate(pessoa)}>Atualizar</Button>
                <Button backgroundColor='red' type="button" onClick={() => openModal(pessoa.idPessoa)}>Excluir</Button>
              </Buttons >
          </Lista>
          ))
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
      <ToastContainer />
    </Tela>
  )
}
export default PeopleAddress