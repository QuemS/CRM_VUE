import { doc, getFirestore,collection,setDoc } from "firebase/firestore";
export default {
  actions:{
    async createRecord({dispatch, commit} ,record){
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        const newRecord = doc(collection(db, 'users', uid, 'records'));

        await setDoc(newRecord, record, { merge: true })
      } catch (e) {
        commit('setError', e)
      }
    },

   
  }
}
