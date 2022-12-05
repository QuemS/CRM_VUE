
import { doc, getFirestore, setDoc, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

export default {
  state: {
    info: {}
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        let collectionRef = collection(db, 'users', uid, 'info');
        let result = await getDocs(collectionRef, uid);
        result = result.docs.map(item => item.data());
        commit('setInfo', result[0])
      } catch (error) {
        console.log('fetchInfo', error);
      }




    },

    async createInfo({ commit, dispatch }, { name, bill }) {
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        const newInfo = doc(collection(db, 'users', uid, 'info',), uid);

        await setDoc(newInfo, { name: name, bill: bill, }, { merge: true })

      } catch (e) {
        commit('setError', e)
      }
    },

    async updateInfo({ commit, dispatch }, info) {
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        const updateInfo = doc(db, 'users', uid, 'info', uid);

        await setDoc(updateInfo, info, { merge: true });
        commit('setInfo', info);
        console.log('updateInfo OK');

      } catch (e) {
        commit('setError', e)
      }
    },
    
  },
  mutations: {
    setInfo(state, info) {
      state.info = Object.assign(state.info, info)

    },
    clearInfo(state) {
      state.info = ''
    }
  },
  getters: {
    info: s => s.info
  }
}
