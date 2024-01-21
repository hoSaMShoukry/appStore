<template>
  <Navbar/>
<div class="products">
  <h2 class="text-center my-10 text-uppercase text-indigo-darken-4 font-weight-bold">{{ apiData.dataType }} {{ apiData.dataType == 'all' ? 'categories' : 'store' }}</h2> 
  <div class="d-none">{{ apiData.filter_category }}</div>
  <div class="text-center text-h5 d-none">{{ apiData.filter_price }}</div>
  <div class="loading text-center mt-16" v-if="apiData.loading == true">
<span class="d-inline-block">
  <orbit-spinner
  :animation-duration="1200"
  :size="100"
  color="#ff1d5e"
/>
</span>
  </div>
  <v-container>
    <v-row>
    <v-col 
    :class="
    apiData.filter_category.includes(product.category) && apiData.show_all_categories == false
     ? 'd-block' 
     : apiData.filter_category.length == 0 && apiData.show_all_categories == true
     ? 'd-block' 
     :'d-none'" xl="3" lg="3" md="4" sm="6" cols="12" v-for="product in apiData.data" :key="product.id">
    <v-card class="card px-3 rounded-lg">
      <v-avatar size="100">
        <img :src="product.image" alt="" class="w-100">
      </v-avatar>
      <div class="details">
        <h3 class="text-indigo my-2">Description</h3>
        <span class="font-weight-bold">{{ product.title.slice(0,17) }}</span>
      </div>
      <h3 class="text-indigo my-2">Price</h3>
      <span class="font-weight-bold">{{ product.price }} $</span>
    <div class="card-actions d-felx w-100">
    <div class="rating mt-2" >
      <v-icon> {{product.rating.rate > 1 ? 'mdi-star' : 'mdi-star-check-outline'}}</v-icon>
      <v-icon> {{product.rating.rate > 2 ? 'mdi-star' : 'mdi-star-check-outline'}}</v-icon>
      <v-icon> {{product.rating.rate > 3 ? 'mdi-star' : 'mdi-star-check-outline'}}</v-icon>
      <v-icon> {{product.rating.rate > 4 ? 'mdi-star' : 'mdi-star-check-outline'}}</v-icon>
      <v-icon> {{product.rating.rate > 5 ? 'mdi-star' : 'mdi-star-check-outline'}}</v-icon>      
  <v-icon style="cursor: pointer;" @click="$router.push({name:'product_details' , params:{id:product.id}})" class="mr-5 ml-3 text-h5">mdi-cart-arrow-right</v-icon>
    </div>
    </div>
    </v-card>
    </v-col>
  </v-row>
</v-container>
</div>
<FooterPage/>
</template>

<script setup>
import { OrbitSpinner } from 'epic-spinners'
import { onMounted, onUnmounted, onUpdated } from 'vue';
import { data } from '../stores/getData';
import FooterPage from "../components/footerPage.vue";
import Navbar from '../components/navbar.vue';
import { useRoute } from 'vue-router';
const apiData = data();
const route = useRoute();
apiData.dataType = route.params.type;
onMounted(async() => {
  apiData.data = [];
 await apiData.getData();
  apiData.old_data = apiData.data;
});
onUpdated(() => {
  apiData.show_all_categories = apiData.filter_category.length > 0 ? false : true ;
});
onUnmounted(() => {
  apiData.filter_price = '';
  apiData.show_all_categories = true;
  apiData.filter_category = [];
});
</script>

<style lang="scss" scoped>
@import url(../components/css/login-register.css);

.products{
  position: relative;
  min-height: 100vh;
z-index: 1000 !important;
.card{
  position: relative;
  width: 100% !important;
    height: fit-content !important;
    padding-bottom: 50px !important;
    display: block;
    text-align: center;
    padding-top: 10px;
    height: 40vh !important;
    overflow: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
  }
}
@media (max-width:960px) {
  .products{
    .card{
      height: 50vh !important;
    }
  }
  
}
</style>