import {  useFormik } from "formik"
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AddressContext } from "../../context/AddressContext";
import { ValidationAddress } from "../../utils/ValidationsForm/ValidationsForm";
import FormularioAddress from "../../components/Formulario/FormularioAddress";

const Address = () => {

  const {id} = useParams()
  const {handleCreateAddress} = useContext(AddressContext)

  const formik = useFormik({
    initialValues: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
    },
    onSubmit: values => { 
      const newValues = {
        idPessoa: id,
        tipo: values.tipo.toUpperCase(),
        logradouro: values.logradouro,
        numero: values.numero,
        complemento: values.complemento,
        cep: values.cep.replace('-', ''),
        cidade: values.cidade,
        estado: values.estado,
        pais: values.pais
      }

      handleCreateAddress(newValues, id)
    },
    // validationSchema: ValidationAddress
  });

  return (
    <>
      <FormularioAddress formik={formik} funcao='add'/>
    </>
  )
}
export default Address