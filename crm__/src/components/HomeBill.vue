<template>
  <div>
    
    <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur in currencies" :key="cur">
          <span v-if="getCurrency"> {{ $currencyFilter(getCurrency(cur), cur) }}</span>
        </p>
      </div>
    </div>
  </div>
  </div>
  
</template>
<script>


export default {
  props: ["rates"],
 
  data() {
    return {
      currencies: ["UAH", "USD", "EUR"],
      
    };
  },
  computed: {},
  methods: {
    getCurrency(cur) {
      return Math.floor(this.$store.getters.info.bill / this.rates[cur])
    },
  },
  
};
</script>
