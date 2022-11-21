
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore'

export default {

  actions: {
    async fetchCategory({ dispatch }) {
      const uid = await dispatch('userUid');
      const db = getFirestore();
      let collectionRef = collection(db, 'users', uid, 'category');
      let result = await getDocs(collectionRef);
      result = result.docs.map(item => item.data());
      return result

    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('userUid');
        const db = getFirestore();
        const newCategory = doc(collection(db, 'users', uid, 'category'));

        await setDoc(newCategory, { title: title, limit: limit, id: newCategory.id }, { merge: true })
        return { title, limit, id: newCategory.id }
      } catch (e) {
        commit('setError', e)
      }
    },
    async updateCategory({dispatch},category){
      const uid = await dispatch('userUid');
      const db = getFirestore();
      const updateCategory = doc(collection(db, 'users', uid, 'category'),category.id);
      await setDoc(updateCategory, { title: category.title, limit: category.limit,}, { merge: true });
      return { title: category.title, limit: category.limit, id: updateCategory.id }
     
    }
  }
}
