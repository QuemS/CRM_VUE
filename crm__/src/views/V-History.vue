<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>История записей</h3>
          </div>

          <div class="history-chart">
            
              <bar-chart></bar-chart>
            
          </div>
          <Loader v-if="loading" />
          <p class="center" v-else-if="!records.length">
            Записей пока нет.
            <router-link to="/record">Добавить запись</router-link>
          </p>
          <section v-else>
            <history-table :records="items"></history-table>
            <vue-awesome-paginate
              :total-items="records.length"
              :items-per-page="pageSize"
              :max-pages-shown="maxPagesShown"
              v-model="page"
              :on-click="onClickHandler"
            >
            </vue-awesome-paginate>
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

import Loader from "../components/app/V-Loader.vue";
import HistoryTable from "../components/HistoryTable.vue";
import _ from "lodash"
import BarChart from '../components/BarChart.vue';

export default {
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
      

      page: +this.$route.query.page || 1,
      maxPagesShown:4,
      pageSize: 5,
      allItems: [],
      items: []
    };
  },
  components: {
    HistoryTable,
    Loader,
    BarChart,
  },
  methods:{
    onClickHandler(page){
      this.$router.push(`${this.$route.path}?page=${this.page}`)
      this.items = this.allItems[page - 1]
    },
    setupPagination(allItems){
      this.allItems = _.chunk(allItems,this.pageSize);
      console.log(this.allItems);
      this.items = this.allItems[this.page - 1]
    }
  },
  async mounted() {
    // this.records = await this.$store.dispatch("fetchRecords");
    this.records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategory");
    this.setupPagination(this.records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.category)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    })) 
    this.loading = false;
  },
};
</script>
<style>
.pagination-container {
    display: flex;
    align-content: center;
    align-items: center;
    column-gap: 3px;
  }
  .paginate-buttons {
    height: 30px;
    width: 30px;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #ffa726;
    border: 1px solid #ffa726;
    color: white;
  }
  .active-page:hover {
    background-color: #ffa726;
  }
  .active-page:focus{
    background-color: #ffa726;
    
  }
</style>
