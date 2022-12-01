<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>История записей</h3>
          </div>

          <div class="history-chart">
            <canvas></canvas>
          </div>
          <Loader  v-if="loading"/>
          <p class="center" v-else-if="!records.length">Записей пока нет.
            <router-link to="/record">Добавить запись</router-link>
          </p>
          <section v-else>
            
            <history-table :records="records"></history-table>
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
import Loader from '../components/app/V-Loader.vue'
import HistoryTable from "../components/HistoryTable.vue";
export default {
  data() {
    return {
      loading:true,
      records:[],
      categories:[]
    };
  },
  components: {
    HistoryTable,
    Loader
  },
  async mounted(){
    // this.records = await this.$store.dispatch("fetchRecords");
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategory");
    this.records = records.map(record =>{
      return{
        ...record,
        categoryName: this.categories.find( c=> c.id === record.category).title,
        typeClass: record.type === 'income' ? 'green': 'red',
        typeText: record.type === 'income' ? 'Доход': 'Расход',
      }
    })
    this.loading = false
  }
};
</script>
