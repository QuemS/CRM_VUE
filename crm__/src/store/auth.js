import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, } from "firebase/auth";




import router from "@/router";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      console.log(email, password);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            router.push('/')
          }
        })
        .catch((error) => {

          const errorCode = error.code;
          commit('setError', errorCode);
        });
    },

    async logoutUser({ commit }) {
      const auth = getAuth();
      await signOut(auth).then(() => {
        commit('clearInfo')
        console.log(' Sign-out successful.');
      }).catch((error) => {
        console.log('error:', error);
      })
    },

    async registerUser({ commit, dispatch }, { email, password, name }) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          let objectUser = {
            name,
            bill: 10000
          }

          dispatch('createInfo', objectUser);
          commit('setInfo', objectUser)
          // setDoc(doc(db, "users", uid), objectUser);
          console.log('write User Database');
        })
        .catch((error) => {
          const errorCode = error.code;
          commit('setError', errorCode);

        });
    },
    userUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null
    }



  },
  mutations: {


  },
  state: {

  },
  getters: {
    userShow(state) {
      return state.user
    }
  },
}
