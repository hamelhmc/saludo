import { useLocalStorage, useNetwork, useTimeoutFn } from '@vueuse/core';
import axios from 'axios';
import { onMounted, reactive, toRefs } from 'vue';
import { getWeatherEmoji, getWindDirection } from '../utils/weatherEmoji';

const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY as string;
const language = 'es-ES';

export function useWeather() {
  const postalCode = useLocalStorage<string>('postalCode', ''); // LocalStorage con tipado de string
  const isOnline = useNetwork().isOnline; // Detectar si el usuario está conectado a la red

  const weatherData = reactive({
    greetingMessage: '',
    infoMessage: '',
    temperature: '',
    feelsLike: '',
    humidity: '',
    windSpeed: '',
    windDirection: '',
    uvIndex: '',
    loading: false,
    error: ''
  });

  const isValidPostalCode = (code: string): boolean => {
    const postalCodeRegex = /^[0-9]{5}$/;
    return postalCodeRegex.test(code);
  };

  const fetchLocationKey = async (code: string): Promise<{ key: string, city: string, region: string } | null> => {
    try {
      const locationUrl = `https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${code}&language=${language}`;
      const locationResponse = await axios.get(locationUrl);

      if (locationResponse.data.length === 0) {
        weatherData.error = 'No se encontró una ubicación válida para ese código postal.';
        return null;
      }

      const locationKey = locationResponse.data[0].Key;
      const city = locationResponse.data[0].LocalizedName;
      const region = locationResponse.data[0].AdministrativeArea.LocalizedName;

      return { key: locationKey, city, region };
    } catch (error) {
      weatherData.error = 'Error al obtener la clave de ubicación.';
      return null;
    }
  };

  const fetchCurrentWeather = async (locationKey: string): Promise<any> => {
    try {
      const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=${language}&details=true`;
      const weatherResponse = await axios.get(weatherUrl);

      if (weatherResponse.data.length === 0) {
        weatherData.error = 'No se pudo obtener la información del clima.';
        return null;
      }

      return weatherResponse.data[0];
    } catch (error) {
      weatherData.error = 'Error al obtener la información del clima.';
      return null;
    }
  };

  const handleWeatherResponse = (currentWeather: any, city: string, region: string): void => {
    const estadoCielo = currentWeather.WeatherText;
    const temperatura = currentWeather.Temperature.Metric.Value;
    const feelsLike = currentWeather.RealFeelTemperature.Metric.Value;
    const humidity = currentWeather.RelativeHumidity;
    const windSpeed = currentWeather.Wind.Speed.Metric.Value;
    const uvIndex = currentWeather.UVIndex;
    const emoji = getWeatherEmoji(estadoCielo);

    weatherData.greetingMessage = `Buenos días ${emoji}`;
    weatherData.infoMessage = `En ${city}, ${region}, el estado del cielo es ${estadoCielo}. Temperatura: ${temperatura}°C`;
    weatherData.temperature = `Temperatura actual: ${temperatura}°C`;
    weatherData.feelsLike = `Sensación térmica: ${feelsLike}°C`;
    weatherData.humidity = `Humedad: ${humidity}%`;
    weatherData.windSpeed = `Velocidad del viento: ${windSpeed} km/h`;
    const windDirectionDegrees = currentWeather.Wind.Direction.Degrees;
    const windDirectionCardinal = getWindDirection(windDirectionDegrees);
    weatherData.windDirection = `Dirección del viento: ${windDirectionCardinal} ${windDirectionDegrees}°`;
    weatherData.uvIndex = `Índice UV: ${uvIndex}`;
  };

  const fetchWeather = async (): Promise<void> => {
    if (!postalCode.value || !isValidPostalCode(postalCode.value)) {
      weatherData.error = 'Por favor, introduce un código postal válido de 5 dígitos';
      return;
    }

    if (!isOnline.value) {
      weatherData.error = 'Parece que estás desconectado de la red.';
      return;
    }

    weatherData.loading = true;
    weatherData.error = '';

    const locationInfo = await fetchLocationKey(postalCode.value);
    if (!locationInfo) {
      weatherData.loading = false;
      return;
    }

    const currentWeather = await fetchCurrentWeather(locationInfo.key);
    if (currentWeather) {
      handleWeatherResponse(currentWeather, locationInfo.city, locationInfo.region);
    }

    weatherData.loading = false;
  };

  useTimeoutFn(() => {
    if (weatherData.loading) {
      weatherData.loading = false;
      weatherData.error = 'La solicitud de clima ha tardado demasiado.';
    }
  }, 10000);

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
