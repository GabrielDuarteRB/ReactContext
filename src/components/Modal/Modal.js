import { useContext } from "react";
import { PeopleContext } from "../../context/PeopleContext";

export const Modal = ({modalIsOpen, setModalIsOpen, idPessoa}) => {

  const {handleDelete} = useContext(PeopleContext)

  function closeModal() {
    setModalIsOpen(false);
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

  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
          <div>Tem certeza que deseja excluir?</div>
          <div style={customStyles.butoes}>
            <button onClick={() => handleDelete(idPessoa, setModalIsOpen)}>Sim</button>
            <button onClick={closeModal}>Não</button>
          </div>
    </Modal>
  )
}