<!-- SearchResults.vue - COMPONENTE NUEVO -->
<template>
  <div class="form-section">
    <h3 class="h5-tipografia-govco section-title">Resultados de búsqueda ({{ results.length }})</h3>

    <div v-if="isLoading" class="search-loading">
      <div class="spinner-indicador-de-carga-govco" role="status">
        <span class="visually-hidden">Buscando...</span>
      </div>
      <p>Buscando animales...</p>
    </div>

    <div v-else-if="results.length === 0" class="no-results">
      <p class="text2-tipografia-govco">No se encontraron animales con los criterios especificados.</p>
    </div>

    <div v-else class="results-grid">
      <AnimalCard
        v-for="animal in results"
        :key="animal.id"
        :animal="animal"
        @click="$emit('select', animal)"
      />
    </div>
  </div>
</template>

<script setup>
import AnimalCard from '../animals/AnimalCard.vue';

defineProps({
  results: Array,
  isLoading: Boolean
});

defineEmits(['select']);
</script>

<style scoped>
.form-section {
  background: white;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.section-title {
  margin: 0;
  padding: 1rem 1.5rem;
  background: #E8F0FE;
  color: #3366CC;
  font-weight: 600;
}

.search-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  gap: 1rem;
}

.no-results {
  padding: 3rem;
  text-align: center;
  color: #666;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.spinner-indicador-de-carga-govco {
  width: 48px;
  height: 48px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3366CC;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}

@media (max-width: 576px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>