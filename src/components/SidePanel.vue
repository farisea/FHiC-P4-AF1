<template>
    <!-- Componente SidePanel para el menú lateral de ciudades, carpetas y filtros -->
    <div class="side-panel" v-if="visible">
      <div class="panel-content">
        <button class="close-button" @click="$emit('close')">×</button>
        <slot></slot> <!-- contenido dinámico desde el Header -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidePanel',
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .side-panel {
  position: fixed;
  top: 80px; 
  left: 0;
  width: 280px;
  height: calc(100vh - 72px); 
  background-color: rgba(30, 61, 93, 0.7); 
  color: #F6F2E7;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  transition: transform 0.3s ease;
  }


  
  .panel-content {
    padding: 20px;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
  
  /* Botón de cerrar */
  .close-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #1E3D5D;
  }
  </style>
  