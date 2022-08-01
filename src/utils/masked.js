export const maskCPF = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/,]

export const maskData = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/,];

export const maskCEP = [/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,];

export const maskCPFAdd = (cpf) => {
    return cpf.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-")
}   