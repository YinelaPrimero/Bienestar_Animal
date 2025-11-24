// Clave API de Google Maps
// IMPORTANTE: Reemplaza con tu propia API Key
const GOOGLE_MAPS_API_KEY = 'TU_API_KEY_AQUI';

let googleMapsPromise = null;

/**
 * Carga la API de Google Maps de forma dinámica
 * Solo se carga una vez, las siguientes llamadas devuelven la promesa existente
 */
export function loadGoogleMaps() {
  // Si ya se está cargando o ya se cargó, retornar la promesa existente
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // Si ya está cargado en el objeto global
  if (window.google && window.google.maps) {
    return Promise.resolve(window.google);
  }

  // Crear nueva promesa para cargar el script
  googleMapsPromise = new Promise((resolve, reject) => {
    // Crear elemento script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Callback cuando se carga exitosamente
    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error('Google Maps no se cargó correctamente'));
      }
    };

    // Callback en caso de error
    script.onerror = () => {
      reject(new Error('Error al cargar Google Maps'));
    };

    // Agregar script al documento
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

/**
 * Verifica si Google Maps ya está cargado
 */
export function isGoogleMapsLoaded() {
  return !!(window.google && window.google.maps);
}

/**
 * Geocodifica una dirección a coordenadas
 */
export async function geocodeAddress(address) {
  const google = await loadGoogleMaps();
  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
          formattedAddress: results[0].formatted_address
        });
      } else {
        reject(new Error(`Geocodificación falló: ${status}`));
      }
    });
  });
}

/**
 * Geocodifica coordenadas a dirección
 */
export async function reverseGeocode(lat, lng) {
  const google = await loadGoogleMaps();
  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        resolve({
          formattedAddress: results[0].formatted_address,
          components: results[0].address_components
        });
      } else {
        reject(new Error(`Geocodificación inversa falló: ${status}`));
      }
    });
  });
}