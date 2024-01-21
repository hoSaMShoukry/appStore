<template>
  <navbar/>
    <div class="sign-in">
    <v-container>
      <v-row justify="center mt-16">
        <div class="box">
          <span class="border-line"></span>
          <v-form ref="form" class="pt-5 form">
            <v-row justify="center">
                <v-col cols="12 text-center text-h5 font-weight-bold py-5 text-white"><span>Login Form</span></v-col>
              <v-col cols="10">
                <div class="inputBox">
                  <v-text-field
                  :rules="emailValidate"
                  v-model.trim="email"
                    clearable
                    type="text"
                    label="Email"
                    class="text-white"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                
                  <div class="text-center text-red" v-if="emailErrMsg">
                    {{ emailErrMsg }}
                  </div>
                  <div class="text-center text-red" v-if="errMsg">
                    {{ errMsg }}
                  </div>
                </div>
              </v-col>
              <v-col cols="10">
                <div class="inputBox">
                  <v-text-field
                    clearable
                    :rules="passwordValidate"
                    class="text-white"
                    type="password"
                    label="Password"
                    v-model.lazy.trim="password"
                    prepend-icon="mdi-lock"
                  ></v-text-field>
                  <div class="text-center text-red" v-if="passwordErrMsg">
                    {{ passwordErrMsg }}
                  </div>
                  <div class="text-center text-red" v-if="errMsg">
                    {{ errMsg }}
                  </div>
                </div>
              </v-col>
            </v-row>

            <div class="text-center links">
              <v-btn
              @click="signIn($refs)"
                variant="text"
                class="mt-10 text-h5 login"
                >Login </v-btn
              >
            </div>
            <div class="loading text-center">
<span class="d-inline-block mt-2" v-if="loading_request == true">
  <semipolar-spinner
  :animation-duration="2000"
  :size="50"
  color="#ff1d5e"
/>
</span>
            </div>
            <div class="text-center links">
              <v-btn
              @click="$router.push({path:'/register'})"
                variant="text"
                class="mt-3 text-h5 login"
                >Register Page </v-btn
              >
            </div>
          </v-form>
        </div>
      </v-row>
      
    </v-container>
  </div>
  <FooterPage/>

</template>

<script>
import { SemipolarSpinner  } from 'epic-spinners'
import Navbar from "../components/navbar.vue";
import FooterPage from "../components/footerPage.vue";
import {loginAndRegister} from '../components/controllers/login';
export default{
  components:{
    Navbar,
    SemipolarSpinner,
    FooterPage
  },
  setup(){
  const login = loginAndRegister();
  return{...login}
  }

}
</script>

<style lang="css" scoped>
@import url(../components/css/login-register.css);

</style>