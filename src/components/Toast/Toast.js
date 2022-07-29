import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSucess = (mensagem) => {
    toast.success(mensagem, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
} 

export const toastError = (mensagem) => {
    toast.error(mensagem, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
} 

export const toastWarn = (mensagem) => {
    toast.warn(mensagem, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
} 