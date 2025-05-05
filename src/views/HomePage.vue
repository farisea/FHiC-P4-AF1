<!-- src/views/HomePage.vue -->
<template>
  <div class="home-container">
    <Header :showSearchBar="false" />

    <div class="main-content">
      <!-- Logo centrado -->
      <img src="@/assets/logo.png" alt="Logo SVIATJA" class="logo-img" />

      <!-- Search bar centrada (tamaño grande por defecto) -->
      <SearchBar class="home-search" />

      <!-- Texto de bienvenida -->
      <p class="welcome-text">Welcome to the Home Page!</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  components: {
    Header,
    SearchBar
  }
}
</script>

<style scoped>
.home-container {
  height: 100vh;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f6f2e7;
  padding-top: 60px;
  padding-bottom: 40px;
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 20px;
  text-align: center;
  padding-top: 150px;
}

.logo-img {
  width: 500px; 
  max-width: 90%; 
  margin-bottom: 20px;
  display: block;
}

.home-search {
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 1.2rem;
  color: #1E3D5D;
}
</style>
