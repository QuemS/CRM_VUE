import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import currency from './currency'
import date from './date'
import category from './category'
import record from './record'

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error(s) {
      return s.error
    },
    
  },
  mutations: {
    setError(state, error) {
      console.log(error);
      return state.error = error

    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {
   
  },

  modules: {
    auth,
    info,
    currency,
    date,
    category,
    record

  }
})
