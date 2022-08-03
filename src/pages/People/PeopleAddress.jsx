import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Aside from "../../components/Aside/Aside";
import { Tela } from "./People.styled";
import { ToastContainer } from "react-toastify";
import { AddressContext } from "../../context/AddressContext";
import Loading from "../Loading/Loading";
import ListAddress from "../../components/List/ListAddress";

Modal.setAppElement('#root');

const PeopleAddress = () => {

  const {GetAddress} = useContext(AddressContext)
  const [enderecos, setEnderecos] = useState([])
  const navigate = useNavigate()
  
  const handleGetEndereco = async () => {
    const getAddress = await GetAddress()
    setEnderecos(getAddress)
  }
 
  useEffect(() => {
    handleGetEndereco()
  }, [])

  if(enderecos.length === 0){
    return(
      <Loading/>
    )
  }
  
  console.log(enderecos)
  return (
    <Tela>
      <Aside />
      <div>
        <ListAddress/>
      </div>
    </Tela>
  )
}
export default PeopleAddress