<template>
  <!-- Componente Header -->
  <header class="header">
    <div class="header-content">

      <!-- Iconos a la izquierda -->
      <div class="left-icons">

        <!-- Icono Menu Hamburguesa -->
        <button @click="openPanel('menu')" class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="icon-svg">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <!-- Icono Carpetas -->
        <button @click="openPanel('folder')" class="icon-button" aria-label="Carpeta">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="icon-svg">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44
                  -2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0
                  2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5
                  0 0 1-1.06-.44Z" />
          </svg>
        </button>

        <!-- Icono Filtro Embudo -->
        <button @click="openPanel('filters')" class="icon-button" :class="{ 'home-icon' : isntCiudad }" aria-label="Filtros">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="icon-svg">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591
                  l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0
                  -.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
        </button>

        <!-- Idioma EN/ES -->
        <button @click="changeLan" class="icon-button language-button" aria-label="Cambiar idioma">
          {{ currentLanguage }}
        </button>
      </div>

      <!-- Logo en el centro -->
      <h1 class="logo" style="cursor : pointer" @click="this.$router.push({ name: 'Home'})">SVIATJA</h1>

      <!-- SearchBar a la derecha -->
      <div v-if="showSearchBar" class="inline-search">
        <SearchBar size="small" variant="header" />
      </div>
    </div>

    <!-- SidePanel -->
    <SidePanel :visible="isPanelVisible" @close="isPanelVisible = false">

    <!-- Menú desplegable hamburguesa -->
    <template v-if="currentPanel === 'menu'">
      <div class="sidepanel-folder">

        <!-- Título del menú -->
        <div class="folder-header">
          <h3>Ciudades por continente</h3>
        </div>

        <!-- Título del continente y lista de ciudades -->
        <div v-for="(cities, continent) in groupedCities" :key="continent">
          <!-- Título del continente -->
          <h3 class="folder-subheader">{{ continent }}</h3>
          <!-- Lista de ciudades -->
          <ul class="folder-list">
            <li v-for="city in cities" :key="city.name" @click="abrirCiudad(city.name)">
              <div class="folder-item-inner">
                {{ city.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>


    <!-- Menú desplegable de filtros-->
    <template v-else-if="currentPanel === 'filters'">
    <div class="sidepanel-filters">
      <h3>Filtros</h3>
      <ul>
        <!-- Filtro de museos -->
        <li>
          <label>
            <input
              type="checkbox"
              value="museo"
              v-model="selectedFilters"
              @change="applyFilters"
            />
            Museos
          </label>
        </li>
        <!-- Filtro de monumentos -->
        <li>
          <label>
            <input
              type="checkbox"
              value="monumento"
              v-model="selectedFilters"
              @change="applyFilters"
            />
            Monumentos
          </label>
        </li>
        <!-- Filtro de parques -->
        <li>
          <label>
            <input
              type="checkbox"
              value="parque"
              v-model="selectedFilters"
              @change="applyFilters"
            />
            Parques
          </label>
        </li>
        <!-- Filtro de restaurantes -->
        <li>
          <label>
            <input
              type="checkbox"
              value="restaurante"
              v-model="selectedFilters"
              @change="applyFilters"
            />
            Restaurantes
          </label>
        </li>
      </ul>
    </div>
  </template>

  <!-- Menú desplegable de carpetas-->
  <template v-else-if="currentPanel === 'folder'">
    <div class="sidepanel-folder">

      <!-- Título de las carpetas -->
      <div class="folder-header">
        <h3>Mis carpetas</h3>
      </div>

      <!-- Lista de las carpetas -->
      <ul class="folder-list">
        <li v-for="carpeta in carpetas" :key="carpeta.id">
          <div class="folder-item-inner">
            <!-- Nombre de la carpeta -->
            <span @click="abrirCarpeta(carpeta.id)">
              {{ carpeta.nombre }}
            </span>

            <!-- Botón para eliminar la carpeta -->
            <button
              class="delete-folder-button"
              @click.stop="eliminarCarpeta(carpeta.id)"
              aria-label="Eliminar carpeta"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </button>

            <!-- Botón para renombrar de la carpeta -->
            <button
              class="rename-folder-button"
              @click.stop="renombrarCarpeta(carpeta.id)"
              aria-label="Renombrar carpeta"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>
          </div>
        </li>
      </ul>

      <!-- Botón de añadir carpetas -->
      <div class="folder-add">
        <button @click="crearCarpeta">+Añadir carpeta</button>
      </div>

    </div>
  </template>

  </SidePanel>
  </header>
</template>


<script>
// Importamos los componentes y métodos necesarios
import SearchBar from './SearchBar.vue'
import SidePanel from './SidePanel.vue'
import cities from '@/data/cities.js'
import { slugify } from '@/utils/utils.js';
import { carpetas, agregarCarpeta, eliminarCarpeta, renombrarCarpeta } from '@/data/carpetas.js';

export default {
  name: 'Header',
  components: {
    SearchBar,
    SidePanel
  },
  props: {
    showSearchBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentLanguage: 'ES',
      isPanelVisible: false,
      currentPanel: null,
      isntCiudad : this.$route.name != 'CiudadPage',
      selectedFilters: [],
    }
  },
  computed: {
    carpetas() {
      return carpetas;
    },
    groupedCities() {
      const grouped = {};

      // Agrupar las ciudades por continente
      for (const cityKey in cities) {
        const city = cities[cityKey];
        if (!grouped[city.continent]) {
          grouped[city.continent] = [];
        }
        grouped[city.continent].push(city);
      }

      // Ordenar las keys (continentes) alfabéticamente
      const sortedGrouped = Object.keys(grouped)
        .sort() // Ordenar las keys alfabéticamente
        .reduce((acc, continent) => {
          // Ordenar las ciudades dentro de cada continente alfabéticamente por nombre
          acc[continent] = grouped[continent].sort((a, b) => a.name.localeCompare(b.name));
          return acc;
        }, {});

      return sortedGrouped;
    },
  },
  methods: {
    /* Método para abrir el menú de hamburguesa, carpetas o filtros */
    openPanel(type) {
      /* Inhabilitamos el despliegue del menú filtro en la homePage */
      if (type == "filters" && this.isntCiudad) return; 

      /* Lógica para cerrar el icono tras el doble click */
      if (this.isPanelVisible && this.currentPanel == type) {
        this.currentPanel = null;
        this.isPanelVisible = false;
        return;
      }

      this.currentPanel = type
      this.isPanelVisible = true 
    },

    /* Método para cambiar el idioma */
    changeLan() {
      this.currentLanguage = this.currentLanguage === 'ES' ? 'EN' : 'ES'
    },

    /* Método para crear una nueva carpeta */
    crearCarpeta() {
      const nombre = prompt('Nombre de la nueva carpeta:');
      agregarCarpeta(nombre.substring(0, 17));
    },

    /* Método para eliminar una carpeta */
    eliminarCarpeta(carpetaId) {
      if (confirm('¿Estás seguro de que deseas eliminar esta carpeta?')) {
        eliminarCarpeta(carpetaId);
      }
    },

    /* Método para renombrar una carpeta */
    renombrarCarpeta(carpetaId) {
      const nuevaCarpeta = prompt('Nuevo nombre de la carpeta:');
      if (nuevaCarpeta) {
        renombrarCarpeta(carpetaId, nuevaCarpeta);
      }
    },

    /* Método para abrir la página de una ciudad */
    abrirCiudad(nombre) {
      this.isPanelVisible = false
      this.$router.push({ name: 'CiudadPage', params: { nombre: slugify(nombre) } })
    },

    /* Método para abrir la página de una carpeta */
    abrirCarpeta(carpetaId) {
      this.isPanelVisible = false
      const carpeta = this.carpetas.find((c) => c.id === carpetaId);
      if (carpeta) {
        this.$router.push({
          name: 'CarpetaPage',
          params: { nombre: slugify(carpeta.nombre) },
        });
      }
    },

    /* Método para aplicar los filtros seleccionados */
    applyFilters() {
      // Emitir el evento con los filtros seleccionados al componente padre
      this.$emit('filters-updated', this.selectedFilters);
    },
  }
}
</script>


<!-- Estilos para el Header -->
<style scoped>


.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
  background-color: var(--color-azul-dark);
  color: var(--color-beige);
  padding: 16px 0;
  height: 80px;
}

.header-content {
  display: flex;
  align-items: flex-start; /* Align items to the top */
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
}

.left-icons {
  display: flex;
  gap: 3px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.icon-svg {
  width: 28px;
  height: 28px;
  color: var(--color-beige);
}

.home-icon .icon-svg {
  width: 28px;
  height: 28px;
  color: var(--color-azul-light);
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  line-height: 1.4;
  text-align: center;
  color: #F6F2E7;
  top: 5px
}

.inline-search {
  width: 300px;
  position: relative; 
  top: -5px;
}

.language-button {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-beige);
  padding: 6px;
  min-width: 32px;
  text-align: center;
}

/* Estilos para el sidePanel de carpetas */
.sidepanel-folder .folder-header { /* Título del menú */
  border-bottom: 1px solid #2d4660;
  padding-bottom: 3px;
}

.folder-subheader { /* Título del continente */
  border-bottom: 1px solid #2d4660;
  padding-bottom: 3px;
  padding-top: 12px;
  margin: 0 6px; /* recorta la línea izquierda y derecha */
}

.sidepanel-folder ul.folder-list { /* Márgenes de la lista completa */
  list-style: none;
  padding-left: 0;
  margin: 6px 4px;
}

.sidepanel-folder li {  /* Borders de los ítems */
  display: block;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.folder-item-inner {
  padding: 8px 10px;
  margin: 0 6px; /* recorta la línea izquierda y derecha */
  border-bottom: 1px solid #2d4660;

  font-weight: bold;
  color: #f6f2e7;
  background: transparent;
  text-align: left;
  transition: background-color 0.3s ease;
}

.sidepanel-folder li:last-child .folder-item-inner{  /* Útlimo ítem de la lista */
  border-bottom: none;
}

.folder-item-inner:hover {  /* Hover de los ítems */
  background-color: #2d4660;
}

.sidepanel-folder .folder-add button { /* Botón para añadir carpetas */
  background: transparent;
  color: #f6f2e7;
  border: none;
  border-top: 1px solid #2d4660; /* línea azul superior */
  border-bottom: 1px solid #2d4660;
  padding: 12px 16px;
  width: 100%;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidepanel-folder button:hover {  /* Hover del botón para añadir carpetas */
  background-color: #2d4660;
}


/*Estilo para filtros */
.sidepanel-filters {
  padding: 12px;
}

.sidepanel-filters ul {
  list-style: none;
  padding-left: 0;
  margin: 10px 0 20px;
}

.sidepanel-filters li {
  padding: 12px 16px;
  border-top: 1px solid #1E3D5D;   /* azul sólido */
  font-weight: bold;
  color: #f6f2e7;
  background: transparent;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.sidepanel-filters li:hover {
  background-color: #2d4660; /* fondo azul más oscuro al pasar */
}

.sidepanel-filters label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.sidepanel-filters input[type='checkbox'] {
  margin-right: 8px; /* Add space between the checkbox and the text */
}

.delete-folder-button, .rename-folder-button {
  width: 26px;
  height: 26px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: var(--color-azul-dark);
  transition: transform 0.2s ease;
  float: right;
  border-bottom: 1px solid #2d4660;
  padding-top: 3px;
}

.delete-folder-button:hover, .rename-folder-button:hover {
  color: var(--color-beige);
}
</style>
