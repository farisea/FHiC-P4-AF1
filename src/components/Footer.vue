<template>
    <!-- Componente Footer vacío para delimitar por abajo -->
    <footer class="footer"></footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  /* Estilos para el footer */
  .footer {
    position: fixed;  /* Fijo para que no se mueva al hacer scroll */
    bottom: 0;  /* Lo posiciona en la parte inferior */
    left: 0;
    width: 100vw;
    height: 40px;
    background-color: #1E3D5D;
    z-index: 10;  /* Asegura que el footer esté por encima de otros elementos */
  }
  </style>
  
  