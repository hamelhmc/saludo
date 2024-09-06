<template>
  <div
    class="relative flex flex-col justify-center items-center min-h-screen w-full bg-neutral-100 p-4 sm:p-6 md:p-8 overflow-hidden">
    <!-- Tarjeta con elevación estilo Material Design -->
    <div class="max-w-lg w-full">
      <div class="bg-surface shadow-lg rounded-xl p-6 md:p-8 relative z-10 flex flex-col justify-center items-center">
        <!-- Título centrado -->
        <h1 v-if="greetingMessage" class="text-display-lg font-bold text-on-surface mb-4 text-center">
          {{ greetingMessage }}
        </h1>

        <!-- Mensaje informativo -->
        <p v-if="infoMessage" class="text-body-lg text-on-surface-variant mb-4 text-center">
          {{ infoMessage }}
        </p>

        <!-- Información adicional del clima -->
        <div v-if="temperature || feelsLike || humidity || windSpeed || windDirection || uvIndex" class="mb-4 w-full">
          <!-- Usamos un grid para organizar la información de manera atractiva -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Temperatura -->
            <div v-if="temperature" class="flex items-center">
              <span class="text-xl mr-2">🌡️</span>
              <p class="text-body-lg text-on-surface-variant">{{ temperature }}</p>
            </div>

            <!-- Sensación térmica -->
            <div v-if="feelsLike" class="flex items-center">
              <span class="text-xl mr-2">🔥</span>
              <p class="text-body-lg text-on-surface-variant">{{ feelsLike }}</p>
            </div>

            <!-- Humedad -->
            <div v-if="humidity" class="flex items-center">
              <span class="text-xl mr-2">💧</span>
              <p class="text-body-lg text-on-surface-variant">{{ humidity }}</p>
            </div>

            <!-- Velocidad del viento -->
            <div v-if="windSpeed" class="flex items-center">
              <span class="text-xl mr-2">💨</span>
              <p class="text-body-lg text-on-surface-variant">{{ windSpeed }}</p>
            </div>

            <!-- Dirección del viento -->
            <div v-if="windDirection" class="flex items-center">
              <span class="text-xl mr-2">🧭</span>
              <p class="text-body-lg text-on-surface-variant">{{ windDirection }}</p>
            </div>

            <!-- Índice UV -->
            <div v-if="uvIndex" class="flex items-center">
              <span class="text-xl mr-2">🌞</span>
              <p class="text-body-lg text-on-surface-variant">{{ uvIndex }}</p>
            </div>
          </div>
        </div>

        <!-- Input del código postal con diseño M3 -->
        <div class="mb-4 w-full">
          <label for="postalCode" class="block text-label-lg font-medium text-on-surface">Código Postal</label>
          <input v-model="postalCode" type="text" id="postalCode" placeholder="Introduce el código postal"
            aria-label="Código postal"
            class="mt-1 block w-full rounded-md bg-surface-variant border-0 shadow-sm focus:ring-primary p-3" />
        </div>

        <!-- Botón con estilo Material Design 3 -->
        <button @click="fetchWeather"
          class="w-full inline-flex justify-center items-center px-4 py-2 bg-primary text-on-primary rounded-full shadow-md font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition disabled:bg-on-surface-disabled"
          :disabled="loading">
          {{ loading ? 'Cargando...' : 'Obtener Clima' }}
        </button>

        <!-- Botón "Copiar saludo" -->
        <button v-if="greetingMessage" @click="copyToClipboard"
          class="mt-4 w-full inline-flex justify-center items-center px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full shadow-md font-semibold hover:bg-secondary-container-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition"
          aria-label="Copiar saludo">
          Copiar saludo
        </button>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-error mt-3" role="alert">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeather } from '../composables/useWeather';

const {
  postalCode,
  greetingMessage,
  infoMessage,
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  windDirection,
  uvIndex,
  fetchWeather,
  loading,
  error
} = useWeather();

const copyToClipboard = () => {
  navigator.clipboard.writeText(greetingMessage.value);
  alert('Saludo copiado al portapapeles');
};
</script>

<style scoped>
/* Colores inspirados en Material Design 3 */
.bg-surface {
  background-color: #ffffff;
}

.bg-surface-variant {
  background-color: #f5f5f5;
}

.bg-primary {
  background-color: #6750a4;
}

.bg-primary-dark {
  background-color: #53388e;
}

.bg-secondary-container {
  background-color: #e8def8;
}

.bg-secondary-container-dark {
  background-color: #d0c1f7;
}

.text-on-primary {
  color: white;
}

.text-on-surface {
  color: #1c1b1f;
}

.text-on-surface-variant {
  color: #49454f;
}

.text-on-secondary-container {
  color: #1c1b1f;
}

.text-error {
  color: #b3261e;
}

/* Tipografía Material Design 3 */
.text-display-lg {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-body-lg {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-label-lg {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
