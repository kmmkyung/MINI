<template>
	<div class="weather-wrapper">
		<ContentHeader></ContentHeader>
		<CitySelector @selectCity="selectCity"></CitySelector>
		<WeatherList :weatherList="weatherList"></WeatherList>
	</div>
</template>

<script>
import ContentHeader from './ContentHeader.vue';
import CitySelector from './CitySelector.vue';
import WeatherList from './WeatherList.vue';
import weatherMixin from '@/mixins/weatherMixin';

export default {
	name: 'weatherContent',
	components: {
		ContentHeader,
		CitySelector,
		WeatherList,
	},
	mixins: [weatherMixin],
	data() {
		return {
			weatherList: [],
		};
	},
	methods: {
		async selectCity(city) {
			if (city.selected) {
				const weather = await this.getWeatherInfo(city);
				this.weatherList.push(weather);
			} else {
				const index = this.weatherList.findIndex(
					weather => weather.label == city.label,
				);
				this.weatherList.splice(index, 1);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
