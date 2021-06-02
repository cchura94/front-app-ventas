<template>
    <div>
        <v-app-bar
            color="deep-purple accent-4"
            
            dark
            >

            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>EMPRESA</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text to="/">
            INICIO
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-btn text to="/login">
                INGRESAR
                <v-icon>mdi-account</v-icon>
            </v-btn>


        </v-app-bar>


        <router-view></router-view>
    </div>
</template>