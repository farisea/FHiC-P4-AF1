<template>
  <div class="ciudad-container">
    <Header :showSearchBar="true" />
    <div class="ciudad-content">
      <div class="contenedor-grid">
        <h1 v-if="carpeta">{{ carpeta.nombre }}</h1>

        <!-- Botón para alternar entre la vista original y la ruta simulada -->
        <button @click="alternarVista" class="ruta-simulada-button">
          {{ mostrandoRutaSimulada ? 'Volver a la vista original' : 'Mostrar ruta simulada' }}
        </button>
      </div>

      <!-- Mostrar la vista de la ruta simulada -->
      <div v-if="mostrandoRutaSimulada && gruposDeLugares.length">
        <div
          v-for="(grupo, index) in gruposDeLugares"
          :key="index"
          class="grupo-lugares"
        >
          <div class="contenedor-grid">
            <h2>Día {{ index + 1 }}</h2>
            <div class="lugares-grid">
              <LugarCard
                v-for="lugar in grupo"
                :key="lugar.name"
                :image="lugar.image"
                :name="lugar.name"
                :description="lugar.description"
                :isInCarpeta="true"
                @click="abrirLugar(carpeta.nombre, lugar.name)"
                @add-to-folder="mostrarOpcionesCarpeta(lugar)"
                @remove-from-folder="quitarLugarDeCarpeta(lugar)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Mostrar la vista original -->
      <div v-else-if="lugaresActualizados.length" class="grupo-lugares">
        <div class="contenedor-grid">
          <div class="lugares-grid">
            <LugarCard
              v-for="lugar in lugaresActualizados"
              :key="lugar.name"
              :image="lugar.image"
              :name="lugar.name"
              :description="lugar.description"
              :isInCarpeta="true"
              @click="abrirLugar(carpeta.nombre, lugar.name)"
              @add-to-folder="mostrarOpcionesCarpeta(lugar)"
              @remove-from-folder="quitarLugarDeCarpeta(lugar)"
            />
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay lugares -->
      <div v-else class="contenedor-grid">
        <p>No hay lugares en esta carpeta.</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import LugarCard from '@/components/LugarCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { carpetas, agregarLugarACarpeta } from '@/data/carpetas.js';
import cities from '@/data/cities.js';
import { slugify } from '@/utils/utils.js';

export default {
  name: 'CarpetaPage',
  components: {
    Header,
    Footer,
    LugarCard,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const carpeta = ref(null);
    const lugaresActualizados = ref([]);
    const gruposDeLugares = ref([]);
    const mostrandoRutaSimulada = ref(false);

    watchEffect(() => {
      const { nombre } = route.params;
      carpeta.value = carpetas.find((c) => slugify(c.nombre) === nombre) || null;

      if (carpeta.value) {
        lugaresActualizados.value = carpeta.value.lugares.map((lugar) => {
          for (const cityKey in cities) {
            const city = cities[cityKey];
            const lugarEncontrado = city.lugaresDeInteres.find((l) => l.name === lugar.name);
            if (lugarEncontrado) {
              return lugarEncontrado;
            }
          }
          return lugar;
        });
      } else {
        lugaresActualizados.value = [];
      }
    });

    const generarRutaSimulada = () => {
      gruposDeLugares.value = [];
      for (let i = 0; i < lugaresActualizados.value.length; i += 4) {
        gruposDeLugares.value.push(lugaresActualizados.value.slice(i, i + 4));
      }
    };

    const alternarVista = () => {
      if (mostrandoRutaSimulada.value) {
        mostrandoRutaSimulada.value = false;
      } else {
        generarRutaSimulada();
        mostrandoRutaSimulada.value = true;
      }
    };

    const abrirLugar = (nombreCarpeta, nombreLugar) => {
      const slugNombreCarpeta = slugify(nombreCarpeta);
      const slugNombreLugar = slugify(nombreLugar);
      router.push(`/carpeta/${slugNombreCarpeta}/lugar/${slugNombreLugar}`);
    };

    const mostrarOpcionesCarpeta = (lugar) => {
      const carpetaId = prompt(
        'Seleccione el ID de la carpeta donde desea guardar este lugar:\n' +
          carpetas.map((c, index) => `${index + 1}. ${c.nombre}`).join('\n')
      );
      if (carpetaId) {
        const carpetaSeleccionada = carpetas[carpetaId - 1];
        if (carpetaSeleccionada) {
          agregarLugarACarpeta(carpetaSeleccionada.id, lugar);
          alert(`Lugar "${lugar.name}" agregado a la carpeta "${carpetaSeleccionada.nombre}"`);
        } else {
          alert('Carpeta no encontrada.');
        }
      }
    };

    const quitarLugarDeCarpeta = (lugar) => {
      const index = carpeta.value.lugares.findIndex((l) => l.name === lugar.name);
      if (index !== -1) {
        carpeta.value.lugares.splice(index, 1);
        alert(`Lugar "${lugar.name}" eliminado de la carpeta "${carpeta.value.nombre}"`);
      }
    };

    return {
      carpeta,
      lugaresActualizados,
      gruposDeLugares,
      abrirLugar,
      mostrarOpcionesCarpeta,
      quitarLugarDeCarpeta,
      alternarVista,
      mostrandoRutaSimulada,
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

.grupo-lugares {
  margin-bottom: 48px;
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
  margin-bottom: 20px;
  margin-top: 40px;
  text-decoration: underline;
  font-weight:bold;
}

h2 {
  margin-bottom: 0.3em;
}

.ruta-simulada-button {
  background-color: var(--color-azul-dark);
  color: var(--color-beige);
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.ruta-simulada-button:hover {
  background-color: var(--color-azul-light);
}
</style>
