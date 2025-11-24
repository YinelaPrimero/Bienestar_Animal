<!-- AnimalDetail.vue - Con colores Gov.co oficiales -->
<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header govco-bg-blue-light">
        <h3 class="h4-tipografia-govco govcolor-blue-dark">Detalles del animal</h3>
        <button @click="$emit('close')" class="modal-close">×</button>
      </div>

      <div class="modal-body">
        <div class="animal-details-grid">
          <div class="detail-image">
            <img :src="animal.photoUrl || '/placeholder-animal.jpg'" :alt="`Foto de ${animal.microchip}`" />
          </div>

          <div class="detail-section govco-bg-hawkes-blue">
            <h4 class="h6-tipografia-govco section-subtitle govcolor-marine">Identificación</h4>
            <dl class="detail-list">
              <dt>Microchip:</dt>
              <dd>{{ animal.microchip }}</dd>
              <dt>Especie:</dt>
              <dd>{{ animal.species }}</dd>
              <dt>Raza:</dt>
              <dd>{{ animal.breed }}</dd>
              <dt>Color:</dt>
              <dd>{{ animal.color }}</dd>
              <dt>Sexo:</dt>
              <dd>{{ animal.sex }}</dd>
              <dt>Edad estimada:</dt>
              <dd>{{ animal.estimatedAge }}</dd>
            </dl>
          </div>

          <div class="detail-section govco-bg-hawkes-blue">
            <h4 class="h6-tipografia-govco section-subtitle govcolor-marine">Rescate</h4>
            <dl class="detail-list">
              <dt>Estado actual:</dt>
              <dd>
                <span class="status-badge" :class="`status-${animal.status}`">
                  {{ getStatusLabel(animal.status) }}
                </span>
              </dd>
              <dt>Fecha de rescate:</dt>
              <dd>{{ animal.rescueDate }}</dd>
              <dt>Ubicación GPS:</dt>
              <dd>{{ formatCoordinates(animal.coordinates) }}</dd>
              <dt>Condición de salud:</dt>
              <dd>{{ animal.healthCondition }}</dd>
            </dl>
          </div>

          <div v-if="animal.neutered" class="detail-section govco-bg-hawkes-blue full-width">
            <h4 class="h6-tipografia-govco section-subtitle govcolor-elf-green">Esterilización ✓</h4>
            <dl class="detail-list">
              <dt>Fecha:</dt>
              <dd>{{ animal.neuteringDate }}</dd>
              <dt>Veterinario:</dt>
              <dd>{{ animal.neuteringVet }}</dd>
              <dt>Certificado:</dt>
              <dd><a href="#" class="certificate-link govcolor-marine">Ver certificado digital</a></dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="$emit('close')" class="govco-btn govco-bg-dim-gray">Cerrar</button>
        <button class="govco-btn govco-bg-elf-green">Editar información</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  animal: Object
});

defineEmits(['close']);

function getStatusLabel(status) {
  const labels = {
    en_calle: 'En calle',
    refugio: 'En refugio',
    adoptado: 'Adoptado',
    fallecido: 'Fallecido'
  };
  return labels[status] || status;
}

function formatCoordinates(coords) {
  if (!coords) return 'No disponible';
  return `Lat: ${coords.lat.toFixed(6)}, Lng: ${coords.lng.toFixed(6)}`;
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #3366cc; /* govcolor-marine */
}

.modal-header h3 {
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #737373; /* govcolor-dim-gray */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(0,0,0,0.1);
  color: #4B4B4B; /* govcolor-tundora */
}

.modal-body {
  padding: 1.5rem;
}

.animal-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.detail-image {
  grid-column: 1 / 3;
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(135deg, #3366cc 0%, #004884 100%);
  /* govco-bg-marine to govco-bg-blue-dark */
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-section {
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #c9e2ff; /* govco-bg-blue-light */
}

.full-width {
  grid-column: 1 / 3;
}

.section-subtitle {
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.detail-list {
  margin: 0;
}

.detail-list dt {
  font-weight: 600;
  color: #4B4B4B; /* govcolor-tundora */
  margin-top: 0.75rem;
}

.detail-list dd {
  margin: 0.25rem 0 0 0;
  color: #737373; /* govcolor-dim-gray */
}

.status-badge {
  display: inline-block;
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

.certificate-link {
  text-decoration: none;
  font-weight: 600;
}

.certificate-link:hover {
  text-decoration: underline;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 2px solid #c9e2ff; /* govco-bg-blue-light */
}

.govco-btn {
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  color: white;
  transition: all 0.3s;
}

.govco-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.govco-bg-dim-gray {
  background-color: #737373;
}

.govco-bg-elf-green {
  background-color: #068460;
}

/* Clases de color Gov.co */
.govco-bg-blue-light {
  background-color: #c9e2ff;
}

.govco-bg-hawkes-blue {
  background-color: #F6F8F9;
}

.govcolor-marine {
  color: #3366cc;
}

.govcolor-blue-dark {
  color: #004884;
}

.govcolor-elf-green {
  color: #068460;
}

.govcolor-dim-gray {
  color: #737373;
}

.govcolor-tundora {
  color: #4B4B4B;
}

@media (max-width: 992px) {
  .animal-details-grid {
    grid-template-columns: 1fr;
  }
  .detail-image,
  .full-width {
    grid-column: 1;
  }
}

@media (max-width: 576px) {
  .modal-footer {
    flex-direction: column;
  }
  .govco-btn {
    width: 100%;
  }
}
</style>