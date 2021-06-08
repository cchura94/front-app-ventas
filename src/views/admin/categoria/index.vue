<template>
  <div>
      <h2>Guardar Categoria</h2>
      <input type="text" v-model="categoria.nombre" placeholder="Nombre">
      <br>
      <input type="text" v-model="categoria.detalle" placeholder="Detalle">
      <br>
      <button @click="guardar()">Guardar</button>
      
      <h1>Lista de Categoria</h1>
      <h1 v-if="cargando">Cargando...</h1>
      <table border="1">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>DETALLE</th>
                  <th>ACCIONES</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(cat, index) in lista_categorias" :key="index">
                  <td>{{ cat.id }}</td>
                  <td>{{ cat.nombre }}</td>
                  <td>{{ cat.detalle }}</td>
                  <td></td>
              </tr>
          </tbody>
      </table>

  </div>
</template>

<script>
import * as catService from "./../../../services/categoriaService"

export default {
    data(){
        return {
            lista_categorias: [],
            cargando: true,
            categoria: {
                nombre: '',
                detalle: ''
            }
        }
    },
    async mounted(){
        let datos = await catService.listar()
        console.log(datos);
        this.lista_categorias = datos
        this.cargando = false
    },

    methods: {
        async guardar(){
            await catService.guardar(this.categoria)
            this.lista_categorias.push(this.categoria)
        }
    }

}
</script>
