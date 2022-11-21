<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Счет</h3>

            <button class="btn waves-effect waves-light btn-small" @click="refresh">
              <i class="material-icons">refresh</i>
            </button>
          </div>
          <loader v-if="this.loading"></loader>
          <div v-else class="row">
            <home-bill
            :rates="currency"
            ></home-bill>
            <home-currency
            :rates="currency"
            :date ='currency'
            ></home-currency>
          </div>
        </div>
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>
<script>
import HomeBill from '../components/HomeBill.vue'
import HomeCurrency from '../components/HomeCurrency.vue'
 import Loader from '../components/app/V-Loader.vue'
export default {
  name:'v-home',
  data(){
    return{
      loading: true,
      currency: null,
      
    }
  },
  components:{
    HomeBill,
    HomeCurrency,
    Loader
  },
  methods:{
    async refresh(){
      this.loading = true;
      this.$store.commit('clearCurrency');

      await this.$store.dispatch('fetchCurrency');
      this.currency = this.$store.getters.currencyRate;
      
      
      this.loading = false
    
    }
  },
  async mounted(){
    await this.$store.dispatch('fetchCurrency');
    this.currency = this.$store.getters.currencyRate;
    setTimeout(() => {
      this.loading = false
    }, 0);
    
  }
}
</script>
