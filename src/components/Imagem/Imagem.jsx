import { Link } from "react-router-dom"
import { FaQq } from "react-icons/fa";

const Imagem = ({fontsize , teste}) => {
  return (
    <Link to='/'>
        <FaQq
            style={{
                fontSize: fontsize
            }}
        />
    </Link>
  )
}
export default Imagem