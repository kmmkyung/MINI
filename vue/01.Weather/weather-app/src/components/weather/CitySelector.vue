<template>
  <div>
    <ul class="city-selector">
      <li @click="selectCity(city)" :class="{isSelected: city.selected}" v-for="city in cities" :key="city.label">{{ city.label }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:"CitySelector",
    data(){
      return{
        cities:[
          {Latitude:37,Longitude:135,label:'Seoul',selected:false,},
          {Latitude:0,Longitude:135,label:'A',selected:false,},
          {Latitude:100,Longitude:20,label:'B',selected:false,},
          {Latitude:35,Longitude:135,label:'C',selected:false,},
          {Latitude:50,Longitude:10,label:'D',selected:false,},
          {Latitude:35,Longitude:135,label:'C',selected:false,},
          {Latitude:50,Longitude:10,label:'D',selected:false,}
        ]
      }
    },
    methods:{
      selectCity(city){
        city.selected = !city.selected; 
      }
    }
  }
</script>

<style lang="scss" scoped>
  .city-selector{
    display: grid;
    grid-template-columns: repeat(5,1fr);

    li{
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.1em solid #efefef;
      padding: 0.3em;
      cursor: pointer;

      &:hover{
        background: #fd1d1d;
        color: #ffffff;
      }
    }
  }
  .isSelected{
    background: #fd1d1d;
    color: #ffffff;
  }
</style>