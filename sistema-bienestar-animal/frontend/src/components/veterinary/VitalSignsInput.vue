<template>
  <div class="vital-signs-grid">

    <!-- Temperatura -->
    <div class="entradas-de-texto-govco">
      <label for="temperature">Temperatura (°C)<span aria-required="true">*</span></label>
      <input
        type="number"
        id="temperature"
        v-model.number="localSigns.temperature"
        step="0.1"
        min="35"
        max="42"
        placeholder="38.5"
        @input="emitUpdate"
      />
      <span class="info-entradas-de-texto-govco">Normal: 38-39°C</span>
      <span v-if="errors?.temperature" class="error-text">{{ errors.temperature }}</span>
    </div>

    <!-- FC -->
    <div class="entradas-de-texto-govco">
      <label for="heartRate">Frecuencia cardíaca (lpm)<span aria-required="true">*</span></label>
      <input
        type="number"
        id="heartRate"
        v-model.number="localSigns.heartRate"
        min="40"
        max="200"
        placeholder="80"
        @input="emitUpdate"
      />
      <span class="info-entradas-de-texto-govco">Perro: 60-140 / Gato: 140-220</span>
      <span v-if="errors?.heartRate" class="error-text">{{ errors.heartRate }}</span>
    </div>

    <!-- FR -->
    <div class="entradas-de-texto-govco">
      <label for="respiratoryRate">Frecuencia respiratoria (rpm)<span aria-required="true">*</span></label>
      <input
        type="number"
        id="respiratoryRate"
        v-model.number="localSigns.respiratoryRate"
        min="10"
        max="60"
        placeholder="20"
        @input="emitUpdate"
      />
      <span class="info-entradas-de-texto-govco">Normal: 10-30 rpm</span>
      <span v-if="errors?.respiratoryRate" class="error-text">{{ errors.respiratoryRate }}</span>
    </div>

    <!-- Peso -->
    <div class="entradas-de-texto-govco">
      <label for="weight">Peso (kg)<span aria-required="true">*</span></label>
      <input
        type="number"
        id="weight"
        v-model.number="localSigns.weight"
        step="0.1"
        min="0.5"
        max="100"
        placeholder="15.5"
        @input="emitUpdate"
      />
      <span v-if="errors?.weight" class="error-text">{{ errors.weight }}</span>
    </div>

    <!-- Condición corporal -->
    <div class="input-like-govco">
      <label for="bodyCondition" class="label-desplegable-govco">
        Condición corporal<span aria-required="true">*</span>
      </label>
      <div class="desplegable-govco" data-type="basic" id="bodyCondition-dropdown">
        <select id="bodyCondition" v-model="localSigns.bodyCondition" aria-invalid="false">
          <option disabled value="">Evaluar</option>
          <option value="emaciado">1 - Emaciado (costillas muy visibles)</option>
          <option value="delgado">2 - Delgado (se palpan costillas fácilmente)</option>
          <option value="ideal">3 - Ideal (cintura visible, costillas palpables)</option>
          <option value="sobrepeso">4 - Sobrepeso (difícil palpar costillas)</option>
          <option value="obeso">5 - Obeso (sin cintura visible)</option>
        </select>
      </div>
      <span v-if="errors?.bodyCondition" class="alert-desplegable-govco">{{ errors.bodyCondition }}</span>
    </div>

    <!-- Mucosas -->
    <div class="input-like-govco">
      <label for="mucosa" class="label-desplegable-govco">Color de mucosas</label>
      <div class="desplegable-govco" data-type="basic" id="mucosa-dropdown">
        <select id="mucosa" v-model="localSigns.mucosa" aria-invalid="false">
          <option disabled value="">No evaluado</option>
          <option value="rosadas">Rosadas (normal)</option>
          <option value="palidas">Pálidas (posible anemia)</option>
          <option value="cianoticas">Cianóticas (falta de oxígeno)</option>
          <option value="ictericas">Ictéricas (problemas hepáticos)</option>
        </select>
      </div>
    </div>

    <!-- Hidratación -->
    <div class="input-like-govco">
      <label for="hydration" class="label-desplegable-govco">Estado de hidratación</label>
      <div class="desplegable-govco" data-type="basic" id="hydration-dropdown">
        <select id="hydration" v-model="localSigns.hydration" aria-invalid="false">
          <option disabled value="">No evaluado</option>
          <option value="normal">Normal (&lt; 2 seg)</option>
          <option value="leve">Deshidratación leve (5%)</option>
          <option value="moderada">Deshidratación moderada (7-8%)</option>
          <option value="severa">Deshidratación severa (&gt; 10%)</option>
        </select>
      </div>
      <span class="info-entradas-de-texto-govco">Evaluar mediante pliegue cutáneo</span>
    </div>

    <!-- TLLC -->
    <div class="entradas-de-texto-govco">
      <label for="tllc">TLLC - Tiempo de llenado capilar (seg)</label>
      <input
        type="number"
        id="tllc"
        v-model.number="localSigns.tllc"
        step="0.1"
        min="0"
        max="10"
        placeholder="2.0"
        @input="emitUpdate"
      />
      <span class="info-entradas-de-texto-govco">Normal: 1-2 segundos</span>
    </div>
    
  </div>
</template>

<script setup>
import { reactive, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      temperature: '',
      heartRate: '',
      respiratoryRate: '',
      weight: '',
      bodyCondition: '',
      mucosa: '',
      hydration: '',
      tllc: ''
    })
  },
  errors: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue']);

const localSigns = reactive({ ...props.modelValue });

watch(() => props.modelValue, newVal => Object.assign(localSigns, newVal), { deep: true });

function emitUpdate() {
  emit('update:modelValue', { ...localSigns });
}

// Función para prevenir scroll automático de GOV.CO
function preventScrollOnInteractions() {
  const handleDropdownOpen = (e) => {
    const element = e.target.closest('.desplegable-govco');
    if (element) {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      
      setTimeout(() => {
        window.scrollTo(0, scrollPos);
      }, 50);
    }
  };

  const vitalSignsGrid = document.querySelector('.vital-signs-grid');
  if (vitalSignsGrid) {
    vitalSignsGrid.removeEventListener('click', handleDropdownOpen);
    vitalSignsGrid.addEventListener('click', handleDropdownOpen);
  }
}

// Función para inicializar componentes GOV.CO
function initializeGovcoComponents() {
  if (typeof window === 'undefined' || !window.GOVCo) return;
  
  nextTick(() => {
    const dropdowns = document.querySelectorAll('.vital-signs-grid .desplegable-govco[data-type="basic"]');
    dropdowns.forEach(dropdown => {
      if (window.GOVCo?.init) {
        window.GOVCo.init(dropdown.parentElement);
      }
    });
    
    setTimeout(() => {
      syncDropdownValues();
      fixDropdownButtons();
    }, 200);
  });
}

// Función para asegurar que los botones de dropdown tengan type="button"
function fixDropdownButtons() {
  const dropdownButtons = document.querySelectorAll('.vital-signs-grid .desplegable-selected-option');
  dropdownButtons.forEach(button => {
    if (button.tagName === 'BUTTON' && !button.getAttribute('type')) {
      button.setAttribute('type', 'button');
    }
  });
}

// Función para configurar listeners en los dropdowns
function setupDropdownListeners() {
  const selects = ['bodyCondition', 'mucosa', 'hydration'];
  
  selects.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.addEventListener('change', (e) => {
        localSigns[id] = e.target.value;
        emitUpdate();
        console.log(`${id} changed to:`, e.target.value);
      });
    }
  });
}

// Función para sincronizar valores de dropdowns
function syncDropdownValues() {
  const bodyCondition = document.getElementById('bodyCondition');
  const mucosa = document.getElementById('mucosa');
  const hydration = document.getElementById('hydration');
  
  if (bodyCondition) localSigns.bodyCondition = bodyCondition.value;
  if (mucosa) localSigns.mucosa = mucosa.value;
  if (hydration) localSigns.hydration = hydration.value;
  
  console.log('Dropdowns sincronizados:', {
    bodyCondition: localSigns.bodyCondition,
    mucosa: localSigns.mucosa,
    hydration: localSigns.hydration
  });
}

onMounted(() => {
  preventScrollOnInteractions();
  initializeGovcoComponents();
  setupDropdownListeners();
  
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      preventScrollOnInteractions();
      initializeGovcoComponents();
      setupDropdownListeners();
    });
  }
});
</script>

<style scoped>
.vital-signs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  
  column-gap: 2rem;
  row-gap: 1.5rem;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .vital-signs-grid {
    grid-template-columns: 1fr;
  }
}

.entradas-de-texto-govco,
.input-like-govco {
  width: 100%;
}

.input-like-govco {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 18px 0;
}

.input-like-govco label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.entradas-de-texto-govco input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D0D0D0;
  border-radius: 4px;
  font-size: 1rem;
  height: 44px;
  box-sizing: border-box;
}

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

.error-text,
.alert-desplegable-govco {
  color: #d32f2f;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}

:deep(.desplegable-govco .desplegable-items) { 
  z-index: 1500 !important;
}
</style>