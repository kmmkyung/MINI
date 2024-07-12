<template>
  <div>
    <ul class="weather-list">
      <WeatherItem v-for="weather in weatherList" :key="weather.code" :weather="weather"></WeatherItem>
    </ul>
  </div>
</template>

<script>
import WeatherItem from './WeatherItem.vue';

  export default {
    name:"WeatherList",
    components:{
      WeatherItem
    },
    props:{
      weatherList : Array
    }
  }
</script>

<style lang="scss" scoped>
.weather-list{
  display: grid;
  margin-top: 1em;
  grid-template-columns: repeat(4,1fr);
}
</style>