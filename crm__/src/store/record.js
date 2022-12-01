import { doc, getFirestore,collection,setDoc,getDocs,getDoc } from "firebase/firestore";
export default {
  actions:{
    async createRecord({dispatch, commit} ,record){
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        const newRecord = doc(collection(db, 'users', uid, 'records'));

        await setDoc(newRecord, {...record,id:newRecord.id}, { merge: true })
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
    },
    async fetchRecordById({dispatch , commit},id){
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        let docReg = doc(db, 'users', uid, 'records',id);
        let result = await getDoc(docReg);
        result = result.data();
        return result
      } catch (error) {
        commit('setError',error)
      }
    }

   
  }
}
