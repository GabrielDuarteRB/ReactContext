import { useContext, useEffect, useState } from "react"
import { PeopleContext } from "../../context/PeopleContext"
import { Lista, Texto, Legenda, Buttons, Pessoas } from "./List.styled"
import {FaEllipsisV} from 'react-icons/fa'
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button"

const List = () => {
  
  const {handleGet} = useContext(PeopleContext)
  const [visivel, setVisivel] = useState(false)
  const [pessoas, setPessoas] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleUpdate = (pessoa) => {  
    navigate(`/atualizarPessoas/${pessoa.idPessoa}`)
  }
  
  const handleGetPessoas = async () => {
    const getPessoas = await handleGet()
    setPessoas(getPessoas)
  }

  const visibilidade = () => {
    visivel ? setVisivel(false) : setVisivel(true)
  }
 
  useEffect(() => {
    handleGetPessoas()
  }, [])

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
                      <Button backgroundColor='red' type="button" onClick={() => setModalIsOpen(true)}>Excluir</Button></>)
                      :
                      null
                    }
                    <FaEllipsisV onClick={visibilidade  } />
                  </Buttons >
              </Lista>
          ))}
      </Pessoas>
   
  )
}
export default List