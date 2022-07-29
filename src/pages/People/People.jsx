import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import List from "../../components/List/List";
import Aside from '../../components/Aside/Aside'
import Tela from './People.styled.js'

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
    </Tela>
  )
}
export default People