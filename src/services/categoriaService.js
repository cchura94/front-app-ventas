import axios from "axios"

const url = "http://127.0.0.1:3000/api"

export const listar = async function(){
    let {data} = await axios.get(`${url}/categoria`);
    return data;
}

export const guardar = async function(datos){
    let {data} = await axios.post(`${url}/categoria`, datos);
    return data;
}

export const eliminar = async function(id){
    let {data} = await axios.delete(`${url}/categoria/${id}`);
    return data;

}