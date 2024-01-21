import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
  } from "firebase/auth";
  import { getAuth } from "firebase/auth";
  import { reactive, toRefs } from "vue";
  import router from "../../router/router";
  import db from "./fb";
  
  export const loginAndRegister = () => {
    const state = reactive({
      loading_request:false,
      personType: "",
      emailValidate: [
        (email) => email.length > 0 || "enter email".toUpperCase(),
        (email) =>
          (email.length > 0 && /\w+\d*@\w+.(com|org|net)/i.test(email)) ||
          "not email style".toUpperCase(),
      ],
      passwordValidate: [
        (pass) => pass.length > 0 || "enter password".toUpperCase(),
        (pass) =>
          (pass.length > 0 && /\w+/i.test(pass)) ||
          "email should be more than word".toUpperCase(),
      ],
      personTypeValidate: [
        (personType) =>
          personType.length > 0 || "you must choose 1 at least".toUpperCase(),
      ],
      email: "",
      password: "",
      emailErrMsg: null,
      passwordErrMsg: null,
      errMsg: null,
      listOfUsersWhenLogin: [],
    });
  
    const signIn = async (param) => {
      state.loading_request = true;
      if ((await param.form.validate()).errors.length == 0) {
        //get users
        const users = await db.collection("users").get();
        for (let i = 0; i < users.docs.length; i++) {
          state.listOfUsersWhenLogin.push(users.docs[i].data());
        }
  
        signInWithEmailAndPassword(getAuth(), state.email, state.password)
          .then((data) => {
            // i converted email to name by this function to catch the user name
  
            const name = getAuth().currentUser.email.split("");
            let current = "";
            for (let i = 0; i < name.length; i++) {
              current += name[i];
              if (current[i] == "@") {
                break;
              }
            }
            // i stored email name after sliced it in local storage
  
            localStorage.setItem(
              "user-name",
              current.slice(0, current.length - 1).toUpperCase()
            );
            localStorage.setItem("user-id", getAuth().currentUser.uid);
            // i filtered data which coming from firestore to response user to seller or customer page
            let usersAfterLogindept = state.listOfUsersWhenLogin.filter(
              (data) => {
                return data.email == state.email;
              }
            );
  
            const card = sessionStorage.getItem('card') ? JSON.parse(sessionStorage.getItem('card')) : [];
            if( card.length > 0){
              router.push('/checkout')
            } else{
              router.push('/')
            }
            state.listOfUsersWhenLogin = [];
            usersAfterLogindept = [];
            console.log(state.listOfUsersWhenLogin);
            console.log(usersAfterLogindept);
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/invalid-email":
                state.emailErrMsg = "invalide email";
                setTimeout(() => {
                  state.emailErrMsg = "";
                }, 5000);
                break;
              case "auth/user-not-found":
                state.emailErrMsg = "email not found";
                setTimeout(() => {
                  state.emailErrMsg = "";
                }, 5000);
                break;
              case "auth/wrong-password":
                state.passwordErrMsg = "invalid password";
                setTimeout(() => {
                  state.passwordErrMsg = "";
                }, 5000);
                break;
              default:
                state.errMsg = "please check email and password";
                setTimeout(() => {
                  state.errMsg = "";
                  state.emailErrMsg = "";
                  state.passwordErrMsg = "";
                }, 5000);
            }
          });
      }
      state.loading_request = false;
    };
    // Register Part
    const register = async (param) => {
      if ((await param.form.validate()).errors.length == 0) {
        state.loading_request = true;
        createUserWithEmailAndPassword(getAuth(), state.email, state.password)
          .then((data) => {
            // first i should register user data in the collection
            db.collection("users").add({
              dept: state.personType,
              email: state.email,
              password: state.password,
              userId: data.user.uid,
            });
            state.errMsg = "Registerd Success";
            const name = getAuth().currentUser.email.split("");
            let current = "";
            console.log(name);
            for (let i = 0; i < name.length; i++) {
              current += name[i];
              if (current[i] == "@") {
                break;
              }
            }
            console.log(
              "current is" +
                " " +
                current.slice(0, current.length - 1).toUpperCase()
            );
            localStorage.setItem(
              "user-name",
              current.slice(0, current.length - 1).toUpperCase()
            );
            localStorage.setItem("user-id", getAuth().currentUser.uid);
            const card = sessionStorage.getItem('card') ? JSON.parse(sessionStorage.getItem('card')) : [];
            if( card.length > 0){
              router.push('/checkout')
            } else{
              router.push('/')
            }
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/invalid-email":
                state.emailErrMsg = "invalide email";
                setTimeout(() => {
                  state.emailErrMsg = "";
                }, 5000);
                break;
              case "auth/user-not-found":
                state.emailErrMsg = "email not found";
                setTimeout(() => {
                  state.emailErrMsg = "";
                }, 5000);
                break;
              case "auth/wrong-password":
                state.passwordErrMsg = "invalid password";
                setTimeout(() => {
                  state.passwordErrMsg = "";
                }, 5000);
                break;
              default:
                state.errMsg = "email is used before";
                setTimeout(() => {
                  state.errMsg = "";
                  state.emailErrMsg = "";
                  state.passwordErrMsg = "";
                }, 5000);
            }
          }
          
          );
          state.loading_request = false;

      }
      state.loading_request = false;

    };
    // register in or register by google
    const registerWithGoogle = async (param) => {
      if ((await param.select.validate()).length == 0) {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
          .then((result) => {
            db.collection("users").add({
              email: result.user.email,
              dept: state.personType,
              userId: result.user.uid,
            });
            console.log(result.user);
            localStorage.setItem("user-name", result.user.displayName);
            localStorage.setItem("user-id", result.user.uid);
            const card = sessionStorage.getItem('card') ? JSON.parse(sessionStorage.getItem('card')) : [];
            if( card.length > 0){
              router.push('/checkout')
            } else{
              router.push('/')
            }
          })
          .catch((error) => {});
      }
    };
    // signIn with google
    const signInWithGoogle = async () => {
      // get users to response user to his page
      const users = await db.collection("users").get();
      for (let i = 0; i < users.docs.length; i++) {
        state.listOfUsersWhenLogin.push(users.docs[i].data());
      }
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          localStorage.setItem("user-name", result.user.displayName);
          localStorage.setItem("user-id", result.user.uid);
          // make condition to compare user with dept and email
          let usersAfterLogindept = state.listOfUsersWhenLogin.filter((data) => {
            return data.email == result.user.email;
          });
  
         const card = sessionStorage.getItem('card') ? JSON.parse(sessionStorage.getItem('card')) : [];
            if( card.length > 0){
              router.push('/checkout')
            } else{
              router.push('/')
            }
  
          state.listOfUsersWhenLogin = [];
          usersAfterLogindept = [];
        })
        .catch((error) => {});
    };
  
    return {
      ...toRefs(state),
      signIn,
      registerWithGoogle,
      register,
      signInWithGoogle,
    };
  };
  