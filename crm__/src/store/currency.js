export default {
  actions: {
    async fetchCurrency({ commit }) {

      const url = './data/Nbu_currency.json';
      const res = await fetch(url)
      let data = await res.json()
      commit('setCurrency', data);
    }
  },
  mutations: {
    setCurrency(s, cur) {
      s.currency = cur
    },
    clearCurrency(s){
      s.currency = []
    }
    
  },
  state: {
    currency: [],
    
    
  },
  getters: {
    currencyRate(s) {
      const rate = {UAH: 1}
      const result = s.currency.filter((elem) => {
        if (elem.cc == 'USD')  rate.USD = elem.rate;
        if (elem.cc == 'EUR')  rate.EUR = elem.rate
      })
      console.log(result);
      return rate

    },
    
  }

}
