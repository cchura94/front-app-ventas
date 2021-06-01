<template>
    <div>
        <h1>Login </h1>
        {{ usuario }}
        <br>

        <input type="email" v-model="usuario.email">
        <br>
        <input type="password" v-model="usuario.password">
        <br>
        <v-btn @click="ingresar()">Ingresar</v-btn>

    </div>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            usuario: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async ingresar(){
            let { data } = await axios.post("http://127.0.0.1:3000/api/auth/login2", this.usuario)
            console.log(data);
        }
    }
}
</script>
