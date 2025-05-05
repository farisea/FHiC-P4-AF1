<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #F6F2E7;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #1E3D5D;
}


html, body {
  height: 100%;
  overflow: hidden; /* evita scroll vertical */
}

</style>

