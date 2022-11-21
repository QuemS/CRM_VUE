import { doc, getFirestore,collection,setDoc,getDocs } from "firebase/firestore";
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
    async fetchRecords({dispatch , commit}){
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        let collectionRef = collection(db, 'users', uid, 'records');
        let result = await getDocs(collectionRef);
        result = result.docs.map(item => item.data());
        return result
      } catch (error) {
        commit('setError',error)
      }
    }

   
  }
}
