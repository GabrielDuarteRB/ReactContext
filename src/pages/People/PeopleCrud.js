import { apiDBC } from "../../api";

export const updatePerson =  async (id, values) => {
    console.log(id)
    let cpf = values.cpf
    cpf = cpf.replaceAll('.', '')
    cpf = cpf.replace('-', '')
    console.log(cpf)
    let data = values.dataNascimento
    data = data.split('/')
    data = `${data[2]}-${data[1]}-${data[0]}`

    try {
        await apiDBC.put(`/pessoa/${id}`, {
        'nome': values.nome,
        'dataNascimento': data,
        'cpf': cpf,
        'email': values.email,
        })
        console.log('atualizou')
    } catch (error) {
        alert(error);
    }
}

export const addPerson = async (values) => {
    let cpf = values.cpf
    cpf = cpf.replaceAll('.', '')
    cpf = cpf.replace('-', '')
    let data = values.dataNascimento
    data = data.split('/')
    data = `${data[2]}-${data[1]}-${data[0]}`

    console.log(values.nome, values.dataNascimento, values.cpf, values.email, data, cpf)

    try {
        await apiDBC.post('/pessoa', {
            'nome': values.nome,
            'dataNascimento': data,
            'cpf': cpf,
            'email': values.email,
        } )
} catch (error) {
    alert(error);
}
}

export const deletePerson = async (id, setIsOpen) => {
    setIsOpen(false)
    try {
        await apiDBC.delete(`/pessoa/${id}`)
        console.log('deletou')
    } catch (error) {
        alert(error);
    }
}