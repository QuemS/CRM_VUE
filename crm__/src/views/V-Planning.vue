<template>
  <div>
    <main class="app-content">
      
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{$currencyFilter(info.bill)}}</h4>
          </div>
          <v-loader v-if="loading"></v-loader>
          <p class="center" v-else-if="!categories.length">
            Категория пока нет
            <router-link to="/categories">Добавить категорию </router-link>
          </p>
          <section v-else>
            <div v-for="cat of categories" :key="cat.id">
              <p>
                <strong>{{cat.title}}</strong>
                {{$currencyFilter(cat.spend)}} из {{$currencyFilter(cat.limit)}}
              </p>
              <div class="progress" v-tooltip="cat.tooltip">
                <div class="determinate" 
                :class="[cat.progressColor]"
                :style="{width: cat.progressPercent+'%'}"></div>
              </div>
            </div>
          </section>
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
import { mapGetters } from 'vuex';
import vLoader from "../components/app/V-Loader.vue";
export default {
  name: "v-planning",
  components: {
    vLoader,
  },
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  computed:{
    ...mapGetters(['info'])
  },
  async mounted() {
    
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategory");
    console.log(records);
    this.categories = categories.map( cat => {
      const  spend = records.filter(r=> r.category=== cat.id)
        .filter(r => r.type ==='outcome')
        .reduce((total , record)=>{
          return total += +record.amount
        }, 0);
      const persent = 100 * spend / cat.limit;
      const progressPercent = persent > 100 ? 100 : persent;
      const progressColor = persent < 60 ? 'green' : persent < 100 ? 'yellow': 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0? 'Привешает на': 'Осталось'} ${this.$currencyFilter(Math.abs(tooltipValue))}` 
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
    console.log(records);
    console.log(categories);
  },
};
</script>
