<!-- AnimalCard.vue  -->
<template>
  <div class="animal-card" @click="$emit('click')">
    <div class="card-image">
      <img :src="animal.photoUrl || '/placeholder-animal.jpg'" :alt="`Foto de ${animal.microchip}`" />
      <span class="status-badge" :class="`status-${animal.status}`">
        {{ getStatusLabel(animal.status) }}
      </span>
    </div>
    
    <div class="card-content">
      <h4 class="h6-tipografia-govco">{{ animal.microchip }}</h4>
      
      <div class="card-details">
        <p><strong>Especie:</strong> {{ animal.species }}</p>
        <p><strong>Raza:</strong> {{ animal.breed }}</p>
        <p><strong>Color:</strong> {{ animal.color }}</p>
        <p><strong>Sexo:</strong> {{ animal.sex }}</p>
        <p><strong>Edad:</strong> {{ animal.estimatedAge }}</p>
        <p><strong>Rescate:</strong> {{ animal.rescueDate }}</p>
        <p v-if="animal.neutered"><strong>✓ Esterilizado</strong></p>
      </div>

      <button class="view-details-btn">Ver detalles completos</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  animal: Object
});

defineEmits(['click']);

function getStatusLabel(status) {
  const labels = {
    en_calle: 'En calle',
    refugio: 'En refugio',
    adoptado: 'Adoptado',
    fallecido: 'Fallecido'
  };
  return labels[status] || status;
}
</script>

<style scoped>
.animal-card {
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.animal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
}

.status-en_calle {
  background-color: #f44336;
}

.status-refugio {
  background-color: #2196F3;
}

.status-adoptado {
  background-color: #4CAF50;
}

.status-fallecido {
  background-color: #666;
}

.card-content {
  padding: 1rem;
}

.card-content h4 {
  margin: 0 0 0.75rem 0;
  color: #3366CC;
}

.card-details p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #333;
}

.view-details-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #E8F0FE;
  color: #3366CC;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-details-btn:hover {
  background: #3366CC;
  color: white;
}
</style>

