<template>
<div>
    <h1>Lista de Productos</h1>
    
      <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Nuevo producto
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Nuevo producto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="8"
                md="8"
              >
                <v-text-field
                  label="Ingrese nombre de Producto*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  label="Ingrese Cantidad "
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Ingrese el Precio"
                  hint="Ejemplo: 298.90"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="8"
              >
                <v-text-field
                  label="Ingrese Descripción*"
                  hint="Descripcion de Producto"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Ropa', 'Muebles']"
                  label="Categoria"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <v-data-table
    :headers="cabeceras"
    :items="lista_productos"
    :page="page"
    :options.sync="opciones"
    :server-items-length="totalProductos"
    :loading="cargando"
    item-key="nombre"
    class="elevation-1"
  ></v-data-table>
</div>
</template>

<script>
import * as prodService from "./../../../services/productoService"
export default {
    data(){
        return {
             dialog: false,
            page: 1,
            totalProductos: 0,
            cargando: true,
            opciones: {},
            cabeceras: [
                { text: "Nombre del Producto", value: "nombre" },
                { text: "Cantidad", value: "stock" },
                { text: "Precio", value: "precio" },
                { text: "Imagen", value: "imagen" },
                { text: "Acciones", value: "acciones" },
            ],
            lista_productos: [],

        }
    },
    mounted(){
        this.obtenerDatos();
    },
    methods:{
        async obtenerDatos(){
            this.cargando = true;
            const {page, itemsPerPage} = this.opciones;
            let nro_pagina = page;
            const datos = await prodService.listar(nro_pagina, itemsPerPage)
            this.lista_productos = datos.rows
            this.cargando = false;
            this.totalProductos = datos.count
        }
    },
    watch: {
        opciones: {
            handler(){
                this.obtenerDatos();
            }
        }
    }

}
</script>

<style>

</style>