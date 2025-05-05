<template>
  <div class="lugar-card" @click="$emit('click')">
    <!-- Cabecera con nombre y estrella -->
    <div class="lugar-card__header">
      <h2 class="lugar-card__title">{{ name }}</h2>
      <button
        @click.stop="$emit('add-to-folder')"
        class="lugar-card__favorite"
        title="Añadir a carpeta"
      >
        {{ isInCarpeta ? '★' : '☆' }}
      </button>
    </div>

    <!-- Imagen del lugar -->
    <img :src="image" :alt="name" class="lugar-card__image" />

    <!-- Descripción -->
    <p class="lugar-card__description">{{ description }}</p>

    <!-- Botón de eliminar centrado debajo -->
    <div v-if="isInCarpeta" class="lugar-card__remove-container">
      <button
        @click.stop="$emit('remove-from-folder')"
        class="lugar-card__remove"
        title="Eliminar de carpeta"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="lugar-card__remove-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LugarCard',
  props: {
    image: String,
    name: String,
    description: String,
    isInCarpeta: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.lugar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 7px;
  background-color: rgba(48, 85, 124, 0.2); /* #30557C con transparencia 0.2 */
  color: #434347;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.lugar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.lugar-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.lugar-card__title {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
  color: #434347;
}

.lugar-card__favorite {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #434347;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 0;
}

.lugar-card__favorite:hover {
  transform: scale(1.2);
}

.lugar-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.lugar-card__description {
  font-size: 1rem;
  color: #434347;
  margin-bottom: 12px;
}

.lugar-card__remove-container {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.lugar-card__remove {
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  color: #434347;
  padding: 0;
}

.lugar-card__remove:hover {
  transform: scale(1.2);
}

.lugar-card__remove-icon {
  width: 24px;
  height: 24px;
}
</style>
