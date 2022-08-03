import Aside from "../../components/Aside/Aside"
import ListContact from "../../components/List/ListContact"
import { Button } from "../../components/Button/Button"
import { Tela } from "./People.styled"
import { useNavigate, useParams } from "react-router-dom"

const PeopleContact = () => {

  const navigate = useNavigate()
  const {id} = useParams()

  return (
    <Tela>
        <Aside/>
        <div>
            <ListContact/>
            <Button backgroundColor='green' type="button" onClick={() => navigate(`/criarcontato/${id}/undefined`)}>Adicionar</Button>
        </div>
    </Tela>
  )
}
export default PeopleContact