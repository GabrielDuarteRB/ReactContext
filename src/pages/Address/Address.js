import { useEffect } from "react"
import { apiDBC } from "../../api"

const Address = () => {

  const setup = async () => {
    try {
      const {data} = await apiDBC.get('/pessoa?pagina=0&tamanhoDasPaginas=20')
      console.log(data)
    } catch (error) {
      console.log(error)      
    }
  }

  useEffect(() => {
    setup()
  }, [])

  return (
    <>
        <address>Rua tal</address>
        <small>Copyright</small>
    </>
  )
}
export default Address