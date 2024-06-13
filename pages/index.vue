<template>
    <div class="wetterinfo">
      <h1>Wetterinformationen</h1>
      <WeatherForm />
    </div>
  </template>
  
  <script setup>
  import WeatherForm from "~/components/WeatherForm.vue";
  </script>
  
  <style>
  body {
    background: url(../public/assets/images/weather-background.jpg);
  }
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  </style>
  