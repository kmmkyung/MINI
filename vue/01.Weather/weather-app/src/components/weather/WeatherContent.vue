<template>
  <div class="weather-wrapper">
    <ContentHeader></ContentHeader>
    <CitySelector></CitySelector>
  </div>
</template>

<script>
import ContentHeader from './ContentHeader.vue';
import CitySelector from './CitySelector.vue'

  export default {
    name:"weatherContent",
    components:{
      ContentHeader,
      CitySelector
    }
  }
</script>

<style lang="scss" scoped>

</style>