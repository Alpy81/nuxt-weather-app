import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWeatherStore = defineStore('weather', () => {
  const city = ref('');
  const weather = ref(null);
  const errorMessage = ref('');

  const fetchWeather = async () => {
    errorMessage.value = '';
    weather.value = null;

    try {
      const apiKey = 'd328484df258cf95913c7e5b3b19b708';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
      );
      if (response.ok) {
        weather.value = await response.json();
      } else {
        throw new Error('Stadt nicht gefunden');
      }
    } catch (error) {
      errorMessage.value = error.message;
    }
  };

  return {
    city,
    weather,
    errorMessage,
    fetchWeather, // Hier wird fetchWeather als Methode im Store zurückgegeben
  };
});
