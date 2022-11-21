<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Категории</h3>
          </div>
          <section>
            <Loader v-if="loading"/>
            <div class="row" v-else>
              <category-create @created-category="addNewCategory"/>
              <category-edit 
              v-if="categories.length"
              :categories="categories"
              :key="categories.length + updateCount"
              @update-category="updateCategory"
              />
              <p v-else class="center">Категорий пока нет</p>
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
import CategoryCreate from "../components/CategoryCreate.vue";
import CategoryEdit from "../components/CategoryEdit.vue";
import Loader from '../components/app/V-Loader.vue'

export default {
  name: "V-Categories",
  data(){
    return{
      categories :[],
      loading: true,
      updateCount: 1
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit,
    Loader
  },
  methods:{
    addNewCategory(category){
      this.categories.push(category);
    },
    updateCategory(category){
      const index = this.categories.findIndex(c=>c.id===category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount++

    }
  },

  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategory');
    
    this.loading = false
  }
};
</script>

