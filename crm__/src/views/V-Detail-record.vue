<template>
  <div>
   

    
    <main class="app-content">
      <div class="app-page">
        <Loader v-if="loading"></Loader>
        <div v-else-if="record">
          <div>
            <div class="breadcrumb-wrap">
              <router-link to="/history" class="breadcrumb">История</router-link>
                <a @click.prevent class="breadcrumb"> {{record.type ==='income' ? 'Доход': 'Расход'}} </a>
            </div>
            <div class="row">
             
              <div class="col s12 m6">
                
                <div class="card"
                :class="[record.type === 'income' ? 'green': 'red']"
                >
                  
                  <div class="card-content white-text">
                    <p>Описание: {{record.discription}}</p>
                    <p>Сумма: {{$currencyFilter(record.amount)}}</p>
                    <p>Категория: {{record.categoryName}}</p>

                    <small>{{dateFilter(record.date)}}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="center">Такой записи с id = {{this.$route.params.id}} нет</p>
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
export default {
  data(){
    return{
      record:null,
      loading:true,
      options:{}
    }
  },
  components:{
    Loader
  },
  methods:{
    dateFilter(date, format = "datetime") {
      if (format.includes("date")) {
        this.options.day = "2-digit";
        this.options.month = "long";
        this.options.year = "numeric";
      }

      if (format.includes("time")) {
        this.options.hour = "2-digit";
        this.options.minute = "2-digit";
        this.options.second = "2-digit";
      }
      return Intl.DateTimeFormat("ru-Ru", this.options).format(
        Date.parse(date)
      );
    },
  },
  async mounted(){
    let id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById",id);
    const category = await this.$store.dispatch("fetchCategorById",record.category);
    this.loading = false;
    this.record = {
      ...record,
      categoryName: category.title
    }
    console.log(this.record);
  }
}
</script>
