<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>INGRESAR</v-toolbar-title>

                    </v-toolbar>

                     <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                label="Ingrese su correo"
                                name="login"
                                prepend-icon="mdi-account"
                                type="email"
                                v-model="usuario.email"
                                :counter="50"
                                :rules="correoRules"

                            ></v-text-field>
        
                            <v-text-field
                                id="password"
                                label="Ingrese su Contraseña"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="usuario.password"
                                :rules="[v => !!v || 'La Contraseña es Obligatoria']"
                                ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="ingresar()" :disabled="!valid">Ingresar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            :color="color"
            >
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Cerrar
                </v-btn>
            </template>
            </v-snackbar>

    </v-container>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            usuario: {
                email: '',
                password: ''
            },
             snackbar: false,
             color: "green",
            text: 'Credenciales Incorrectas',
            timeout: 2000,
            correoRules: [
                v => !!v || 'El Correo es Obligatorio',
                v => (v && v.length <= 40) || 'El correo debe ser menor a 40 Caracteres',
                v => /.+@.+\..+/.test(v) || 'El correo no es Valido',
            ],
            valid: true
        }
    },
    methods: {
        async ingresar(){

            this.validate();

            let { data } = await axios.post("http://127.0.0.1:3000/api/auth/login2", this.usuario)
            console.log(data);
            if(!data.error){
                this.text = "Bienvenido Usuario"
                this.snackbar = true
                this.color = "green"
            }else{
                this.text = data.mensaje
                this.snackbar = true
                this.color = "red"
            }
        },
        validate () {
            this.$refs.form.validate()
        },
    }
}
</script>
