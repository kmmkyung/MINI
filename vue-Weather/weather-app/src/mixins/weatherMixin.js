import axios from "axios";

const weatherMixin = {
  data(){
    return{}
  },
  methods: {
    async getWeatherInfo(city){
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.Latitude}&lon=${city.Longitude}&appid=32f03ad021e95e44a53a6785daca8d4f`
      const res = await axios.get(url)
      const {main,wind,weather} = res.data;
      const weatherRe = {
        label:city.label,
        code:city.code,
        temperature:main.temp,
        wind:wind.speed,
        icon:`https://openweathermap.org/img/wn/${weather[0].icon}.png`
      }
      return weatherRe;
    }
  }
}

export default weatherMixin;