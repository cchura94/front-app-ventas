<template>
  <v-container>
    <h2>Guardar Categoria</h2>
    <input type="text" v-model="categoria.nombre" placeholder="Nombre" />
    <br />
    <input type="text" v-model="categoria.detalle" placeholder="Detalle" />
    <br />
    <button @click="guardar()">Guardar</button>

    <h1>Lista de Categoria</h1>
    <h1 v-if="cargando">Cargando...</h1>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">NOMBRE</th>
            <th class="text-left">DETALLE</th>
            <th class="text-left">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lista_categorias" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.detalle }}</td>
            <td>
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    v-model="modals"
                  >
                    Open Dialog
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    ¿Está seguro de Eliminar la Categoria?
                  </v-card-title>
                  <v-card-text>
                    {{ item.nombre }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      ELIMINAR
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn icon @click="eliminar(index, item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import * as catService from "./../../../services/categoriaService";

export default {
  data() {
    return {
      lista_categorias: [],
      cargando: true,
      categoria: {
        nombre: "",
        detalle: "",
      },
      dialog: false,
      modals: {},
    };
  },
  async mounted() {
    let datos = await catService.listar();
    console.log(datos);
    this.lista_categorias = datos;
    this.cargando = false;
  },

  methods: {
    async guardar() {
      await catService.guardar(this.categoria);
      this.lista_categorias.push(this.categoria);
    },
    async eliminar(posicion, id) {
      if (confirm("Está seguro de eliminar la categoria?")) {
        await catService.eliminar(id);
        this.lista_categorias.splice(posicion, 1);
      }
    },
  },
};
</script>
