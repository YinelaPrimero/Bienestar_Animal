<!-- AnimalCard.vue - Con colores Gov.co oficiales -->
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
        <p v-if="animal.neutered" class="neutered-badge"><strong>✓ Esterilizado</strong></p>
      </div>

      <button class="view-details-btn govco-bg-blue-light">Ver detalles completos</button>
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
  background: linear-gradient(135deg, #3366cc 0%, #004884 100%);
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

/* Colores Gov.co para estados */
.status-en_calle {
  background-color: #A80521; /* govco-bg-shiraz - Rojo para urgencia */
}

.status-refugio {
  background-color: #FFAB00; /* govco-bg-gold - Amarillo para en proceso */
}

.status-adoptado {
  background-color: #068460; /* govco-bg-elf-green - Verde para éxito */
}

.status-fallecido {
  background-color: #4B4B4B; /* govco-bg-tundora - Gris oscuro */
}

.card-content {
  padding: 1rem;
  background: #FFFFFF; /* govco-bg-white */
}

.card-content h4 {
  margin: 0 0 0.75rem 0;
  color: #3366cc; /* govcolor-marine */
}

.card-details p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #4B4B4B; /* govcolor-tundora */
}

.neutered-badge {
  color: #068460; /* govcolor-elf-green */
  font-weight: 600;
}

.view-details-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #c9e2ff; /* govco-bg-blue-light */
  color: #004884; /* govcolor-blue-dark */
  border: 2px solid #3366cc; /* govcolor-marine */
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-details-btn:hover {
  background: #3366cc; /* govco-bg-marine */
  color: white;
  border-color: #004884;
}
</style>