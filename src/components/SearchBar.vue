<template>
  <!-- Componente de barra de búsqueda para ciudades -->
  <div class="search-bar">
    <input
      type="text"
      v-model="input"
      :class="['search-input', inputSizeClass, variantClass]"
      placeholder="Search for destinations..."
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div v-if="input">
      <div
        class="item city"
        v-for="ciutat in filteredList()"
        :key="ciutat.name"
        @click="redirectToCity(ciutat.name)"
      >
        <p>{{ ciutat.name }}</p>
      </div>
      <div class="item error" v-if="!filteredList().length">
        <p>No results found!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import city from '@/data/cities.js';
import { ref } from "vue";
import { useRouter } from "vue-router"; 

const listacity = Object.values(city);
let input = ref("");
let isFocused = ref(false);
const router = useRouter();

function filteredList() {
  return listacity.filter((ciutat) =>
    ciutat.name.toLowerCase().includes(input.value.toLowerCase())
  ).slice(0, 5);
}

function redirectToCity(cityName) {
  router.push(`/ciudad/${cityName}`);
  input.value = "";
}
</script>


<script>
export default {
  name: 'SearchBar',
  props: {
    size: {
      type: String,
      default: 'large' // 'small' para header
    },
    variant: {
      type: String,
      default: 'default' // o 'header'
    }
  },
  computed: {
    inputSizeClass() {
      return this.size === 'small' ? 'input-small' : 'input-large'
    },
    variantClass() {
      return this.variant === 'header' ? 'input-header' : ''
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.search-bar > div {
  margin-top: 5px; 
}

/* Estilo base de input */
.search-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
}


.input-large {
  width: 500px;
  font-size: 16px;
  padding: 10px;
}

.input-small {
  width: 180px;
  font-size: 14px;
  padding: 6px 8px;
}

/* Estilo especial para el header */
.input-header {
  /*background-color: rgba(255, 255, 255, 0.6); /* blanco translúcido */
  background-color: rgba(30, 61, 93, 0.5); 
  color: #FFFFFF;
  font-weight: 500;
  width: 220px;
  padding: 6px 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1); 
}


.search-input::placeholder {
  color: #888;
}

body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}

input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 300px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: var(--color-beige);
  border: 1px solid var(--color-azul-light);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.city {
  background-color: var(--color-azul-light);
  cursor: pointer;
}

.error {
  background-color: var(--color-azul-light);
  color: var(--color-beige);
}
</style>

