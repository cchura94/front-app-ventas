import axios from "axios"
import { urlbase, getHeader } from "./../config/config"

const url = urlbase

export const listar = async function(){
    let {data} = await axios.get(`${url}/categoria`, {headers: getHeader()});
    return data;
}

export const guardar = async function(datos){
    let {data} = await axios.post(`${url}/categoria`, datos, {headers: getHeader()});
    return data;
}

export const eliminar = async function(id){
    let {data} = await axios.delete(`${url}/categoria/${id}`, {headers: getHeader()});
    return data;

}