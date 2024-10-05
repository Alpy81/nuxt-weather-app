<template>
  <form @submit.prevent="handleSubmit" class="weather-form">
    <input type="text" v-model="city" placeholder="Stadt eingeben" />
    <button type="submit">Wetter abrufen</button>
  </form>

  <!-- Anzeige der Fehlermeldung -->
  <div v-if="errorMessage && city" class="error-message">
    {{ errorMessage }}
  </div>

  <!-- Anzeige der Wetterinformationen -->
  <div class="weather-info" v-if="showWeatherInfo">
    <h2>Wetter in {{ city }}</h2>
    <p>Temperatur: {{ weather.main.temp }} °C</p>
    <p>Wetter: {{ weather.weather[0].description }}</p>
    <p>Luftfeuchtigkeit: {{ weather.main.humidity }}%</p>
    <p>Windgeschwindigkeit: {{ weather.wind.speed }} m/s</p>
    <div class="weather-icon">
      <img :src="getWeatherIconSrc(weather.weather[0].main)" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useWeatherStore } from "~/store/weather";

// Pinia Store verwenden
const weatherStore = useWeatherStore();
const { city, weather, errorMessage } = storeToRefs(weatherStore);
const { fetchWeather } = weatherStore;

const buttonClicked = ref(false);
let errorTimeout;

// Funktion zum Anzeigen der Icons gemäß Wetterzustand
const getWeatherIconSrc = (weatherStatus) => {
  switch (weatherStatus) {
    case "Clouds":
      return "/assets/images/bewoelkt.png";
    case "Rain":
      return "/assets/images/regnerisch.png";
    case "Clear":
      return "/assets/images/sonnig.png";
    case "Thunderstorm":
      return "/assets/images/gewitter.png";
    case "Haze":
      return "/assets/images/dunst.png";
    default:
      return "";
  }
};

// Wiederherstellen der zuletzt gesuchten Stadt beim Laden der Seite
onMounted(() => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    city.value = lastCity;
  }
});

// Speichern der zuletzt gesuchten Stadt im localStorage
watch(city, (newCity) => {
  if (newCity) {
    localStorage.setItem("lastCity", newCity);
  } else {
    localStorage.removeItem("lastCity");
  }
});

// Überprüfen, ob die Wetterinformationen angezeigt werden sollen
const showWeatherInfo = ref(false);

// Button-Klick behandeln
const handleSubmit = async () => {
  buttonClicked.value = true;
  await fetchWeather();
  buttonClicked.value = false; // Zurücksetzen des Wertes, um den erneuten Klick zu ermöglichen
};

// Überwache die Wetterdaten und Fehlermeldung, um die Anzeige entsprechend zu steuern
watch([weather, errorMessage], ([weatherValue, errorMessageValue]) => {
  showWeatherInfo.value = !!weatherValue && !errorMessageValue && !!city.value;

  if (errorMessageValue) {
    if (errorTimeout) clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
  }
});

// Überwache das Suchfeld, um die Wetterinformationen und Fehlermeldung bei Änderung zurückzusetzen
watch(city, (newCity) => {
  if (!newCity) {
    weather.value = null;
    showWeatherInfo.value = false;
  }
  errorMessage.value = ""; // Fehlermeldung zurücksetzen, wenn das Eingabefeld verändert wird
});
</script>

<style>
.weather-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.weather-form input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  width: 200px;
  border-radius: 10px;
  border-style: none;
}

.weather-form button {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: #1485fd;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border: none;
  cursor: pointer;
}

h2 {
  color: blue;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  width: 300px;
  height: 300px;
  margin: 2rem auto;
  padding: 1rem;
  border: 0px solid;
  border-radius: 15px;
  box-shadow: 0 0 10px;
  background: transparent;
  animation: fadeIn 1s ease-in-out;
}

.weather-info p {
  margin: 0.5rem 0;
}

.weather-icon {
  font-size: 2rem;
  margin-top: 1rem;
}

.error-message {
  color: rgb(255, 30, 0);
  text-align: center;
  margin-top: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  background: #fff;
  border: 0px solid rgb(0, 183, 254);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
