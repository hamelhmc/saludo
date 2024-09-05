const weatherEmojiMap: { [key: string]: string } = {
  despejado: '☀️',
  'despejado noche': '🌕',
  'poco nuboso': '🌤️',
  'poco nuboso noche': '🌖',
  'intervalos nubosos': '🌥️',
  'intervalos nubosos noche': '🌥️',
  'nuboso': '☁️',
  'muy nuboso': '☁️',
  cubierto: '☁️',
  'nubes altas': '🌤️',
  'nubes altas noche': '🌖',
  'intervalos nubosos con lluvia escasa': '🌦️',
  'intervalos nubosos con lluvia escasa noche': '🌦️',
  'nuboso con lluvia escasa': '🌧️',
  'nuboso con lluvia escasa noche': '🌧️',
  'cubierto con lluvia escasa': '🌧️',
  lluvia: '🌧️',
  'nuboso con lluvia': '🌧️',
  'nuboso con lluvia noche': '🌧️',
  'muy nuboso con lluvia': '🌧️',
  'muy nuboso con lluvia escasa': '🌧️',
  'cubierto con lluvia': '🌧️',
  'nuboso con nieve': '🌨️',
  'nuboso con nieve noche': '🌨️',
  'nuboso con nieve escasa': '❄️',
  'nuboso con nieve escasa noche': '❄️',
  'cubierto con nieve': '☃️',
  'intervalos nubosos con nieve': '🌨️',
  'intervalos nubosos con nieve escasa': '❄️',
  'intervalos nubosos con nieve escasa noche': '❄️',
  tormenta: '⛈️',
  'nuboso con tormenta': '⛈️',
  'nuboso con tormenta noche': '⛈️',
  'intervalos nubosos con tormenta': '🌩️',
  'intervalos nubosos con tormenta noche': '🌩️',
  'muy nuboso con tormenta': '🌩️',
  'cubierto con tormenta': '⛈️',
  'intervalos nubosos con tormenta y lluvia escasa': '🌦️',
  'intervalos nubosos con tormenta y lluvia escasa noche': '🌦️',
  'nuboso con tormenta y lluvia escasa': '🌦️',
  'nuboso con tormenta y lluvia escasa noche': '🌦️',
  niebla: '🌫️',
  bruma: '🌫️',
  calima: '🌵',
};


export const getWeatherEmoji = (weatherDescription: string): string => {
  console.log('🐛 ➜ getWeatherEmoji ➜ weatherDescription ➜', weatherDescription);

  const description = weatherDescription.toLowerCase();

  for (const key in weatherEmojiMap) {
    if (description.includes(key)) {
      return weatherEmojiMap[key];
    }
  }

  return '🌡️';
};
