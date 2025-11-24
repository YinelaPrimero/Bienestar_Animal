<template>
  <section class="animal-form">
    <div class="form-header">
      <h2 class="h2-tipografia-govco">Registro de animal</h2>
      <p class="text2-tipografia-govco">Complete los campos obligatorios (*)</p>
    </div>

    <form ref="formEl" @submit.prevent="onSubmit" novalidate>
      
      <!-- SECCIÓN 1: IDENTIFICACIÓN -->
      <div class="form-section">
        <h3 class="h5-tipografia-govco section-title">Identificación y características básicas</h3>
        
        <div class="form-grid">
          <!-- Microchip -->
          <div class="entradas-de-texto-govco">
            <label for="microchip">Microchip*</label>
            <input
              type="text"
              id="microchip"
              v-model="form.microchip"
              placeholder="MC123456789"
            />
            <span v-if="errors.microchip" class="error-text">{{ errors.microchip }}</span>
          </div>

          <!-- Especie -->
          <div class="input-like-govco">
            <label for="species" class="label-desplegable-govco">
              Especie<span aria-required="true">*</span>
            </label>
            <div class="desplegable-govco" data-type="basic" id="species-dropdown">
              <select
                id="species"
                v-model="form.species"
                aria-invalid="false"
              >
                <option disabled value="">Escoger</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <span v-if="errors.species" class="alert-desplegable-govco">{{ errors.species }}</span>
          </div>

          <!-- Raza -->
          <div class="entradas-de-texto-govco">
            <label for="breed">Raza<span aria-required="true">*</span></label>
            <input
              type="text"
              id="breed"
              v-model="form.breed"
              placeholder="Criollo, Mestizo"
            />
            <span v-if="errors.breed" class="alert-desplegable-govco">{{ errors.breed }}</span>
          </div>

          <!-- Color -->
          <div class="entradas-de-texto-govco">
            <label for="color">Color*</label>
            <input
              type="text"
              id="color"
              v-model="form.color"
              placeholder="Café, Blanco"
            />
            <span v-if="errors.color" class="error-text">{{ errors.color }}</span>
          </div>

          <!-- Sexo -->
          <div class="input-like-govco">
            <label for="sex" class="label-desplegable-govco">
              Sexo<span aria-required="true">*</span>
            </label>
            <div class="desplegable-govco" data-type="basic" id="sex-dropdown">
              <select
                id="sex"
                v-model="form.sex"
                aria-invalid="false"
              >
                <option disabled value="">Escoger</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
                <option value="indeterminado">Indeterminado</option>
              </select>
            </div>
            <span v-if="errors.sex" class="alert-desplegable-govco">{{ errors.sex }}</span>
          </div>

          <!-- Edad estimada -->
          <div class="entradas-de-texto-govco">
            <label for="age">Edad estimada*</label>
            <input
              type="text"
              id="age"
              v-model="form.estimatedAge"
              aria-describedby="age-help"
              placeholder="2 años, 6 meses"
            />
            <span id="age-help" class="info-entradas-de-texto-govco">
              Años o meses aproximados
            </span>
            <span v-if="errors.estimatedAge" class="error-text">{{ errors.estimatedAge }}</span>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: RESCATE CON MAPA -->
      <div class="form-section">
        <h3 class="h5-tipografia-govco section-title">Información de rescate</h3>
        
        <div class="form-grid">
          <!-- Estado -->
          <div class= "input-like-govco">
            <label for="status" class="label-desplegable-govco">
              Estado actual<span aria-required="true">*</span>
            </label>
            <div class="desplegable-govco" data-type="basic" id="state-dropdown">
              <select
                id="status"
                v-model="form.status"
                aria-invalid="false"
              >
                <option disabled value="">Escoger</option>
                <option value="en_calle">En calle</option>
                <option value="refugio">En refugio</option>
                <option value="adoptado">Adoptado</option>
                <option value="fallecido">Fallecido</option>
              </select>
            </div>
            <span v-if="errors.status" class="alert-desplegable-govco">{{ errors.status }}</span>
          </div>

          <!-- Fecha de rescate -->
          <div class="input-like-govco">
            <div class="date-field-container neut-date-container">
              <label for="rescueDate" class="label-desplegable-govco">
                Fecha de rescate<span aria-required="true">*</span>
              </label>
              <div class="desplegable-govco desplegable-calendar-govco" data-type="calendar">
                <div class="date desplegable-selected-option">
                  <input
                    class="browser-default"
                    type="text"
                    id="rescueDate"
                    v-model="form.rescueDate"
                    aria-autocomplete="off"
                    days="true"
                    placeholder="DD/MM/AAAA"
                  >
                </div>
              </div>
              <span v-if="errors.rescueDate" class="alert-desplegable-govco">{{ errors.rescueDate }}</span>
            </div>
          </div>

          <!-- Ubicación con mapa -->
          <div class="full-width">
            <label class="label-desplegable-govco">
              Ubicación de rescate (GPS)<span aria-required="true">*</span>
            </label>

            <div class="map-container">
              <MapSelector
                v-model="form.coordinates"
                :initial-center="{ lat: 3.4516, lng: -76.5319 }"
                :zoom="15"
              />

              <p class="map-placeholder">
                <span v-if="form.coordinates">
                  📍 Lat: {{ form.coordinates.lat.toFixed(6) }},
                  Lng: {{ form.coordinates.lng.toFixed(6) }}
                </span>
                <span v-else>
                  🗺️ Haga clic en el mapa o presione "Usar mi ubicación actual"
                </span>
              </p>
            </div>

            <span v-if="errors.coordinates" class="alert-desplegable-govco">
              {{ errors.coordinates }}
            </span>
          </div>


          <!-- Condición de salud -->
          <div class="entradas-de-texto-govco full-width">
            <label for="health">Condición de salud inicial*</label>
            <textarea
              id="health"
              v-model="form.healthCondition"
              rows="4"
              placeholder="Describa el estado de salud al momento del rescate..."
            ></textarea>
            <span v-if="errors.healthCondition" class="error-text">{{ errors.healthCondition }}</span>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: FOTOS -->
      <div class="form-section">
        <h3 class="h5-tipografia-govco section-title">Documentación fotográfica</h3>
        
        <div class="form-grid">
          <div class="container-carga-de-archivo-govco full-width">
            <div class="loader-carga-de-archivo-govco">
              <div class="all-input-carga-de-archivo-govco">
                <input
                  id="photos"
                  type="file"
                  class="input-carga-de-archivo-govco"
                  multiple
                  data-action="uploadFile"
                  data-action-delete="deleteFile"
                />

                <label for="photos" class="label-carga-de-archivo-govco">
                  Fotografías del animal*
                </label>
                <label for="photos" class="container-input-carga-de-archivo-govco">
                  <span class="button-file-carga-de-archivo-govco">Seleccionar archivos</span>
                  <span class="file-name-carga-de-archivo-govco">
                    {{ photosLabel }}
                  </span>
                </label>
                <span class="text-validation-carga-de-archivo-govco">
                  Mínimo 2 fotografías. JPG/PNG. Peso máximo: 2 MB por archivo
                </span>
              </div>

              <div class="load-button-carga-de-archivo-govco">
                <div class="load-carga-de-archivo-govco">
                  <div class="spinner-indicador-de-carga-govco" style="width: 32px; height: 32px; border-width: 6px;" role="status">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
                <button class="button-loader-carga-de-archivo-govco" type="button">
                  Cargar archivos
                </button>
              </div>
            </div>

            <div class="container-detail-carga-de-archivo-govco">
              <span
                class="alert-carga-de-archivo-govco"
                :class="{ 'visually-hidden': !errors.photos }"
              >
                {{ errors.photos }}
              </span>
              
              <div class="attached-files-carga-de-archivo-govco"></div>
            </div>
          </div>
        </div>
      </div>


      <!-- BOTONES -->
      <div class="form-actions">
        <button type="button" @click="resetForm" class="govco-btn govco-bg-concrete">
          Limpiar formulario
        </button>
        <button type="submit" class="govco-btn govco-bg-elf-green">
          Registrar animal
        </button>
      </div>
    </form>

  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import MapSelector from '../common/MapSelector.vue';


const formEl = ref(null);
const photosInput = ref(null);

const form = reactive({
  microchip: '', species: '', breed: '', color: '', sex: '', estimatedAge: '',
  status: '', rescueDate: '', coordinates: null, healthCondition: '',
  photos: []
});

const errors = reactive({
  microchip: '', species: '', breed: '', color: '', sex: '', estimatedAge: '',
  status: '', rescueDate: '', coordinates: '', healthCondition: '',
  photos: ''
});

function fixNonSubmitButtons() {
  if (!formEl.value) return;

  const buttons = formEl.value.querySelectorAll('button');

  buttons.forEach((btn) => {
    // Solo el botón "Registrar animal" debe tener type="submit"
    const isRegisterButton = btn.textContent?.includes('Registrar animal');
    
    if (isRegisterButton) {
      btn.setAttribute('type', 'submit');
    } else {
      btn.setAttribute('type', 'button');
    }
  });
  
  // Interceptar cualquier intento de submit del formulario
  if (formEl.value && !formEl.value.dataset.listenerAdded) {
    formEl.value.addEventListener('submit', (e) => {
      // Solo permitir submit si viene del botón correcto
      const submitter = e.submitter;
      if (!submitter || !submitter.textContent?.includes('Registrar animal')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);
    
    formEl.value.dataset.listenerAdded = 'true';
  }
}

function preventScrollOnInteractions() {
  // Prevenir scroll cuando se abre un dropdown/desplegable
  const handleDropdownOpen = (e) => {
    const element = e.target.closest('.desplegable-govco, [data-type="calendar"], .button-loader-carga-de-archivo-govco');
    if (element) {
      // Guardar posición actual
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      
      // Esperar a que GOV.CO abra el dropdown
      setTimeout(() => {
        // Restaurar posición
        window.scrollTo(0, scrollPos);
      }, 50);
    }
  };

  // Prevenir scroll al hacer focus en inputs de calendarios
  const handleCalendarFocus = (e) => {
    if (e.target.closest('[data-type="calendar"] input')) {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      e.preventDefault();
      setTimeout(() => {
        window.scrollTo(0, scrollPos);
      }, 10);
    }
  };

  // Agregar listeners a toda la sección del formulario
  if (formEl.value) {
    formEl.value.removeEventListener('click', handleDropdownOpen);
    formEl.value.addEventListener('click', handleDropdownOpen);
    
    formEl.value.removeEventListener('focus', handleCalendarFocus, true);
    formEl.value.addEventListener('focus', handleCalendarFocus, true);
  }

  // También prevenir scroll cuando GOV.CO modifica el scroll
  const originalScrollTo = window.scrollTo;
  window.scrollTo = function(...args) {
    // Solo prevenir scrolls a 0 que no sean intencionales
    if (args[0] === 0 && args[1] === 0) {
      console.log('GOV.CO scroll bloqueado');
      return;
    }
    return originalScrollTo.apply(window, args);
  };
}

// Funciones para el componente de carga de archivos de GOV.CO
if (typeof window !== 'undefined') {
  // Función para procesar archivos cuando se hace clic en "Cargar archivos"
  window.uploadFile = function(files) {
    return new Promise((resolve, reject) => {
      try {
        console.log('uploadFile: Procesando', files.length, 'archivos');
        
        // Filtrar archivos válidos
        const validFiles = Array.from(files).filter(file => {
          const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
          const isValidSize = file.size <= 2 * 1024 * 1024;
          return isValidType && isValidSize;
        });

        // Verificar si hay espacio
        const remainingSlots = 10 - form.photos.length;
        if (remainingSlots <= 0) {
          reject('Ya has cargado el máximo de 10 fotografías.');
          return;
        }

        if (validFiles.length === 0) {
          reject('Los archivos deben ser JPG o PNG, máximo 2MB cada uno.');
          return;
        }
        
        // Agregar hasta el límite de espacios disponibles
        const filesToAdd = validFiles.slice(0, remainingSlots);
        form.photos.push(...filesToAdd);
        errors.photos = '';
        
        console.log('uploadFile: Total de fotos ahora:', form.photos.length);
        resolve(filesToAdd);
      } catch (error) {
        console.error('Error en uploadFile:', error);
        reject('Error al procesar los archivos.');
      }
    });
  };

  // Función para eliminar un archivo
  window.deleteFile = function(file) {
    return new Promise((resolve, reject) => {
      try {
        const index = form.photos.findIndex(f => f.name === file.name && f.size === file.size);
        if (index >= 0) {
          form.photos.splice(index, 1);
          console.log('deleteFile: Archivo eliminado. Total ahora:', form.photos.length);
          resolve(true);
        } else {
          reject('Archivo no encontrado.');
        }
      } catch (error) {
        reject('Error al eliminar el archivo.');
      }
    });
  };

  // Configurar validación - se ejecutará cuando la página cargue
  window.addEventListener('load', function() {
    // Permitir máximo 10 fotos, con extensiones jpg/jpeg/png, máximo 2MB cada una
    if (window.setValidationParameters) {
      window.setValidationParameters('photos', ['jpg', 'jpeg', 'png'], 2 * 1024 * 1024, 10);
    }
  });
}

onMounted(() => {
  fixNonSubmitButtons();
  preventScrollOnInteractions();
  initializeCalendars();

  // Configurar validación del componente de carga de archivos
  if (window.setValidationParameters) {
    window.setValidationParameters(
      'photos',
      ['jpg', 'jpeg', 'png'],
      2 * 1024 * 1024, 10  // Máximo 10 archivos
    );
  }

  // Asegurar que el input de fotos no esté bloqueado
  const photosInput = document.getElementById('photos');
  if (photosInput) {
    photosInput.disabled = false;
    photosInput.classList.remove('disabled');
    photosInput.classList.add('active');
  }

  configurePhotosInput();

  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      fixNonSubmitButtons();
      preventScrollOnInteractions();
      initializeCalendars();
      
      configurePhotosInput();
      

      // Agregar listener al botón de carga para resetear el input después
      const uploadButton = document.querySelector('.button-loader-carga-de-archivo-govco');
      if (uploadButton) {
        uploadButton.addEventListener('click', () => {
          setTimeout(() => {
            configurePhotosInput();
          }, 200);
        });
      }
    });
  }
});

function initializeCalendars() {
  if (typeof window !== 'undefined' && window.GOVCo) {
    try {
      // Reinicializar todos los componentes GOV.CO en el formulario
      const calendars = formEl.value?.querySelectorAll('[data-type="calendar"]');
      if (calendars) {
        calendars.forEach((cal) => {
          // Forzar reinicialización de GOV.CO
          if (window.GOVCo.init) {
            window.GOVCo.init(cal.parentElement);
          }
        });
      }
    } catch (error) {
      console.warn('Error inicializando calendarios:', error);
    }
  }
}


const photosLabel = computed(() => 
  !form.photos.length ? 'Sin archivos seleccionados' : 
  `${form.photos.length} archivo${form.photos.length > 1 ? 's' : ''} seleccionado${form.photos.length > 1 ? 's' : ''}`
);

function formatSize(bytes) {
  return bytes < 1024*1024 ? (bytes/1024).toFixed(1) + ' KB' : (bytes/1024/1024).toFixed(1) + ' MB';
}

function onFilesSelected(e) {
  // Limpiar error previo
  errors.photos = '';
}


function validate() {
  Object.keys(errors).forEach(k => errors[k] = '');
  
  // Campos de texto - requeridos y no vacíos
  if (!form.microchip || !form.microchip.trim()) errors.microchip = 'Campo requerido';
  if (!form.breed || !form.breed.trim()) errors.breed = 'Campo requerido';
  if (!form.color || !form.color.trim()) errors.color = 'Campo requerido';
  if (!form.estimatedAge || !form.estimatedAge.trim()) errors.estimatedAge = 'Campo requerido';
  if (!form.healthCondition || !form.healthCondition.trim()) errors.healthCondition = 'Campo requerido';
  
  // Campos de selección - no deben estar vacíos
  if (!form.species || form.species === '') errors.species = 'Campo requerido';
  if (!form.sex || form.sex === '') errors.sex = 'Campo requerido';
  if (!form.status || form.status === '') errors.status = 'Campo requerido';
  
  // Fechas
  if (!form.rescueDate || form.rescueDate === '') errors.rescueDate = 'Campo requerido';
  
  // Ubicación
  if (!form.coordinates) errors.coordinates = 'Debe georeferenciar la ubicación';
  
  // Fotos - mínimo 2
  if (!form.photos || form.photos.length < 2) errors.photos = 'Mínimo 2 fotografías requeridas';
  
  return !Object.values(errors).some(e => e);
}

function resetForm() {
  Object.keys(form).forEach(k => {
    form[k] = Array.isArray(form[k]) ? [] : (typeof form[k] === 'boolean' ? false : (k === 'coordinates' ? null : ''));
  });
  Object.keys(errors).forEach(k => errors[k] = '');
}

function onSubmit() {
  if (!validate()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  console.log('Registro animal:', form);
  alert('Animal registrado exitosamente (simulación)');
}
</script>

<style scoped>
.animal-form { max-width: 1200px; margin: 0 auto; padding: 2rem; background: #f5f7fb; }
.form-header { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 3px solid #3366CC; }
.form-section { background: white; border-radius: 8px; margin-bottom: 1.5rem; overflow: visible; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.section-title { margin: 0; padding: 1rem 1.5rem; background: #E8F0FE; color: #3366CC; font-weight: 600; }
.form-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 2rem; row-gap: 1.5rem; padding: 1.5rem; }
.form-grid > div { display:flex; flex-direction: column;}
.full-width { grid-column: 1 / 4; }
.entradas-de-texto-govco, .desplegable-govco, .container-carga-de-archivo-govco { width: 100%; }
.entradas-de-texto-govco input,
.desplegable-govco select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D0D0D0;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  height: 44px;
  box-sizing: border-box;
}
.error-text, .alert-desplegable-govco { display: block; color: #b00020; font-size: 0.85rem; margin-top: 0.5rem; font-weight: 500; }
.checkbox-govco { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: #f5f7fb; border-radius: 6px; }
.checkbox-govco input { width: 20px; height: 20px; cursor: pointer; }
.checkbox-govco label { cursor: pointer; margin: 0; }
.map-container { display: flex; flex-direction: column; gap: 1rem; }
.map-display { height: 200px; background: #f5f7fb; border: 2px dashed #D0D0D0; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.map-placeholder { color: #666; text-align: center; margin: 0; }
.form-actions { display: flex; justify-content: flex-end; gap: 1rem; padding: 1.5rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.govco-btn { padding: 0.75rem 2rem; border-radius: 6px; font-weight: 600; cursor: pointer; border: none; color: white; transition: all 0.3s; }
.govco-btn:hover { transform: translateY(-2px); opacity: 0.9; }
.govco-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; border-radius: 8px; width: 90%; max-width: 800px; max-height: 90vh; overflow: hidden; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 2px solid #E0E0E0; }
.modal-header h3 { margin: 0; color: #3366CC; }
.modal-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666; width: 32px; height: 32px; }
.modal-body { padding: 1.5rem; }
.map-interactive { height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; cursor: crosshair; position: relative; display: flex; align-items: center; justify-content: center; }
.map-instruction { color: white; font-weight: 600; text-align: center; margin: 0; }
.map-coords { position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); background: white; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.modal-footer { display: flex; justify-content: flex-end; gap: 1rem; padding: 1.5rem; border-top: 2px solid #E0E0E0; }
.govco-bg-concrete {  background-color: #737373;}
:deep(.desplegable-govco .desplegable-items),
:deep(.desplegable-govco.desplegable-calendar-govco .desplegable-calendar-control) { z-index: 1500 !important;}

:deep(.desplegable-govco.desplegable-calendar-govco .desplegable-calendar-control) {
  width: 100% !important;
  max-width: 100% !important;
  max-height: 668.8px !important;
  overflow-y: auto !important;
  box-sizing: border-box !important;
  padding: 0 !important;
}

:deep(.desplegable-calendar-govco .desplegable-calendar-control .header) { width: 100% !important; box-sizing: border-box !important;}

:deep(.desplegable-calendar-govco .desplegable-calendar-control table#miCalendarioGrid.dates) {
  width: 100% !important;
  table-layout: fixed !important;
  box-sizing: border-box !important;
  padding: 0 !important;
  margin: 0 !important;  
  margin-left: -4.8 px  !important;
}

:deep(.desplegable-calendar-govco .desplegable-calendar-control table td) { box-sizing: border-box !important; width: calc(100% / 7) !important;}
.date-field-container {  width: 100%;}
.date-field-container :deep(.date.desplegable-selected-option) {padding: 7px 40px 7px 16px !important; box-sizing: border-box !important;}

.date-field-container :deep(.date.desplegable-selected-option input) {
  width: 100% !important;
  padding-right: 30px !important; /* Espacio para el ícono */
  box-sizing: border-box !important;
}

.input-like-govco { padding: 1rem 0; }
.neut-date-container .desplegable-govco {margin-top: 0.7rem; }
.container-carga-de-archivo-govco :deep(.attached-files-carga-de-archivo-govco) > *:not(.photo-item):not(.attached-file-carga-de-archivo-govco) { display: none !important;}
.container-detail-carga-de-archivo-govco {display: block !important;}
.container-carga-de-archivo-govco :deep(.attached-files-carga-de-archivo-govco) {padding-top: 0.8rem;}
.container-carga-de-archivo-govco :deep(.attached-file-carga-de-archivo-govco) { display: flex !important;}

@media (max-width: 992px) {
  .form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .full-width { grid-column: 1 / 3; }
}

@media (max-width: 576px) {
  .animal-form { padding: 1rem; }
  .form-grid { grid-template-columns: 1fr; padding: 1rem; }
  .full-width { grid-column: 1 / 2; }
  .form-actions { flex-direction: column; }
  .govco-btn { width: 100%; }
}
</style>