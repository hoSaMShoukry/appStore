<template>
    <navbar/>
    <div class="product_details mt-16">
<v-row justify="center" class="row">
    <v-col xl="6" lg="6" md="6" sm="6" cols="10" class="text-center col">
        <img :src="apiData.one_product.image" alt="" class="w-50">
    </v-col>
    <v-col class="d-flex justify-center col" xl="6" lg="6" md="6" sm="6" cols="10">
        <v-card  variant="tonal" class="rounded-lg pb-10 card" color="indigo-darken-4" style="width: 90%;height: 100%;">
        <div class="text-start">
            <h1 class="text-uppercase pl-16 my-5">title</h1>
            <p class="pl-16 mt-5 text-black ">{{ apiData.one_product.title }}</p>
           <hr class="my-6">
           <h2 class="text-uppercase pl-16 my-5">price</h2>
           <p class="pl-16 mt-5 text-black ">{{ apiData.one_product.price }}</p>
           <h2 class="text-uppercase pl-16 my-5">description</h2>
           <p class="pl-16 mt-5 text-black pr-5">{{ apiData.one_product.description }}</p>
           <h2 class="text-uppercase pl-16 my-5">category</h2>
           <p class="pl-16 mt-5 text-black pr-5">{{ apiData.one_product.category }}</p>
           <h2 class="text-uppercase pl-16 my-5">Avilable</h2>
           <p class="pl-16 mt-5 text-black pr-5">{{ apiData.one_product.rating ?  apiData.one_product.rating.count : 10 }} peice</p>
        </div>
        <hr class="my-6">
        <div class="actions" v-if="apiData.one_product">
            <v-btn @click="add_to_card(), $router.push('/card')"  class=" mt-2 mr-5 d-inline-block">add to card</v-btn>
            <v-form class="w-25 d-inline-block">
                <v-select v-model="count" class="w-100" :items="[1,2,3,4]" density="compact" label="Count"></v-select>
            </v-form>
        </div>
        </v-card>
    </v-col>
</v-row>
    </div>
    <footerPage/>
</template>

<script setup>
import navbar from '../components/navbar.vue'
import footerPage from '../components/footerPage.vue'
import { onMounted, onUnmounted, ref } from 'vue';
import {data} from '../stores/getData';
import { useRoute } from 'vue-router';
const apiData = data();   
const route = useRoute(); 
const count = ref(1);
const amount = ref([])
const card = ref(sessionStorage.getItem('card') ? JSON.parse(sessionStorage.getItem('card')) : []);
const add_to_card =async ()=>{
const obj = {
    info:apiData.one_product,
}
for(let i =0 ; i< count.value ; i++){
    card.value.push(obj);
}
await calc_amount();
sessionStorage.setItem('card' , JSON.stringify(card.value));
}
const calc_amount = ()=>{
    if(card.value.length > 0){
        amount.value = [];
        for(let i = 0 ; i < card.value.length ;i++){
                if(apiData.one_product.id == card.value[i].info.id){
                amount.value.push(apiData.one_product)
               sessionStorage.setItem(`${route.params.id}amount` , amount.value.length)
            }  
        }
        
}else{
                sessionStorage.setItem(`${route.params.id}amount` , 0)

            } 

}
onMounted(async() => {
await apiData.getOneProduct(route.params.id);
console.log(card.value);
calc_amount();
});
onUnmounted(() => {
    apiData.one_product ={};
});
</script>

<style lang="scss" scoped>
@import url(../components/css/login-register.css);
.row{

    &::-webkit-scrollbar{
        display: none !important;
    }
}

.product_details{
    max-width: 100%;
    overflow: hidden;
    min-height: 100vh;
    position: relative;
    z-index: 1000;
   padding-bottom: 10vh;
}
.actions{
    display: flex;
    justify-content: center;
}

@media (max-width:752px) {
    .actions{
        display: grid;
        grid-template-columns: auto;
        form{
            margin-top: 20px;
            width: 90% !important;
        }
    }
    
}
@media (max-width:599px) {
.card{
    width: 100% !important;

}

    .row{
        padding-bottom: 50px !important;
               
        overflow: hidden !important;
    }
    .row::-webkit-scrollbar{
        display: none !important;

    }
}
</style>