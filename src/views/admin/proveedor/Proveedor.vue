<template>

    <v-data-table
        :headers="cabeceras"
        :items="list_proveedores"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>PROVEEDORES</v-toolbar-title>

                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>

<v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Proveedor
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitulo }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-text-field
                      v-model="proveedor.nombre"
                      label="Nombre de Proveedor"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="proveedor.telefono"
                      label="Telefono"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="5"
                  >
                    <v-text-field
                      v-model="proveedor.correo"
                      label="Correo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="7"
                  >
                    <v-text-field
                      v-model="proveedor.direccion"
                      label="Dirección"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="cerrar"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardar"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Está seguro de eliminar el Proveedor?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


            </v-toolbar>
        </template>

        <template v-slot:[`item.acciones`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editProveedor(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="eliminarProveedor(item)"
            >
                mdi-delete
            </v-icon>
        </template>

    </v-data-table>


</template>

<script>
import * as provServicio from "./../../../services/proveedorService"
export default {
    data(){
        return {
            //formTitulo:'Nuevo Proveedor',
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            cabeceras: [
                { text: 'Nombre del Proveedor', value: 'nombre' },
                { text: 'Telefono', value: 'telefono' },
                { text: 'Correo', value: 'correo' },
                { text: 'Dirección', value: 'direccion' },
                { text: 'Acciones', value: 'acciones' },
            ],
            list_proveedores: [
                {
                    id: 1,
                    nombre: 'DELL',
                    telefono: '23423435',
                    correo: 'dell@del.com',
                    direccion: 'Av. 123 Zona abc'
                },
            ],
            proveedor:{
                nombre: '',
                telefono: '',
                correo: '',
                direccion: ''
            },
            defaultItem:{
                nombre: '',
                telefono: '',
                correo: '',
                direccion: ''
            }
        }
    },
    async mounted(){
        this.list_proveedores = await provServicio.listar();
    },
    computed:{
        formTitulo () {
            return (this.editedIndex === -1) ? 'Nuevo Proveedor' : 'Editar Proveedor'
        },

    },
    watch: {
      dialog (val) {
        val || this.cerrar()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods:{
        cerrar(){
            this.dialog = false
            this.$nextTick(() => {
                this.proveedor = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async guardar(){
            if (this.editedIndex > -1) {
                Object.assign(this.list_proveedores[this.editedIndex], this.proveedor)
            }else{
                await provServicio.guardar(this.proveedor)
                this.list_proveedores.push(this.proveedor)
            }
            this.cerrar()
        },
       editProveedor(item){
        this.editedIndex = this.list_proveedores.indexOf(item)
        this.proveedor = Object.assign({}, item)
        this.dialog = true
       },
       eliminarProveedor (item) {
        this.editedIndex = this.list_proveedores.indexOf(item)
        this.proveedor = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.list_proveedores.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.proveedor = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    }

}
</script>

<style>

</style>