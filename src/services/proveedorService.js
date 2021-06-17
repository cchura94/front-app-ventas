import axios from "axios"
import { urlbase, getHeader } from "./../config/config"

const url = urlbase

export const listar = async function(){
    let {data} = await axios.get(`${url}/proveedor`, {headers: getHeader()});
    return data;
}

export const guardar = async function(datos){
    let {data} = await axios.post(`${url}/proveedor`, datos, {headers: getHeader()});
    return data;
}

export const modificar = async function(datos, id){
    let {data} = await axios.put(`${url}/proveedor/${id}`, datos, {headers: getHeader()});
    return data;
}

export const eliminar = async function(id){
    let {data} = await axios.delete(`${url}/proveedor/${id}`, {headers: getHeader()});
    return data;

}