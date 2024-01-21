<template>
  <Navbar/>
  <div class="card">
    <div class="header w-50 d-flex justify-center pt-10" style="z-index: 1000;position: relative;">
   <h1 class="text-orange-darken-3">Card Page</h1>
</div>
<div class="w-100 text-center mt-7" style="position: relative;z-index: 1000;"><h1 class="text-error" v-if="filterArr.length == 0">No Products Added</h1></div>
<div v-if="filterArr.length > 0" class="header pb-5 w-100 d-flex justify-start" style="z-index: 1000;position: relative;">
    <v-container>
        <v-row justify="start">
        <v-col class="text-xl-center text-lg-center">
        <v-btn @click="remove_all()" variant="plain" class="text-h5 mr-8 text-error">Remove All
    <v-icon class="ml-2">mdi-delete</v-icon>
   </v-btn>
    </v-col>
    <v-col class="text-xl-start text-lg-start">
   <v-btn variant="plain" class="text-h5 text-orange">Total Price : {{ price.toFixed(2) }}</v-btn>
    </v-col>
    <v-col class="text-start">
   <v-btn @click="go_checkOut()" variant="plain" class="text-h5 text-indigo-lighten-1">checkOut</v-btn>
    </v-col>
   
    </v-row>
    
    </v-container>
    
    
</div>

   <div style="position: relative;z-index: 1000;" class="checkout">
    <div class="w-100 text-center" v-for="card , index in filterArr" :key="index"> 
    <v-row class="w-100">
        <v-container>
            <v-col class="w-100">
             <v-card class="w-100 text-start pa-10 rounded-lg" color="indigo-lighten-5">
                <div class="d-flex card_details">
                    <div class="img">
                    <img :src="card.image" class="w-25" alt="">
                    </div>
                    <div class="info">
                  <h3 class="d-block ml-5 w-100">{{ card.title  }}</h3>
                <div class="d-block ml-5 w-100 mt-5">{{ card.price }} $</div>               
                <div class="ml-5 mt-5">amount : {{ amount(card) }} {{amount(card) > 0 ?'peice' :  'peices'}}</div>
                <v-btn @click="delete_order(card,index)" color="error" class="ml-5 mt-5 btn rounded-xl">Delete Order</v-btn>
            </div>

        </div>
                  
             </v-card>

                <!--
 <span class="d-block">{{ card.title  }}</span>
    <span class="d-block">{{ card.price }}</span>
    -->
            </v-col>
        </v-container>
        
    </v-row>
       
    </div>
   </div>
  </div>
   <FooterPage/>
</template>
<script setup>
import { onBeforeMount, onUpdated, ref } from 'vue';
import Navbar from '../components/navbar.vue';
import FooterPage from '../components/footerPage.vue';
import router from '../router/router'
import { data } from '../stores/getData';
const apiData = data();
const checkOut = ref(sessionStorage.getItem('card') ?  JSON.parse(sessionStorage.getItem('card')) : []) ;
const filterArr = ref([]);
const price = ref(0);
const remove_all = ()=>{
    apiData.sharedValue +=1;
    sessionStorage.card = JSON.stringify([]);
    filterArr.value = [];
}
const go_checkOut = ()=>{
router.push({name:'checkout'})
localStorage.setItem('price' , price.value);
}
const amount = (card)=>{
return sessionStorage.getItem(`${card.id}amount`) ? sessionStorage.getItem(`${card.id}amount`) : 0 
}
const filter_card = ()=>{
for(let i = 0 ; i<checkOut.value.length ; i++){
    filterArr.value.push(checkOut.value[i].info)
}}
// avoid repeat products
const last_checkout = ()=>{
    let result = filterArr.value.filter(function({id}) {
  return !this.has(id) && this.add(id);
}, new Set)
filterArr.value = result;
console.log(filterArr.value);
}
let calc_price = ()=>{
for(let i = 0 ; i<checkOut.value.length ; i++){
    price.value += +(checkOut.value[i].info.price)
}
localStorage.setItem('price' , price.value);
}
const delete_order =(card , index)=>{
    filterArr.value.splice(index , 1)
    let arr = checkOut.value.filter((e)=>{
    return e.info.id != card.id
   });
   checkOut.value = arr;
   console.log(checkOut.value);
   sessionStorage.card = JSON.stringify(arr);
   price.value = 0;
   calc_price();
   apiData.sharedValue +=1;

}
onBeforeMount(() => {
filter_card();
last_checkout();
calc_price()
});
</script>

<style lang="scss" scoped>
@import url(../components/css/login-register.css);
.checkout{
    min-height: 100vh;
}
.card{
    max-width: 100% !important;
    overflow-x: hidden;
}
@media (max-width:700px) {
    .card_details{
        img{
            width: 50% !important;
        }
    }
    
}
@media (max-width:550px) {
    .card_details{
        img{
            width: 60% !important;
        }
    }
    
}
@media (max-width:500px) {
    .card_details{
        img{
            width: 70% !important;
        }
        h3{
            font-size: 15px !important;
        }
    }
    .btn{
        font-size: 10px !important;
    }
    
}
@media (max-width:450px) {
    .card_details{
        display: grid !important;
        grid-template-columns: auto !important;
        text-align: center !important;
        img{
            width: 70% !important;
            margin-bottom: 15px !important;
        }
        h3{
            font-size: 15px !important;
        }
    }
    .btn{
        font-size: 10px !important;
    }
    
}
@media (max-width: 391px) {
    .card{
        .header{
            width: 75% !important;
        
        }
        h1{
    position: relative;
    right: 30px;        
}

    }
}
@media (max-width: 371px) {
    .card{
        .header{
            width: 80% !important;
        
        }

    }
}
@media (max-width: 347px) {
    .card{
        .header{
            width: 85% !important;
        
        }
    
    }
}
@media (max-width: 347px) {
    .card{
        .header{
            width: 90% !important;
        
        }
        
    }
}
@media (max-width: 300px) {
    .card{
        .header{
            width: 100% !important;
        
        }
        
    }
}   
</style>