import { useNavigate } from "react-router-dom";
import List from "../../components/List/List";
import Aside from '../../components/Aside/Aside'
import Tela from './People.styled.js'
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { PeopleContext } from "../../context/PeopleContext";

const People = () => {

  const {setPessoa} = useContext(PeopleContext)
  const navigate = useNavigate()

  const handleCreate = () => {
    navigate(`/criarPessoas`)
  }

  useEffect(() =>{
    setPessoa([])
  }, [])

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