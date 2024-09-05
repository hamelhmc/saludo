import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';
import { onMounted, reactive, toRefs } from 'vue';
import type { InitialApiResponse, WeatherData } from '../model/WeatherData';
import { getWeatherEmoji } from '../utils/weatherEmoji';

export function useWeather() {
  const postalCode = useLocalStorage<string>('postalCode', ''); // LocalStorage con tipado de string
  const weatherData = reactive({
    greetingMessage: '',
    infoMessage: '',
    loading: false,
    error: ''
  });

  const isValidPostalCode = (code: string): boolean => {
    const postalCodeRegex = /^[0-9]{5}$/;
    return postalCodeRegex.test(code);
  };

  const fetchWeather = async (): Promise<void> => {
    try {
      if (!postalCode.value || !isValidPostalCode(postalCode.value)) {
        weatherData.error = 'Por favor, introduce un código postal válido de 5 dígitos';
        return;
      }

      weatherData.loading = true;
      weatherData.error = '';

      const apiKey = import.meta.env.VITE_AEMET_API_KEY as string;
      const url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${postalCode.value}?api_key=${apiKey}`;

      const initialResponse = await axios.get<InitialApiResponse>(url);
      if (initialResponse.data.estado === 200) {
        const weatherUrl = initialResponse.data.datos;
        const weatherResponse = await axios.get<WeatherData[]>(weatherUrl);
        const weatherDataFetched = weatherResponse.data[0];
        console.log('🐛 ➜ fetchWeather ➜ weatherData➜', weatherDataFetched);

        if (weatherDataFetched?.prediccion?.dia?.length > 0) {
          const city = weatherDataFetched.nombre;
          const provincia = weatherDataFetched.provincia;
          const estadoCielo = weatherDataFetched.prediccion.dia[0].estadoCielo.filter(estado => estado.descripcion).map(estado => estado.descripcion)[0] || 'N/A';
          const temperaturaMaxima = weatherDataFetched.prediccion.dia[0].temperatura?.maxima || 'N/A';
          const temperaturaMinima = weatherDataFetched.prediccion.dia[0].temperatura?.minima || 'N/A';
          const emoji = getWeatherEmoji(estadoCielo);

          weatherData.greetingMessage = `Buenos días ${emoji}`;
          weatherData.infoMessage = `En ${city}, ${provincia}, el estado del cielo es ${estadoCielo}. Temperatura máxima: ${temperaturaMaxima}°C, mínima: ${temperaturaMinima}°C.`;
        } else {
          weatherData.error = 'No se pudo obtener la información del clima: datos incompletos.';
        }
      } else {
        weatherData.error = 'No se ha podido obtener la información del clima.';
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        weatherData.error = `Error de red: ${err.message}`;
      } else {
        weatherData.error = 'Ocurrió un error inesperado.';
      }
    } finally {
      weatherData.loading = false;
    }
  };

  onMounted((): void => {
    if (postalCode.value && isValidPostalCode(postalCode.value)) {
      fetchWeather();
    }
  });

  return {
    postalCode,
    weatherData,
    fetchWeather,
    ...toRefs(weatherData)
  };
}
