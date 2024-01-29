<template>
    <v-footer class="bg-indigo-darken-4 py-10"  style="max-width: 100% !important;overflow-x: hidden;z-index: 1000;position: relative;">
    <v-row class="row" justify="center">
      <v-col class="text-center" xl="3" lg="3" md="3" sm="6" cols="12" v-for="link in links" :key="link">
      <v-btn class="btns" variant="text">
        {{ link.title }}
        <v-icon class="ml-3">{{ link.icon }}</v-icon>
      </v-btn>
      </v-col>
      <v-col class="text-center" xl="3" lg="3" md="3" sm="6" cols="12">
      <v-btn class="btns" variant="text"> Egy-TechnoTask</v-btn>
       <v-avatar class="ml-3">
        <img src="../assets/task.png" class="w-100" alt="">
       </v-avatar>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

const links = ref([
{title:'hossamshoukry51@gmail.com' , icon:'mdi-email'},
{title:'01013157907' , icon:'mdi-phone'},
{title:'Eng.Hossam-Shoukry 2024' , icon:'mdi-copyright'},
      ])
</script>

<style lang="scss" scoped>
.row{
  padding: 0px 0px 0px 50px;
}
@media (max-width:600px) {
  .row{
    padding: 0px !important;
  }
  
}
@media (max-width:350px) {
.btns{
  font-size: 4vw !important;

}
  
}
</style>