import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormularioAddress from "../../components/Formulario/FormularioAddress";
import { AddressContext } from "../../context/AddressContext";
import { maskCEPAdd } from "../../utils/masked";

const AddressUpdate = () => {

  const {idPessoa, idEndereco} = useParams()
  const [funcao, setFuncao] = useState('')
  const {handleUpdateAddress, GetAddressId } = useContext(AddressContext)

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
        idPessoa: idPessoa,
        tipo: values.tipo.toUpperCase(),
        logradouro: values.logradouro,
        numero: values.numero,
        complemento: values.complemento,
        cep: values.cep.replace('-', ''),
        cidade: values.cidade,
        estado: values.estado,
        pais: values.pais
      }

      handleUpdateAddress(newValues, idEndereco)
    },
    // validationSchema: ValidationAddress
  });

  const CompleteInformations = async () => {
    const informations = await GetAddressId(idEndereco)
    formik.setFieldValue('tipo', informations.tipo)
    formik.setFieldValue('logradouro', informations.logradouro)
    formik.setFieldValue('numero', informations.numero)
    formik.setFieldValue('complemento', informations.complemento)
    formik.setFieldValue('cep', maskCEPAdd(informations.cep))
    formik.setFieldValue('cidade', informations.cidade)
    formik.setFieldValue('estado', informations.estado)
    formik.setFieldValue('pais', informations.pais)
  }

  useEffect(() => {
    CompleteInformations()
    setFuncao('update')
  }, [])
  return (
    <>
      <FormularioAddress formik={formik} funcao='update' />
    </>
  )
}
export default AddressUpdate