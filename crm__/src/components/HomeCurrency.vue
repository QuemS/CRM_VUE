<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr v-for="cur in currencies" :key="cur">
              <th>{{ cur }}</th>
              <th>{{ Math.floor(rates[cur]*1000) / 1000 }}</th>
              <th>{{ dateCur }}</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['rates'],

  data(){
    return{
      currencies: ["UAH", "USD", "EUR"],
      options:{
        day : '2-digit',
        month :'long',
        year : 'numeric',
      }
    }
  },
  computed:{
    dateCur(){
      return Intl.DateTimeFormat('ru-Ru',this.options).format(new Date());
    }
  },

  mounted(){
    
  }
    
  
}
</script>
