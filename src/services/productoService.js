import axios from "axios"
import { urlbase, getHeader } from "./../config/config"

const url = urlbase

export const listar = async function(page, limit){
    let {data} = await axios.get(`${url}/producto?page=${page}&limit=${limit}`, {headers: getHeader()});
    return data;
}

export const guardar = async function(datos){
    let {data} = await axios.post(`${url}/producto`, datos, {headers: getHeader()});
    return data;
}

export const modificar = async function(datos, id){
    let {data} = await axios.put(`${url}/producto/${id}`, datos, {headers: getHeader()});
    return data;
}

export const eliminar = async function(id){
    let {data} = await axios.delete(`${url}/producto/${id}`, {headers: getHeader()});
    return data;

}