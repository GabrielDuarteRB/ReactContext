import { useNavigate } from "react-router-dom";
import List from "../../components/List/List";
import Aside from '../../components/Aside/Aside'
import Tela from './People.styled.js'
import { ToastContainer } from "react-toastify";

const People = () => {

  const navigate = useNavigate()

  const handleCreate = (pessoa) => {
    navigate(`/criarPessoas`)
  }

  return (
    <Tela>
      <Aside />
      <div>
        <List /> 
        <button type="button" onClick={() => handleCreate()}>Adicionar</button>
      </div>
      <ToastContainer />
    </Tela>
  )
}
export default People