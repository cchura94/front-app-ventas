import axios from "axios"

const url = "http://127.0.0.1:3000/api"

export const listar = async function(page, limit){
    let {data} = await axios.get(`${url}/producto?page=${page}&limit=${limit}`);
    return data;
}

export const guardar = async function(datos){
    let {data} = await axios.post(`${url}/producto`, datos);
    return data;
}

export const modificar = async function(datos, id){
    let {data} = await axios.put(`${url}/producto/${id}`, datos);
    return data;
}

export const eliminar = async function(id){
    let {data} = await axios.delete(`${url}/producto/${id}`);
    return data;

}