const weatherEmojiMap: { [key: string]: string } = {
  'soleado': '☀️', // Sunny
  despejado: '☀️', // Clear
  'mayormente despejado': '🌕', // Mostly Clear
  'parcialmente soleado': '⛅', // Partly Sunny
  'nubes intermitentes': '🌥️', // Intermittent Clouds
  'sol brumoso': '🌤️', // Hazy Sunshine
  'mayormente nublado': '☁️', // Mostly Cloudy
  nublado: '☁️', // Cloudy
  'gris (cubierto)': '☁️', // Dreary (Overcast)
  niebla: '🌫️', // Fog
  lluvias: '🌧️', // Showers
  'mayormente nublado con lluvias': '🌧️', // Mostly Cloudy Showers
  'parcialmente soleado con lluvias': '🌦️', // Partly Sunny Showers
  tormentas: '⛈️', // T-Storms
  'mayormente nublado con tormentas': '⛈️', // Mostly Cloudy T-Storms
  'parcialmente soleado con tormentas': '⛈️', // Partly Sunny T-Storms
  lluvia: '🌧️', // Rain
  'copos de nieve': '❄️', // Flurries
  'mayormente nublado con copos de nieve': '❄️', // Mostly Cloudy Flurries
  'parcialmente soleado con copos de nieve': '🌨️', // Partly Sunny Flurries
  nieve: '🌨️', // Snow
  'mayormente nublado con nieve': '🌨️', // Mostly Cloudy Snow
  hielo: '🧊', // Ice
  aguanieve: '🌨️', // Sleet
  'lluvia helada': '🌧️', // Freezing Rain
  'lluvia y nieve': '🌨️', // Rain and Snow
  calor: '🌡️', // Hot
  frío: '🥶', // Cold
  ventoso: '💨', // Windy
  'nubes y claros': '⛅', // Partly Cloudy
  'luz de luna brumosa': '🌕', // Hazy Moonlight
  'parcialmente nublado con lluvias': '🌧️', // Partly Cloudy Showers
  'parcialmente nublado con tormentas': '⛈️', // Partly Cloudy T-Storms
};

export const getWeatherEmoji = (weatherDescription: string): string => {
  console.log('🐛 ➜ getWeatherEmoji ➜ weatherDescription ➜', weatherDescription);

  const description = weatherDescription.toLowerCase();

  for (const key in weatherEmojiMap) {
    if (description.includes(key)) {
      return weatherEmojiMap[key];
    }
  }

  return '🌡️'; // Emoji predeterminado si no hay coincidencias
};

export const getWindDirection = (degrees: number): string => {
  if (degrees >= 337.5 || degrees < 22.5) return 'Norte ⬆️';
  if (degrees >= 22.5 && degrees < 67.5) return 'Noreste ↗️';
  if (degrees >= 67.5 && degrees < 112.5) return 'Este ➡️';
  if (degrees >= 112.5 && degrees < 157.5) return 'Sureste ↘️';
  if (degrees >= 157.5 && degrees < 202.5) return 'Sur ⬇️';
  if (degrees >= 202.5 && degrees < 247.5) return 'Suroeste ↙️';
  if (degrees >= 247.5 && degrees < 292.5) return 'Oeste ⬅️';
  if (degrees >= 292.5 && degrees < 337.5) return 'Noroeste ↖️';
  return 'Desconocido';
};

