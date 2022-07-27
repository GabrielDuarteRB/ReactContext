import { Link } from "react-router-dom"
import { FaHireAHelper } from "react-icons/fa";


const Imagem = ({fontsize}) => {
  return (
    <Link to='/'>
        <FaHireAHelper
            style={{
                fontSize: fontsize
            }}
        />
    </Link>
  )
}
export default Imagem