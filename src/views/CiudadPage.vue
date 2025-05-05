<template>
  <div class="ciudad-container">
    <Header :showSearchBar="true" @filters-updated="updateFilters" />

    <div class="ciudad-content">
      <div class="contenedor-grid">
        <h1 v-if="cityData">{{ cityData.name }}</h1>
      </div>

      <div v-if="cityData">
        <div class="contenedor-grid">
          <div class="lugares-grid">
            <LugarCard
              v-for="lugar in filteredLugares"
              :key="lugar.name"
              :image="lugar.image"
              :name="lugar.name"
              :description="lugar.description"
              :isInCarpeta="lugar.estaEnCarpeta"
              @click="abrirLugar(cityData.name, lugar.name)"
              @add-to-folder="mostrarOpcionesCarpeta(lugar)"
              @remove-from-folder="eliminarDeCarpeta(lugar)"
            />
          </div>
        </div>
      </div>
      <div v-else class="contenedor-grid">
        <p>Ciudad no encontrada.</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import LugarCard from '@/components/LugarCard.vue';
import cities from '@/data/cities.js';
import { useRoute, useRouter } from 'vue-router';
import { ref, watchEffect, computed } from 'vue';
import { slugify } from '@/utils/utils.js';
import { carpetas, agregarLugarACarpeta, eliminarLugarDeCarpeta } from '@/data/carpetas.js';

export default {
  name: 'CiudadPage',
  components: {
    Header,
    Footer,
    LugarCard,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const cityData = ref(null);
    const activeFilters = ref([]);

    watchEffect(() => {
      const { nombre } = route.params;
      cityData.value = cities[nombre] || null;
    });

    const filteredLugares = computed(() => {
      if (!cityData.value) return [];
      const lugares = cityData.value.lugaresDeInteres.map((lugar) => ({
        ...lugar,
        estaEnCarpeta: carpetas.some((carpeta) =>
          carpeta.lugares?.some((l) => l.name === lugar.name)
        ),
      }));
      if (activeFilters.value.length === 0) {
        return lugares;
      }
      return lugares.filter((lugar) =>
        activeFilters.value.some((filter) => lugar.type === filter)
      );
    });

    const updateFilters = (filters) => {
      activeFilters.value = filters;
    };

    const abrirLugar = (nombreCiudad, nombreLugar) => {
      const slugNombreCiudad = slugify(nombreCiudad);
      const slugNombreLugar = slugify(nombreLugar);
      router.push(`/ciudad/${slugNombreCiudad}/lugar/${slugNombreLugar}`);
    };

    const mostrarOpcionesCarpeta = (lugar) => {
      const carpetaId = prompt(
        'Seleccione el ID de la carpeta donde desea guardar este lugar:\n' +
          carpetas.map((c, index) => `${index + 1}. ${c.nombre}`).join('\n')
      );
      if (carpetaId) {
        const carpetaSeleccionada = carpetas[carpetaId - 1];
        if (carpetaSeleccionada) {
          if (agregarLugarACarpeta(carpetaSeleccionada.id, lugar)) {
            alert(`Lugar "${lugar.name}" agregado a la carpeta "${carpetaSeleccionada.nombre}"`);
          } else { alert('Lugar no añadido!'); }
        } else {
          alert('Carpeta no encontrada.');
        }
      }
    };

    const eliminarDeCarpeta = (lugar) => {
      carpetas.forEach((carpeta) => {
        carpeta.lugares = carpeta.lugares?.filter((l) => l.name !== lugar.name);
      });
      alert(`Lugar "${lugar.name}" eliminado de las carpetas`);
    };

    return {
      cityData,
      filteredLugares,
      updateFilters,
      abrirLugar,
      mostrarOpcionesCarpeta,
      eliminarDeCarpeta,
    };
  },
};
</script>

<style scoped>
.ciudad-container {
  width: 100%;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.ciudad-content {
  width: 100%;
  padding: 16px;
  flex: 1;
  margin-top: 72px;
  margin-bottom: 38px;
  overflow-y: auto;
  box-sizing: border-box;
  color: #434347;
}

.contenedor-grid {
  width: 75%;
  margin: 0 auto;
}

.lugares-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .lugares-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .lugares-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contenedor-grid {
    width: 90%;
  }
}

:deep(header) {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

:deep(footer) {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}

h1 {
  margin-top: 40px;
  margin-bottom: 20px;
  text-decoration: underline;
  font-weight: bold;
}
</style>

