<!-- src/views/AnimalsView.vue -->
<template>
  <main class="animals-view">
    <h1 class="h2-tipografia-govco govcolor-blue-dark">
      Gestión de animales
    </h1>

    <p class="text2-tipografia-govco">
      Desde aquí puedes registrar un nuevo animal en el sistema.
    </p>

    <AnimalForm />
    <AnimalNeuturingForm />
    <AnimalSearch/>
  </main>
</template>

<script setup>
import AnimalForm from '../components/animals/AnimalForm.vue';
import AnimalNeuturingForm from '../components/animals/AnimalNeuturingForm.vue';
import AnimalSearch from '../components/animals/AnimalSearch.vue';
</script>

<style scoped>
.animals-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}
</style>
