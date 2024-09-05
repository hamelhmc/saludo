import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';
import { ref } from 'vue';

// Composable que gestiona la obtención del clima basado en el código postal
export function useWeather() {
  const postalCode = useLocalStorage('postalCode', ''); // Guardamos el código postal en el localStorage
  const greetingMessage = ref('');
  const infoMessage = ref('');
  const loading = ref(false);
  const error = ref('');

  const fetchWeather = async () => {
    try {
      if (!postalCode.value) {
        error.value = 'Por favor, introduce un código postal';
        return;
      }

      loading.value = true;
      error.value = '';

      const apiKey = import.meta.env.VITE_AEMET_API_KEY;
      const url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${postalCode.value}?api_key=${apiKey}`;

      const initialResponse = await axios.get(url);
      if (initialResponse.data.estado === 200) {
        const weatherUrl = initialResponse.data.datos;

        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data[0];

        const city = weatherData.nombre;
        const provincia = weatherData.provincia;
        const estadoCielo = weatherData.prediccion.dia[0].estadoCielo[2].descripcion;
        const temperaturaMaxima = weatherData.prediccion.dia[0].temperatura.maxima;
        const temperaturaMinima = weatherData.prediccion.dia[0].temperatura.minima;
        const emoji = getWeatherEmoji(estadoCielo);

        // Mensaje de saludo con el emoji para copiar
        greetingMessage.value = `Buenos días ${emoji}`;

        // Mensaje informativo adicional
        infoMessage.value = `En ${city}, ${provincia}, el estado del cielo es ${estadoCielo}. Temperatura máxima: ${temperaturaMaxima}°C, mínima: ${temperaturaMinima}°C.`;
      } else {
        error.value = 'No se ha podido obtener la información del clima.';
      }
    } catch (err) {
      console.error('Error al obtener los datos del clima:', err);
      error.value = 'Error al obtener los datos del clima.';
    } finally {
      loading.value = false;
    }
  };

  const getWeatherEmoji = (weatherDescription: string) => {
    if (weatherDescription.includes('soleado')) {
      return '☀️';
    } else if (weatherDescription.includes('nublado')) {
      return '☁️';
    } else if (weatherDescription.includes('lluvia')) {
      return '🌧️';
    } else if (weatherDescription.includes('tormenta')) {
      return '⛈️';
    } else if (weatherDescription.includes('nieve')) {
      return '❄️';
    } else if (weatherDescription.includes('bruma') || weatherDescription.includes('niebla')) {
      return '🌫️';
    } else if (weatherDescription.includes('calor')) {
      return '🔥';
    }
    return '🌡️';
  };

  return {
    postalCode,
    greetingMessage,
    infoMessage,
    fetchWeather,
    loading,
    error,
  };
}
