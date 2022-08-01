import { useNavigate } from "react-router-dom";
import List from "../../components/List/List";
import Aside from '../../components/Aside/Aside'
import {Tela, ButtonDiv} from './People.styled.js'
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { PeopleContext } from "../../context/PeopleContext";
import { Button } from "../../components/Button/Button";

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
        <ButtonDiv>
          <h1>Adicionar nova pessoa</h1>
          <Button backgroundColor='green' type="button" onClick={() => handleCreate()}>Adicionar</Button>
        </ButtonDiv>
        <List /> 
      </div>
      <ToastContainer />
    </Tela>
  )
}
export default People