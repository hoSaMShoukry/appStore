import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "../router/router";
import { defineStore } from "pinia";
export const auth = defineStore('auth' , {
    state:()=>({
        isloggedIn: false,
    }),
    actions:{
        logOut() {
            onAuthStateChanged(getAuth(), (user) => {
              if (user) {
                this.isloggedIn = true;
              } else {
                this.isloggedIn = false;
              }
            });
          },
          handleSignOut() {
            localStorage.clear();
            signOut(getAuth()).then(() => {
              router.push({ name: "login" });
            });
          },
    }
})
