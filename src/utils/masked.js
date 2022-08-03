export const maskCPF = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/,]

export const maskData = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/,];

export const maskCEP = [/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,];

export const maskNumero = ["(",/\d/,/\d/,")",/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/];

export const maskCPFAdd = (cpf) => {
    return cpf.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-")
}   

export const maskCEPAdd = (cep) => {
    return cep.replace(/(\d{5})(\d{3})/g, "\$1-\$2")
}