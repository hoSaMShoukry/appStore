<template>
<Navbar/>
    <div class="checkout" style="z-index: 1000;position: relative;">
    <v-form class="bg-grey-lighten-3" ref="form">
    <h2 class="text-center text-error">checkout</h2>
    <hr class="my-3">
    <div class="d-felx pl-16 mt-3 font-weight-bold justify-start pt-2">Name : &nbsp;<span class="text-grey">{{ theName }}</span></div>
        <div class="d-felx pl-16 mt-3 font-weight-bold justify-start">Total Price : &nbsp;<span class="text-grey">{{ price }}</span></div>
        <v-text-field v-model="adress1" :rules="adressValidate" clearable class="d-felx px-5 mt-3 font-weight-bold justify-start text-blue-darken-4" color="red" type="text" label="adress1"></v-text-field>
        <v-text-field v-model="adress2" :rules="adressValidate" clearable class="d-felx px-5 mt-3 font-weight-bold justify-start text-orange-darken-4" color="orange" type="text" label="adress2"></v-text-field>
        <v-text-field v-model="phone1" :rules="phoneValidate" clearable class="d-felx px-5 mt-3 font-weight-bold justify-start text-error" color="erro" type="number" label="phone1"></v-text-field>
        <v-text-field v-model="phone2" :rules="phoneValidate" clearable class="d-felx px-5 mt-3 font-weight-bold justify-start text-green" color="green" type="number" label="phone2"></v-text-field>
    <hr class="my-3">
        <div class="paymethod d-flex justify-center">PayMethod</div>
        <div class="paymethod d-flex justify-center">
          <span class="mt-5">
            <v-avatar size="50" @click="visa($refs)">
                <img src="https://cdn.worldvectorlogo.com/logos/visa-5.svg" class="w-100" alt="">
            </v-avatar>
          </span>
          <span class="mt-5 ml-5" @click="paypal($refs)">
            <v-avatar size="50">
                <img src="https://logowik.com/content/uploads/images/paypal-new-20232814.logowik.com.webp" class="w-100" alt="">
            </v-avatar>
          </span>
          <span class="mt-5 ml-5" @click="paymob($refs)">
            <v-avatar size="50">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQYAAADACAMAAADRLT0TAAABF1BMVEX///8Zgfz///0Zgf73//////z6/////v75//8Zgfr+//v9/vgagP71///8//3//v3u///D5/YYgvdSl94Ofvbq//////X7//jk/P8AdNsXg/bV7vf3//v//PgsfePn+v/4/+4ah/7k/vpVmdlSlt/W9f0Se+6m1vAthNcAddcThvoAeeUAeOwWgu1go+De9v9FjNmx1eJzptsZduRGjce43/QygMZcn9Q/idOIvefO5vYfg+OSwOumzfC73/KZx+NelsJ1seKpx9mSwuMjdM4afc7H4vmn0/F0teAjcMaJxeKbx+5Zo+NqpNM/jdSq4vU1f7kKbK606PVRn844kfFtu/yLyvDY//84i97K3euPsdR0pMMAb8/Ew7sBAAAUcElEQVR4nO1aCXfiSJJGEkjoSh0WEiQSlBojDnGNadqAXPYwxkXNuIru7d3p9s7O//8d+4WwXa659rlr3qvt1/mVr5JEZmRkHF9EqlIREBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ+HJowNeW4StDkw3NgRpUhr8rztcW5yvBqWjmmzdRFDKV1PCbRK1WM5yk2l4dfucajvy1xflaMEzTVNsXnWX+bRfRgVV+iyHCcQynFq++W/oSv7QTTWZfW6KvBFnV2utcsZRsw5zfanRESIzizTKFGloDg/121VAJu+vxOOBSxwvrv8Gw8AhmbgtJ13VrOA/Vry3MV4S6Wup66kvnbvhbjY8E+2rip6kfXNjmr5g1fGlU09xZ4I9TffI2iv8tAhEcR2WJVoGTsboM5dbrqlqx7WoJGGAN+ankJ45pVFXTqKhq9el2VQ1NJ1Fj1a7X8T/7mdc6zIjoAl1lcGaMY9uPn6qrNCkokFFjmNrAJHUbc4Igs9rzUsGSDUczzZrDVNw0DQcX8D8a/JtzyR/rUn4dOSS4epKlHF9lkeFUmPZKVTtYXRTH85vL3u/bsWl7V2cvcbm7dqPIKIsXVUveRK432M16H+je+Vmvd3HdiJNKtL0sn/79/Gn2Wmy++Qs9cvbtHwyN2atd7zTgOX3s4sZzI9NhZhRF8Xy1uej1LjeDuc3i6rNgqor7YeT2rw83N4dV345Dk0VlRDT7heRzRRr2Ha3pbZ5Hph+9Wy8OGZNfrQY1etO4X4+mfNg1t7MRnwSf4PPJftMII5LOiUy1e9Pbd6bTjJc3gbx1G7MkPLR4xjN/3Qgfh2VR7Zth5uOp4hCZ9u3dlHP/6UN4dDRb2YyFkb3dDYs8sIIg6ww387rxZE6sktSSuH/VW+87+XI5uusdupGmlTTB8Ua6PpaCdcN41ysmnAd+8Dh2wPP92yhM5Nd7XhTfFoHOOz3XO06nY13HcDohwJ96NjqEkYpBtfCbwQIS65IiWRKApyQ92F8bYfQ+p2eDmfrEZpipeQXu+/zOi6LVntOzOo2Hr/EYYu83zSRu74Z56o8DXJQkni/ekZWXQ+C36+FuhiAgWZjUH/VWbpJQSGRvcwyiZz33+o6PT8LQuCQ2BvujFyfGqzOIGb4bci5JwcXPl1PIzWnD0lRXoHFfwti9OGYo79X+RSdIg7R8APkqTaGxYJzNXOb2+DgdT6d/Mp9VGzmDPMXSp+tuYl9iv8Zjrp+gSL6OcUYbd7Du0Pop+VHk17P1KjbLjUQ0atwPcwUq51PdgrVIaT78qWE4iDTq7qSGTX+R6T6mhjAnLZOa0877hmq+zhhkmG+4y1NF8bP7wV7ynywB42K9ugJBhl3VUMPY67Wwaj99XEogkYpgDg/duLvAEv1pPnh2STM2bieWZSnTD27Y+I7GVCxiPJDWUmgEKyg+3GU+fRCTnNYwnh7bZqIy+LY2/zhSFN2njYYMFimLF7d2jJBhX5Ia/HywyWErUIFemgOZKcazgjM3Nl6vBvsMn1V4ZzXLJd1/3DIscUy6kHRp31URyjzsXOpPpzwlVZGA9AxWsHCrbTiV7/PCe/ZIk7kfM1JDtlMj786Hz1gWlBzgu9Sfbumcc2iGRgITkmjNgdXaoGZUjSSaX3Yk6Msv9wWrxFhWwO/e1WEnzSMujnnx/SLgeumdj4AKfMkKenZsvC4tkxraBfclBYv44Y9/HbVGrdbpe5QH2HJFkhY2U6P+cSKRIYyDYNlq5a39iI9hLakUzKryIYdt6nw4/zR37ZsePqxI2b0WDYrUwlL9fEQDLzPIHpT+HFiKYlmTyXLJSxFSyx96Zq3ixP2zPA1IDXqQ5a3cJzVIesZ7DUdj/Ttp7Ov84fv/aEGWT+hM8YxiZbOYvTo2MMODafE0WPQ979p7gcMavoKYMbMrcXc2SlOO+Nhab1Yrb+X9OFjnXFLSYHLFKvcTWKPvn7kaHPukibB/B49S0vxdEt/mKYIcPxuU4x92d1lpw5Y1VgI/289uBz9d3k0xk26l+W0UaWbzI/YAsU/P72ab+/vduuAB2Y2/XzEW/7gnO+Rnc+9z/DTElLo02USvVwPi7mSaInj3QBDsp1WAhUTxe0wtSctNrMVvW1Puj/3l3W0TTEdVTVM9dEqDXK60+g4+wYnbys/0J1y1UApb0n6eqBeZhAVO7hsGq1fkqruiyIY4KU2xzt51VTXs5u0egyEIBB9i03hzKKYwcX882nl2JLNq8+ZuSh7q57uqGd+3KBz4M1v+jEobjVlGVpcdmFZ5LcnW1F02RYziu2rN+KQbFpnRpvSJ5SFi8zVivW/xoxcbCbzTMbVk/oD9kfyOp7m9gMw3v4+d2qNbOMZNTmpQzrume/QtXfFb16phVGTTjEOvyKAGf6xYnV3T1OTQMNzNNCgVsejWwuZ30Koe8NHBBdvUksR0B3egjYqSHbtRdIHp0nRypb4osmWmmvGOQo/eWf0CNTh2z59aSto6qBXZeR4Y4tozMkQpX4H+dLCSQB9eG6ZW8lSDRf0CYS7wh3O5XVD0l4pV9EyGteouh5ta1ke7th1CbIkXbQ1MnJkGC99sOpzipJJd9KsOVB5HYb+XKRQvhnMjvl36U6ihuEdAZHWslpmNj1MdASIYbiO3R0SCL1cvW9IYxegeJSQQvZiDS7/WKZzuwucSH4+8ivqCgmpG0j2njCCN+knzmI3hqKNNbKIYYEjdcmIMcmIA47OG7HVoH5W7vmnQJjiOzGS3N6VrwW3dvEbkAj0772qGoao1R9OibVGSHX+4rYUmLUaOottcoWwx7EfzdTDmU3+5Q9ZIDKNWw4DR70awBksv2rgNM/L9YvuZGmTZ6A99ZHRp6L7aFGpaBYkCLMcv5p9lGBjjnDKIrq+7hleUxOShDR516gIzR73NKSAFu7gyyC3kKuXYhK1QgURSNx+mUirprQNjg0yH1MHMPRkS1U9wKAqq+fsqnbmQGjTzkFP2UB7m8XURIBHwoReBQDyKk3h7ncyh04Y0vmX56brLXqgBfip7o0Af8+DMfqUWKrUwYdctRGGuH93P2llQw7tTJOrZxs0Sf+jZrho92ZqWxO+nyHHS5D6ubhACJQV00ilZJDamFq1GKSxJ33usupmkChgiIu3powjj3ZMaRqunZcqafFKDtWiqty0oXZEuG2b9WQ1YfEkSinllNYLOA3/myi8llmvq2yVSng8xX1tPoJBVbyYIR372sfo3d4y3eQq5+IVa32Wwbyv/k2GyEy1xtOSbIyeqNbmO7V5AWkIQ10o1MOYk7ixHLJFgSmqjF1Ba6AwemR0MhrULCg182I4epzNk9SaXyvTs2hdZGTfe22G99qgGrQ7j4z7Suss2ORHSyXvbeKkGR7M3GcbUl7evb8w5terHUsr8luIuNvI0r6aZ8QbpXtGnm4o7y3RSw6A0BixGlh3mdco6qdM23QVxXn15Va+Yiaw5hoFiqjXmWaoHH2ynuR4jRFojzzg1ARAc2DYnEiA9uE+5yUjs92QNenaFEFgS9XwTh9XSGuRaTW1cTnQQtnwX2ZfEq/TlAYxZPlWSDuTRtO4FVTtpa/Dq0MBk5p6hfLP00bUpvwRj9gdOPtEZhI3eSQ2b2KGjMpnBmdxdRmrgD40EMRYbr0x2DQYtaMhcb7zFdOyDdsNAEwQWECFrOD+FhpqJoEclos7BEZ77E0l3xqm0yA9mowcf031sd1itQmekdnu1R+2V6fuV2T2nkhIC1wxGkpIPgq+oSfOczCXdb83XHl6oJps/BBR6Cu+NCdC4Zomo8QC+NJZa/cidkbkqPpzVxA6g7DejwZDqD4ocGqyBYhtf/5xozHHiWN6egygg+wSTt0xbdcrS/Nw+BVfZhGtBh7g/eQoXuGp0hz6pYeQ57ixAcLWCYz+kiAwfA736FmR9HFi9LiI31KDowy3ykuzQQZ5B22bI/T2cOw2+6xqvbTYwk207lNisxTysGQYNKONXjYVxe4Sim4PFsypoCVaa7QdxCE1RT2h1RyWWLmUbptm9kmbxzlW3EpqR/fN9kSOISSDoo3dG9WZJFUFwEZ8Cew30KT4LkBz9/PCsBkfe5lRNSsOmbO9K4/M7GzsEV3PkMO6j0ILareKQOF6L9iQ4NpG5Hcc5Ce0kproakary97HxL1b8j6BBDYNlWQH17LByig3yo34QkLNpUAwijd109DGYrF6sbDMMo7BxP+TSlFopsGGNQhpYBQ+Ws5XnDXbHnGo9FE6pfgdTwqKI/l2ZqkOe7IA+uQ9UMOqd62c1VNhhguEU/cytGajUdGIGo02/iqJb7Q6OGQxE0fl/NpzKTYvKf1Q6CTNqMuwfnlqTkzfxzZQHnN/BrF+phkrE1M2E1JDP+u3PsO3ejmAL+ceGybT2mvoy03FQ7A7ttrdZYIN10oJUbA2z+rZV0jo83enkkywI9LIDYKXBuuE0zjjRouXKYSd2pbGwXShUWw7n6pMXM/WKYo2FujxJ+mvYD8puv3PcHFaDzXlnOqUoG6y9msN2lFF0/ue/Ebjv7uA1wejKfmXLBTA0MGZIqQTFcN95RIGv4u7mfWfsty6bocOcxsc8BU3lYz/rFMNR2XEb+6dzo6QmbzsBdU/KthUsm+qBUzCZzGytOaSuEzIKTK+0Vq0SXufkh9LRlZ/bI/aOU08ivyVKssmpBQgOFeSdUScLfD4dU5k2qGrMBumGGvwpSUlf9LsohneDDxm48M42X58vGai0Qh0mKS0bAFLZEqMLncOs6Aw3fSNhTIu3f0ScUMZ+2Tmi9gmckJ6yzt3EYPYuL02DDB2/wYOp1QDnX17FiTdCDeX7iy4zH9WAsguOWIaL5GnnHOr9pL40Whmqps0XEwwhcSpwy2EDPrayu1vb1JzuWrKUMjxLxLFOnbeU8+LHh7w4vrVDQ321NTgJ7JMggTxgg5Tn3tNi/kPvth2jkpKZZtobLNTSy1WC4kANUyoylGAW11DH9IcZp+6SRD9SELlpGe78ztsIHFnnU0RalxlmWXhpKMwz8onJT5H5XAHNHzJqaAzbIdRQ295xChTgFqQC1Ni+P10PXA1JigSmDYPAlIhLli9ZMLwfv+vdzFWw/PqrE6ZmeiO93LhTq4sqfjgy5389xNuuapqnklNzXHhkgDWidLYCP/U7/xXAefXOpm6qqhMP9llQxgMJGzPld38mw+V64UXqJodxg3NUn5dsouwqCdB1xXzuTyAvoU4Ljt0ESZLqaupRYNtR+4ISSdnoErUo0qexyjmVrqUZlKaCbeFKMPLcvovE8YsOuJ3okJ+sgb6h/5R8XPFHt3EE0seejs21xN2MMnL4sl27HA4+IChb6WgQJwgwjrta5whpY1Kmwu++/2kCCcd80YzsGacGN8r4p4aQFvaHpcUVXuXkJrR3B8R/PZ2gLjGgBtPezkYBTD6l8k3P98dDNyn1qP40ofWT5yrkwmWTXA/2h3rCwigyX5ssSyRxmaOVsquJCE/7KQWtHwaNOFYj9dM7RVWtuurtlxkdiiyLy+3Pxwxe4t9REZhoYBLz3XA5Caxgsux82IIAkRpyxCv3yJEwrdH2uYh3jO1ICgIpe6DK+2kCOirJguWG1FCBFdruoVcsJ5NpNhkNLwddlOhYouyoH4OM84zOfkgYzIM/WouDDWFNYjy/5IA0iS8toip8fTweF4uHBX71dgOk6zp0j9h+oud0KKjF7vX9x2+Pvd7m2mbtbx+A9e/bpspqGvUQ1PZgc9nrXdx7zcjbk9GOWweDzb99WB/Xi2/nL+T77x8w1cP6Y9Vhz2r4y3H4sF4c/2A7GEw2tIRV3fZqs9lcvb1uu3HkyGZZX1T/Z31cPDxjsVj3LnerOXyzZv7iQ37UPeTOSuf75iMajQYm1f7+jUuNzjrdRpNuR1G1253T0/UE9IX623KC23SaGkXhN5dlb8kfgpna3W632ex2408yqtVuOVXXqT2aCH7adK3bdNlzZx2cu06nvhjbqT3HkHqj2W2+QLfbcG1b/bJ34TRvCNdLA6T/KEwAzUFEiKJ/dCIMj5UrNYaSw6DqCNGqLEIeq2eN6D+2kY6FdyMd7NtCyaAaCWgnxn05HD4YEqiAebquIbiX452WA16Ihxgd3GCBdOOpakxOFU/5yyCJEUpU9UvfGl4VqHjT7MwFSSpbrTQlnUD+nRqcSlRDkYy8INP5WTkzzPe0EMdBnK6qyIlx89DLpfJ0c9hPVGomxviuaJ9GxIfB1dmpPHy6qKoVldzw6YJcQ4CgVhaAP59TCuaO6+UHTu9MY0ZWcb5MDbJ8n1OgzXfMRCQn0ainR725fzAsHe2gwDxtDBmqBmGJ0kOK+ObufHd1f3+/OxaZgopY91u3NkxE1sDR5BiPPHcBHOrMAJWnAuY0ekkrXjzklDoiQbRPR1AOHlJV9gl00CJ/kRagWKqKgPwtnSA7ZZ1Cy6r806Mvp/IZNXHoC+Jq8WYZZJNsmecZEUTLn+a9BiygFM/553Tmbwb7Pytk5/Hfyye/8NVIqAF1jw+K1ll90UDYSftjlp5eYCAGAtojDdu/kld4oYb5cMxTSS/aX6BQh94NcHt+SicsAT+99ZCN3qmvPzP5OpCp102N1UXjiwR2zLC7SOlspywzyxc2vOj19e5XASJBNBj5U67zmf2F7sXaIz21yvceUimYDt/3Y+TDX8X7zLKj1f+ynOSt6V831S8zX6a2vytGOapQno/2i50Xh2DYvw5zAGmt/O7+6vb25nYbf6Ea6m5/dbObfTib7W62XVhC8qtRg8ycJGb1OEZ19IXvoePzZgRWVEdKrzMTxI6ZofHrSBSEMgkb8r9I7K+D5jweM/3bRhQQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD4/4H/BdprT9crnd2DAAAAAElFTkSuQmCC" class="w-100" alt="">
            </v-avatar>
          </span>
        </div>
    </v-form>    
    </div>
    <FooterPage/>
</template>

<script >
import { ref } from 'vue';
import FooterPage from '../components/footerPage.vue';
import Navbar from '../components/navbar.vue';
import { loginAndRegister } from '../components/controllers/login';
export default{
    components:{
Navbar,
FooterPage
    },
setup(){
    const adress1 = ref('');
    const adress2 = ref('');
    const phone1 = ref(0);
    const phone2 = ref(0);
const rules = loginAndRegister();
const theName = ref(localStorage.getItem('user-name'))
const price = ref(localStorage.getItem('price') ? localStorage.getItem('price') : 0);
const paypal =async (param)=>{
    if ((await param.form.validate()).errors.length == 0) {
        window.open('https://www.paypal.com/eg/home' , '_blank');
    }
}
const visa =async (param)=>{
    if ((await param.form.validate()).errors.length == 0) {
        window.open('https://usa.visa.com/' , '_blank');
    }
}
const paymob =async (param)=>{
    if ((await param.form.validate()).errors.length == 0) {
        window.open('https://www.brankas.com/open-finance-suite?utm_term=api%20payment%20system&utm_campaign=ofsme&utm_source=adwords&utm_medium=ppc&hsa_acc=7919952709&hsa_cam=20122015103&hsa_grp=149408800216&hsa_ad=658252810513&hsa_src=g&hsa_tgt=kwd-337942534781&hsa_kw=api%20payment%20system&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQiA-62tBhDSARIsAO7twbZ9cQXRx-BvjEY2d37-pNANUGv-nLbFTweUJroVGp_jAnfwuETFVncaAlISEALw_wcB' , '_blank');
    }
}
const  adressValidate = ref(
    [
        (email) => email.length > 0 || "enter adress".toUpperCase(),
        (email) =>
          (email.length > 10 && /\w+/i.test(email)) ||
          "adress must be more than 1 word".toUpperCase(),
      ]
);
const  phoneValidate = ref(
    [
        (email) => email.length > 0 || "enter phone number".toUpperCase(),
        (email) =>
          (email.length > 10 && /\d+/i.test(email)) ||
          "phone number must be more than 1 number".toUpperCase(),
      ]
);
return{
    theName,
    price,
    adressValidate,
    phoneValidate,
    paypal,
    adress1,
    adress2,
    phone1,
    phone2,
    visa,
    paymob,
    ...rules
}
}
    

}


</script>

<style lang="scss" scoped>
.checkout{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    max-width: 100%;
    overflow: hidden !important;
    form{
        padding-top: 25px;
        border-radius: 15px;
        margin-bottom: 5vh;
        height: fit-content !important;
        padding-bottom: 80px;
        width: 400px !important;
    }
    span{
        cursor: pointer;
    }
}
@media (max-width:412px) {
    .checkout{
        form{
            width: 350px !important;
        }
    }
    
}
@media (max-width:362px) {
    .checkout{
        form{
            width: 300px !important;
        }
    }
    
}
</style>