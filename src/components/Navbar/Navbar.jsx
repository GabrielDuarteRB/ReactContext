import { Link } from "react-router-dom"
import { FaTicketAlt, FaLightbulb } from "react-icons/fa"

const Navbar = () => {
  return (
    <div>
        <Link to={'/endereco'}>
            <FaTicketAlt/>
            <li>Endereço</li>
        </Link>
        <Link to={'/pessoas'}>
            <FaLightbulb/>
            <li>Pessoas</li>
        </Link>
    </div>
  )
}
export default Navbar