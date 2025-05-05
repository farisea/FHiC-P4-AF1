<!-- src/views/RecommendationPage.vue -->
<template>
    <div class="recommendation-container">
      <Header :showSearchBar="true" />
    
      <div class="recommendation-content">
        <!-- parte del contenido -->
      </div>
    
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  
  export default {
    components: {
      Header,
      Footer
    }
  }
  </script>
  
  <style scoped>
  .recommendation-container {
    background-color: #f6f2e7; /* Beige */
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  
  .recommendation-content {
    flex: 1;
    overflow-y: auto;
    padding: 100px 20px 60px;
    box-sizing: border-box;
  }
  
  /* Header y Footer fijos */
  ::v-deep header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
  
  ::v-deep footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1000;
  }
  </style>
  
  