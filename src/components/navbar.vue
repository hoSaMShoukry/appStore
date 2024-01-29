<template>
  <div class="header">
    <div class="d-none">{{apiData.sharedValue  }}</div>
    <v-app-bar color="indigo-darken-4" height="90">
        <v-btn @click="$router.push('/')" style="font-size: 16px;">main
          <v-icon class="pl-3">mdi-home</v-icon>
        </v-btn>
        <v-avatar class="ml-3" width="300">
          <img class="w-100" src="../assets/task.PNG" alt="">
        </v-avatar>
        <v-spacer></v-spacer>
        <span class="mr-5 card-icon" @click="$router.push('/card')">
          <span class="text-red font-weight-bold mr-1">{{ cardCount.length }}</span>
          <v-icon style="cursor: pointer;">mdi-cart-arrow-right</v-icon>
        </span>
        <v-menu>
      <template v-slot:activator="{ props }">
        <v-icon
        class="d-none responsive_icon mr-3" 
          style="font-size: 30px;"
          color="white"
          v-bind="props"
        >
        mdi-menu-down
        </v-icon>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-icon @click="redirectToAll()" style="cursor: pointer;" class="mr-0" 
            :class="$route.path =='/products/all' 
        || $route.path == '/products/jewellry'
        || $route.path == '/products/mens%20clothing' 
        || $route.path == '/products/women%20clothing' 
        || $route.path == '/products/electronics'
        ?   'd-none' : ''"
            >mdi-store</v-icon>
          </v-list-item-title>
          <v-list-item-title>
            <v-icon
        v-if="$route.path == '/products/all'  
        || $route.path == '/products/jewellry'
        || $route.path == '/products/mens%20clothing' 
        || $route.path == '/products/women%20clothing' 
        || $route.path == '/products/electronics'
        "
        style="z-index: 999;" @click="drawer = !drawer">mdi-filter</v-icon>
          </v-list-item-title>
          <v-list-item-title class="mt-3">
            <v-icon style="cursor: pointer;" @click="$router.push('/card')">mdi-cart-arrow-right</v-icon>
            <span class="text-red font-weight-bold mr-1">{{ cardCount.length }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
        <v-icon @click="redirectToAll()" style="cursor: pointer;" class="mr-0 store-icon" 
        :class="$route.path =='/products/all' 
        || $route.path == '/products/jewellry'
        || $route.path == '/products/mens%20clothing' 
        || $route.path == '/products/women%20clothing' 
        || $route.path == '/products/electronics'
        ?   'd-none' : ''"
        >mdi-store</v-icon>

        <v-icon
        class="filter-icon"
        v-if="$route.path == '/products/all'  
        || $route.path == '/products/jewellry'
        || $route.path == '/products/mens%20clothing' 
        || $route.path == '/products/women%20clothing' 
        || $route.path == '/products/electronics'
        "
        style="z-index: 999;" @click="drawer = !drawer">mdi-filter</v-icon>
        <v-btn v-if="loginAuth.isloggedIn == false" @click="$router.push('/login')" style="font-size: 16px;" class="mr-5">login
        <v-icon class="ml-2">mdi-login</v-icon>
        
        </v-btn>
        <v-btn  v-if="loginAuth.isloggedIn == true" @click="loginAuth.handleSignOut()" style="font-size: 16px;" class="mr-5">logout
        
          <v-icon class="ml-2">mdi-login</v-icon>
        </v-btn> 
        
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" location="left" temporary>
       <v-list class="mt-10">
        <v-list-item>
          <v-avatar size="60">
            <img src="../assets/task.PNG" alt="" class="w-100">
          </v-avatar>
          <span class="font-weight-bold text-indigo-darken-4 pl-3">Egy-Techno Task</span>
        </v-list-item>
       </v-list>
       <v-list v-if="$route.path == '/products/all'">
        <v-list-item>
          <v-icon class="text-indigo-darken-4 font-weight-bold">mdi-filter</v-icon>
          <span class="text-indigo-darken-4 font-weight-bold ml-2">Fiter Of Category</span>
        </v-list-item>
        <v-list-item>
          <v-checkbox value="jewelery" v-model="apiData.filter_category" color="indigo" label="JEWELERY"></v-checkbox>
          <v-checkbox value="men's clothing" v-model="apiData.filter_category" class="mt-n7" color="success" label="MEN'S CLOTHING"></v-checkbox>
          <v-checkbox value="women's clothing" v-model="apiData.filter_category" class="mt-n7" color="orange" label="WOMEN'S CLOTHING"></v-checkbox>
          <v-checkbox value="electronics" v-model="apiData.filter_category" class="mt-n7" color="error" label="ELECTRONICS"></v-checkbox>
        </v-list-item>
       </v-list>
       <v-list :class="$route.fullPath != '/products/all' ? 'mt-5'  :''">
        <v-list-item>
          <v-icon class="text-indigo-darken-4 font-weight-bold">mdi-filter</v-icon>
          <span class="text-indigo-darken-4 font-weight-bold ml-2"> Fiter Of price</span>
        </v-list-item>
        <v-list-item>
          <v-checkbox @click="apiData.filterOnPrice()" v-model="apiData.filter_price" value="50"  color="indigo" label="50$ and less"></v-checkbox>
          <v-checkbox @click="apiData.filterOnPrice()" v-model="apiData.filter_price" value="150"  class="mt-n7" color="success" label="150$ and less"></v-checkbox>
          <v-checkbox @click="apiData.filterOnPrice()" v-model="apiData.filter_price" value="300"  class="mt-n7" color="orange" label="300$ and less"></v-checkbox>
          <v-checkbox @click="apiData.filterOnPrice()" v-model="apiData.filter_price" value="999"  class="mt-n7" color="error" label="999$ and less"></v-checkbox>
        </v-list-item>
       </v-list>
      </v-navigation-drawer>

  </div>
    
</template>

<script setup>
import {  onUpdated, ref } from 'vue';
import { data } from '../stores/getData';
import { auth } from '../router/loginAuth';
import router from '../router/router';
const loginAuth = auth();
const redirectToAll = ()=>{
  router.push({name:'products' , params:{type:'all'}});
}
const cardCount = ref(sessionStorage.getItem('card') ?  JSON.parse(sessionStorage.getItem('card')) : [])
const drawer = ref(false);
const apiData = data();
onUpdated(() => {
  loginAuth.logOut();
  cardCount.value = sessionStorage.getItem('card') ?  JSON.parse(sessionStorage.getItem('card')) : [];
});
</script>


<style lang="scss" scoped>
@media (max-width:420px) {
  .filter-icon , .store-icon , .card-icon{
    display: none;
  }
  .responsive_icon{
    display: flex !important;
  }
  
}
@media (max-width:400px) {
  
  .responsive_icon{
   position: relative;
   right: -20px;
  }
  
}


</style>