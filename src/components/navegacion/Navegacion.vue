<template>
    <div>
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
        >

        <v-list dense>
          <template v-for="item in items">
            <v-row
              v-if="item.heading"
              :key="item.heading"
              align="center"
            >
              <v-col cols="6">
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-col>
              <v-col
                cols="6"
                class="text-center"
              >
                <a
                  href="#!"
                  class="body-2 black--text"
                >EDIT</a>
              </v-col>
            </v-row>
            <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
             
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                link
                :to="child.url"
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              :key="item.text"
              link
               :to="item.url"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>



    </v-navigation-drawer>

    <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
            >

            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title
                style="width: 300px"
                class="ml-0 pl-4"
                >
                <span class="hidden-sm-and-down">ADMIN VENTAS</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            
            <v-btn icon @click="salir()">
            <v-icon>mdi-logout</v-icon>
            </v-btn>


          </v-app-bar>


    </div>

    
</template>

<script>
export default {
    data(){
        return {
            drawer: null,
            items: [
      { icon: 'mdi-contacts', text: 'Usuarios', url: '/admin/usuario' },
      { icon: 'mdi-history', text: 'Categoria', url: '/admin/categoria' },
      
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Gestión Producto',
        children: [
          { icon: 'mdi-plus', text: 'Lista Productos', url: '/admin/producto' },
          { icon: 'mdi-plus', text: 'Nuevo Producto' },
        ],
      },
      { icon: 'mdi-account', text: 'Proveedor', url: '/admin/proveedor' },
       
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Gestión Clientes',
        children: [
          { icon: 'mdi-plus', text: 'Lista Clientes' },
          { icon: 'mdi-plus', text: 'Nuevo Cliente' },
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Gestión Pedidos',
        children: [
          { icon: 'mdi-plus', text: 'Lista Pedidos' },
          { icon: 'mdi-plus', text: 'Nuevo Pedido' },
        ],
      },
     
      { icon: 'mdi-cog', text: 'Configuración' },
      
    ],
        }
    },
    methods: {
      salir(){
        localStorage.clear();
        this.$router.push("/login");
      }
    }
}
</script>