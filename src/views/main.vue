<template>
  <navbar/>
 <div class="h-screen  landing">
<div class="nfo" style="position: absolute;top: 30%; left: 5%;">
  <h1 class="w-100 text-blue">E-commerce Products</h1>
  <h2 class="w-100 mt-5 text-grey">The New Year Collection</h2>
  <p class="mt-5 text-indigo font-weight-bold">
    Our latest collection is here. Discover the latest trends and styles for the new year.
  </p>
  <v-btn class="mt-5 px-7 btn" color="orange" @click="redirectToAll()">Shop Now</v-btn>
</div>
  
 </div>
  <div class="all">    
    <h1 class="category text-center font-weight-bold text-indigo-darken-4 mt-10">Shop By Category</h1>  
      <v-row class="row">
        <v-col xl="2" lg="3" md="6" sm="6" cols="12">
          <v-card class="card d-block text-center rounded-lg" color="indigo-darken-1">
            <v-avatar class="mt-14" size="120">
              <img class="w-100" src="data:image/jpeg;base64,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" alt="">
            </v-avatar>
            <div class="description text-center mt-14">
              <span class="text-h6 text-uppercase">jewelery</span>
            </div>
            <div class="action mt-10 btn"><v-btn @click="redirectToJewellry()" variant="text" class="text-uppercase">Shop Now</v-btn></div>
          </v-card>
        </v-col>
        <v-col xl="2" lg="3" md="6" sm="6" cols="12">
          <v-card class="card d-block text-center rounded-lg" color="indigo-darken-1">
            <v-avatar class="mt-14" size="120">
              <img class="w-100" src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"/> 
                
            </v-avatar>
            <div class="description text-center mt-14">
              <span class="text-h6 text-uppercase">men's clothing</span>
            </div>
            <div class="action mt-10 btn"><v-btn @click="redirectToMen()" variant="text" class="text-uppercase">Shop Now</v-btn></div>
          </v-card>
        </v-col>
        <v-col xl="2" lg="3" md="6" sm="6" cols="12">
          <v-card class="card d-block text-center rounded-lg" color="indigo-darken-1">
            <v-avatar class="mt-14" size="120">
              <img class="w-100" src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"/>
            </v-avatar>
            <div class="description text-center mt-14">
              <span class="text-h6 text-uppercase">Women's clothing</span>
            </div>
            <div class="action mt-10"><v-btn @click="redirectToWomen()" variant="text" class="btn text-uppercase">Shop Now</v-btn></div>
          </v-card>
        </v-col>
        <v-col xl="2" lg="3" md="6" sm="6" cols="12">
          <v-card class="card d-block text-center" color="indigo-darken-1">
            <v-avatar class="mt-14" size="120">
              <img class="w-75" src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"/>
            </v-avatar>
            <div class="description text-center mt-14">
              <span class="text-h6 text-uppercase">electronics</span>
            </div>
            <div class="action mt-10"><v-btn @click="redirectToElectronics()" variant="text" class="btn text-uppercase">Shop Now</v-btn></div>
          </v-card>
        </v-col>
      </v-row>
      <FooterPage style="position: absolute;bottom: 0px;right: 0px;left: 0px;"/>
  </div>


</template>
<script setup>
import Navbar from "../components/navbar.vue";
import FooterPage from "../components/footerPage.vue";
import router from '../router/router';
import { data } from '../stores/getData';

const apiData = data();
const redirectToAll = ()=>{
  router.push({name:'products' , params:{type:'all'}});
}
const redirectToMen = ()=>{
  router.push({name:'products' , params:{type:'mens clothing'}});
}
const redirectToWomen = ()=>{
  router.push({name:'products' , params:{type:'women clothing'}});

}
const redirectToJewellry = ()=>{
  router.push({name:'products' , params:{type:'jewellry'}});

}
const redirectToElectronics = ()=>{
  router.push({name:'products' , params:{type:'electronics'}});
}
</script>

<style lang="scss" scoped>
@import url(../components/css/login-register.css);
.all{
  background-color: #f6ececcb;
  max-width: 100%;
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  z-index: 1000 !important;
  
  .card{
    width: 100% !important;
    height: fit-content !important;
    padding-bottom: 50px;
  }
  .row{
    margin-top: 5%;
    height:fit-content;
   width: 100vw;
   justify-content: space-between;
   padding: 0px  100px 0px 100px;
  }
  .btn{
    transition: 0.5s;
    &:hover{
      scale: 1.1;
    }
  }
}
.landing{
  position: relative;
  z-index: 1000;
  object-fit: cover !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position-x: right !important;
  image-rendering: crisp-edges;
 image-rendering: -moz-crisp-edges;          /* Firefox */
 image-rendering: -o-crisp-edges;            /* Opera */
 image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming)*/
 -ms-interpolation-mode: nearest-neighbor;   /* IE (non-standard property) */
  background: url(https://img.freepik.com/free-photo/collection-beauty-products-with-copy-space_23-2148620110.jpg?size=626&ext=jpg&ga=GA1.1.632798143.170553600semt=ais);


}
@media (max-width:1400px) {
  .all{
    .row{
      padding-bottom: 20% !important;
    }
  }
  
}
@media (max-width:960px) {
  .all{
    .row{
      padding-bottom: 30% !important;
    }
  }
  
}
@media (max-width:750px) {
  .all{
    .row{
      padding: 0px 50px 35% 65px !important;
    }
  }
  
}
@media (max-width:650px) {
  .all{
    .row{
      padding: 0px 10px 35%px 40px !important;
    }
  .header-info span{
    font-size: 28px !important;
  }
  }
}

@media (max-width:600px) {
  .all{
    .row{
      padding: 0px 10px 350px 40px !important;
    }
  }
}

@media (max-width:470px) {
.all{
  .header-info span{
    font-size: 5.7vw !important;
  }
}
  
}
</style>