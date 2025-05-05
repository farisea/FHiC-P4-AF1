<template>
  <div class="lugar-container">
    <Header :showSearchBar="true" class="header" />
    <div class="lugar-content">
      <div v-if="lugar" class="texto-central">
        <h1>{{ lugar.name }}</h1>

        <!-- Imagen + Descripción en fondo gris -->
        <section class="imagen-descripcion">
          <div class="imagen-columna">
            <img :src="lugar.image" :alt="lugar.name" class="image" />
          </div>
          <div class="descripcion-columna">
            <p class="description">{{ lugar.description_larga }}</p>
          </div>
        </section>

        <!-- Grid de información -->
        <section class="info-grid">
          <div>
            <div>
              <h2>
                <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Ubicación y transporte cercano
              </h2>
              <p><strong>Dirección:</strong> {{ lugar.location }}</p>
              <ul>
                <li v-for="(transport, i) in lugar.transport" :key="i">
                  {{ transport.type }}: {{ transport.line }} ({{ transport.station }})
                </li>
              </ul>
            </div>

            <div v-if="lugar.normativa">
              <h2>
                <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Normativa
              </h2>
              <p>{{ lugar.normativa }}</p>
            </div>
          </div>

          <div>
            <div>
              <h2>
                <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Horarios
              </h2>
              <p>{{ lugar.horario }}</p>
            </div>

            <div class="fila-precio">
              <h2 class="titulo-con-precio">
                <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Precio: <span class="precio-iconos">{{ lugar.price_range }}</span>
              </h2>
            </div>
          </div>
        </section>

        <section v-if="lugar.enlace" class="enlace-oficial">
          <h2>
            <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622
                       1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            Enlace oficial
          </h2>
          <a :href="lugar.enlace" target="_blank" rel="noopener noreferrer">{{ lugar.enlace }}</a>
        </section>
      </div>
      <div v-else>
        <p>Punto de interés no encontrado.</p>
      </div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import cities from '@/data/cities.js';
import { carpetas } from '@/data/carpetas.js';
import { slugify } from '@/utils/utils.js';

export default {
  name: 'LugarPage',
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    const { nombre, nombre_lugar } = route.params;

    let lugar = null;

    // 1. Buscar en cities (acceso desde CiudadPage)
    const cityData = cities[nombre];
    if (cityData) {
      lugar = cityData.lugaresDeInteres.find(
        (p) => slugify(p.name) === nombre_lugar
      );
    }

    // 2. Si no está, buscar en carpetas (acceso desde CarpetaPage)
    if (!lugar) {
      const carpeta = carpetas.find((c) => slugify(c.nombre) === nombre);
      if (carpeta) {
        for (const cityKey in cities) {
          const city = cities[cityKey];
          const lugarEncontrado = city.lugaresDeInteres.find(
            (l) => slugify(l.name) === nombre_lugar
          );
          if (lugarEncontrado) {
            lugar = lugarEncontrado;
            break;
          }
        }
      }
    }

    return {
      lugar,
    };
  },
};
</script>


<style scoped>
.lugar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.description {
  font-size: 1.2em;
  margin-bottom: 1em;
}

.image {
  max-width: 100%;
  border-radius: 8px;
  height: auto;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.imagen-descripcion {
  display: grid;
  grid-template-columns: 1fr 2fr;
  /*background-color: rgba(203, 203, 200, 0.5);*/
  background-color: rgba(48, 85, 124, 0.25); /* azul con transparencia */
  padding: 2em;
  border-radius: 8px;
  gap: 2em;
  margin-bottom: 2em;
}

.imagen-columna {
  display: flex;
  justify-content: center;
  align-items: center;
}

.descripcion-columna {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .imagen-descripcion {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .descripcion-columna {
    justify-content: center;
    margin-top: 1em;
  }
}

section {
  margin: 1.5em 0;
}

.texto-central {
  margin-left: 15%;
  margin-right: 15%;
}

@media (max-width: 768px) {
  .texto-central {
    margin-left: 5%;
    margin-right: 5%;
  }
}

h2 {
  margin-bottom: 0.3em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: #434347;
}

h1 {
  text-align: left;
  margin-bottom: 0.5em;
  margin-top: 40px;
  text-decoration: underline;
  color: #434347;
  font-weight: bold;
}

.lugar-content {
  width: 100%;
  padding: 16px 16px;
  flex: 1;
  margin-top: 72px;
  margin-bottom: 38px;
  overflow-y: auto;
  box-sizing: border-box;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

a {
  color: var(--color-azul-dark);
  text-decoration: none;
  font-weight: bold;
  color: #434347;
}
p{
  color: #434347;
}

.icon-svg {
  width: 1.3em;
  height: 1.3em;
  stroke: currentColor;
  vertical-align: middle;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3em;
  margin-top: 2em;
}

.info-grid > div > div {
  margin-bottom: 1.5em;
  color: #434347;
}

.enlace-oficial {
  margin-top: 2.5em;
}

.titulo-con-precio {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
}

.precio-iconos {
  font-weight: 400;
  font-size: 0.85em;
  color: #434347;
  margin-left: 0.3em;
  vertical-align: middle;
}


</style>
