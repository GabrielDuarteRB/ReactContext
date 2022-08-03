import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Loading from "../../pages/Loading/Loading";
import { Button } from "../Button/Button";
import { Lista, Texto, Legenda, Buttons, Pessoas } from "./List.styled";
import { customStyles } from "../Modal/Modal";
import { AddressContext } from "../../context/AddressContext";
import { FaTrashAlt, FaSyncAlt } from "react-icons/fa";


const ListAddress = () => {

  const {GetAddress, handleDeleteAddress} = useContext(AddressContext)
  const [enderecos, setEnderecos] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [idEndereco, setIdEndereco] = useState('')
  const navigate = useNavigate()

  const handleUpdate = (idPessoa, idEndereco) => {  
    navigate(`/atualizarendereco/${idPessoa}/${idEndereco}`)
  }
  
  const handleGetEndereco = async () => {
    const getAddress = await GetAddress()
    setEnderecos(getAddress)
  }

  const openModal = (id) => {
    setModalIsOpen(true)
    setIdEndereco(id)
  }
  
  const deletar = async (idEndereco, setModalIsOpen) => {
    await handleDeleteAddress(idEndereco, setModalIsOpen)
    handleGetEndereco()
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
 
  useEffect(() => {
    handleGetEndereco()
  }, [])

  if(enderecos.length === 0){
    return(
      <Loading/>
    )
  }
  
  console.log(enderecos)
  return (
      <Pessoas>
        <Lista>
            <Legenda>name</Legenda>
            <Legenda>Street</Legenda>
            <Legenda>Number</Legenda>
        </Lista>
        {enderecos.map((pessoa) => (
          pessoa.enderecos.length > 0
            &&
          <Lista key={pessoa.idPessoa}>
            {pessoa.enderecos.map((endereco) => (
            <>
              <Texto>{pessoa.nome}</Texto>
              <Texto>{endereco.logradouro}</Texto>
              <Texto>{endereco.numero}</Texto>
              <Buttons id={pessoa.idPessoa}>
                <FaSyncAlt onClick={() => handleUpdate(pessoa.idPessoa, endereco.idEndereco)} type="button">Atualizar</FaSyncAlt>
                <FaTrashAlt backgroundColor='red' onClick={() => openModal(endereco.idEndereco)} type="button">Excluir</FaTrashAlt>
              </Buttons >
            </>
                
            ))}
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
                <button onClick={() => deletar(idEndereco, setModalIsOpen)}>Sim</button>
                <button onClick={closeModal}>Não</button>
              </div>
          </Modal>
      </Pessoas>
  )
}
export default ListAddress