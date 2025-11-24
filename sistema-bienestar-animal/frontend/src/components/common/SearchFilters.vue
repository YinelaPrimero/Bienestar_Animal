<!-- SearchFilters.vue - COMPONENTE NUEVO -->
<template>
  <div class="form-section">
    <h3 class="h5-tipografia-govco section-title">Criterios de búsqueda</h3>
    
    <div class="form-grid">
      <div class="entradas-de-texto-govco">
        <label for="searchMicrochip">Microchip</label>
        <input type="text" id="searchMicrochip" v-model="localFilters.microchip" placeholder="MC123456789" />
      </div>

      <div class="input-like-govco">
        <label for="searchSpecies" class="label-desplegable-govco">Especie</label>
        <div class="desplegable-govco" data-type="basic">
          <select id="searchSpecies" v-model="localFilters.species">
            <option value="">Todas</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>

      <div class="entradas-de-texto-govco">
        <label for="searchBreed">Raza</label>
        <input type="text" id="searchBreed" v-model="localFilters.breed" placeholder="Criollo, Mestizo" />
      </div>

      <div class="entradas-de-texto-govco">
        <label for="searchColor">Color</label>
        <input type="text" id="searchColor" v-model="localFilters.color" placeholder="Café, Blanco" />
      </div>

      <div class="input-like-govco">
        <label for="searchSex" class="label-desplegable-govco">Sexo</label>
        <div class="desplegable-govco" data-type="basic">
          <select id="searchSex" v-model="localFilters.sex">
            <option value="">Todos</option>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
            <option value="indeterminado">Indeterminado</option>
          </select>
        </div>
      </div>

      <div class="input-like-govco">
        <label for="searchStatus" class="label-desplegable-govco">Estado actual</label>
        <div class="desplegable-govco" data-type="basic">
          <select id="searchStatus" v-model="localFilters.status">
            <option value="">Todos</option>
            <option value="en_calle">En calle</option>
            <option value="refugio">En refugio</option>
            <option value="adoptado">Adoptado</option>
            <option value="fallecido">Fallecido</option>
          </select>
        </div>
      </div>

      <div class="entradas-de-texto-govco full-width">
        <label for="searchLocation">Ubicación aproximada</label>
        <input type="text" id="searchLocation" v-model="localFilters.location" placeholder="Ej: Comuna 15, Barrio El Refugio" />
        <span class="info-entradas-de-texto-govco">Ingrese zona, barrio o comuna</span>
      </div>

      <div class="input-like-govco">
        <div class="date-field-container">
          <label for="searchDateFrom" class="label-desplegable-govco">Fecha rescate desde</label>
          <div class="desplegable-govco desplegable-calendar-govco" data-type="calendar">
            <div class="date desplegable-selected-option">
              <input class="browser-default" type="text" id="searchDateFrom" v-model="localFilters.dateFrom" placeholder="DD/MM/AAAA" />
            </div>
          </div>
        </div>
      </div>

      <div class="input-like-govco">
        <div class="date-field-container">
          <label for="searchDateTo" class="label-desplegable-govco">Fecha rescate hasta</label>
          <div class="desplegable-govco desplegable-calendar-govco" data-type="calendar">
            <div class="date desplegable-selected-option">
              <input class="browser-default" type="text" id="searchDateTo" v-model="localFilters.dateTo" placeholder="DD/MM/AAAA" />
            </div>
          </div>
        </div>
      </div>

      <div class="checkbox-govco">
        <input type="checkbox" id="searchNeutered" v-model="localFilters.onlyNeutered" />
        <label for="searchNeutered">Solo animales esterilizados</label>
      </div>
    </div>

    <div class="form-actions">
      <button type="button" @click="$emit('clear')" class="govco-btn govco-bg-concrete">Limpiar filtros</button>
      <button type="button" @click="$emit('search')" class="govco-btn govco-bg-elf-green">Buscar</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  modelValue: Object
});

const emit = defineEmits(['update:modelValue', 'search', 'clear']);

const localFilters = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

onMounted(() => {
  if (typeof window !== 'undefined' && window.GOVCo) {
    setTimeout(() => {
      const calendars = document.querySelectorAll('[data-type="calendar"]');
      calendars.forEach(cal => window.GOVCo?.init(cal.parentElement));
    }, 100);
  }
});
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 2rem;
  row-gap: 1.5rem;
  padding: 1.5rem;
}

.full-width {
  grid-column: 1 / 4;
}

.entradas-de-texto-govco input,
.desplegable-govco select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D0D0D0;
  border-radius: 4px;
  font-size: 1rem;
  height: 44px;
  box-sizing: border-box;
}

.info-entradas-de-texto-govco {
  display: block;
  color: #666;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.checkbox-govco {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f5f7fb;
  border-radius: 6px;
}

.checkbox-govco input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #E0E0E0;
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

.govco-bg-concrete {
  background-color: #737373;
}

.govco-bg-elf-green {
  background-color: #069169;
}

.input-like-govco {
  padding: 1rem 0;
}

.date-field-container {
  width: 100%;
}

@media (max-width: 992px) {
  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .full-width {
    grid-column: 1 / 3;
  }
}

@media (max-width: 576px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .full-width {
    grid-column: 1 / 2;
  }
  .form-actions {
    flex-direction: column;
  }
  .govco-btn {
    width: 100%;
  }
}
</style>