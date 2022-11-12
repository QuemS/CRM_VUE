import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


import router from "@/router";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      console.log(email, password);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          commit('getUser', user)
          if (user) {
            router.push('/')
          }
          console.log(user, email, password);
          // ...
        })
        .catch((error) => {

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },

    async logoutUser() {
      const auth = getAuth();
      await signOut(auth).then(() => {
        console.log(' Sign-out successful.');
      }).catch((error) => {
        console.log('error:', error);
      })
    },

    async registerUser({ commit }, { email, password, name }) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const uid = userCredential.user.uid;
          const db = getDatabase();
            set(ref(db, `/users/${uid}/info`), {

              name,
              bill: 10000

            })
            console.log('write User Database');
        })
        .catch((error) => {

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);

        });

        commit('test');
          
    },
   


  },
  mutations: {
    getUser(state, user) {
      return state.user = user
    },
    test(){
      return 'asdads'
    }
  },
  state: {
    user: []
  },
  getters: {
    userShow(state) {
      return state.user
    }
  },
}
