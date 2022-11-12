import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import router from "@/router";
export default {
  actions:{
    async login({commit}, {email, password}){
      console.log(email, password);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        commit('getUser',user)
        if (user) {
          router.push('/')
        }
        console.log(user,email, password);
        // ...
      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
      });
    }
  },
  mutations: {
    getUser(state,user){
      return state.user = user
    }
  },
  state:{
    user:[]
  },
  getters: {
    userShow(state){
      return state.user
    }
  },
}
