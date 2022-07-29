import { Link } from "react-router-dom"

const Item = ({name, url, icone}) => {
  return (
    <>
      
      <Link to={url}><li>{name}</li></Link>
    </>
  )
}
export default Item