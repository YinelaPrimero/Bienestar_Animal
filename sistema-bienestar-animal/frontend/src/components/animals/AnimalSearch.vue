<!-- AnimalSearch.vue -->
<template>
  <section class="animal-search">
    <div class="form-header">
      <h2 class="h2-tipografia-govco">Búsqueda de animales</h2>
      <p class="text2-tipografia-govco">Use los filtros para encontrar animales registrados</p>
    </div>

    <!-- FILTROS -->
    <SearchFilters
      v-model="filters"
      @search="handleSearch"
      @clear="clearFilters"
    />

    <!-- RESULTADOS -->
    <SearchResults
      v-if="hasSearched"
      :results="filteredResults"
      :is-loading="isSearching"
      @select="selectAnimal"
    />

    <!-- MODAL DE DETALLES -->
    <AnimalDetailModal
      v-if="selectedAnimal"
      :animal="selectedAnimal"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import SearchFilters from '../common/SearchFilters.vue';
import SearchResults from '../common/SearchResults.vue';
import AnimalDetailModal from './AnimalDetail.vue';

const filters = reactive({
  microchip: '',
  species: '',
  breed: '',
  color: '',
  sex: '',
  status: '',
  location: '',
  dateFrom: '',
  dateTo: '',
  onlyNeutered: false
});

const hasSearched = ref(false);
const isSearching = ref(false);
const selectedAnimal = ref(null);
const filteredResults = ref([]);

// Datos de ejemplo
const mockAnimals = [
  {
    id: 1,
    microchip: 'MC123456789',
    species: 'perro',
    breed: 'Criollo',
    color: 'Café',
    sex: 'macho',
    estimatedAge: '2 años',
    status: 'refugio',
    rescueDate: '15/10/2024',
    coordinates: { lat: 3.4516, lng: -76.5319 },
    healthCondition: 'Buen estado general, desnutrición leve',
    neutered: true,
    neuteringDate: '20/10/2024',
    neuteringVet: 'Dra. María González',
    photoUrl: null
  },
  {
    id: 2,
    microchip: 'MC987654321',
    species: 'gato',
    breed: 'Mestizo',
    color: 'Blanco y negro',
    sex: 'hembra',
    estimatedAge: '6 meses',
    status: 'adoptado',
    rescueDate: '03/11/2024',
    coordinates: { lat: 3.4450, lng: -76.5200 },
    healthCondition: 'Excelente estado',
    neutered: true,
    neuteringDate: '10/11/2024',
    neuteringVet: 'Dr. Carlos Pérez',
    photoUrl: null
  },
  {
    id: 3,
    microchip: 'MC555666777',
    species: 'perro',
    breed: 'Pitbull',
    color: 'Atigrado',
    sex: 'hembra',
    estimatedAge: '4 años',
    status: 'en_calle',
    rescueDate: '01/11/2024',
    coordinates: { lat: 3.4600, lng: -76.5400 },
    healthCondition: 'Heridas leves, requiere atención',
    neutered: false,
    photoUrl: null
  }
];

function handleSearch() {
  isSearching.value = true;
  hasSearched.value = true;

  setTimeout(() => {
    filteredResults.value = mockAnimals.filter(animal => {
      if (filters.microchip && !animal.microchip.toLowerCase().includes(filters.microchip.toLowerCase())) return false;
      if (filters.species && animal.species !== filters.species) return false;
      if (filters.breed && !animal.breed.toLowerCase().includes(filters.breed.toLowerCase())) return false;
      if (filters.color && !animal.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
      if (filters.sex && animal.sex !== filters.sex) return false;
      if (filters.status && animal.status !== filters.status) return false;
      if (filters.onlyNeutered && !animal.neutered) return false;
      return true;
    });
    isSearching.value = false;
  }, 800);
}

function clearFilters() {
  Object.keys(filters).forEach(key => {
    filters[key] = typeof filters[key] === 'boolean' ? false : '';
  });
  hasSearched.value = false;
  filteredResults.value = [];
}

function selectAnimal(animal) {
  selectedAnimal.value = animal;
}

function closeModal() {
  selectedAnimal.value = null;
}
</script>

<style scoped>
.animal-search {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f5f7fb;
}

.form-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #3366CC;
}

@media (max-width: 576px) {
  .animal-search {
    padding: 1rem;
  }
}
</style>





