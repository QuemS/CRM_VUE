<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{info.bill}}</h4>
          </div>
          <v-loader v-if="loading"></v-loader>
          <p class="center" v-else-if="!categories.length">
            Категория пока нет
            <router-link to="/categories">Добавить категорию </router-link>
          </p>
          <section v-else>
            <div>
              <p>
                <strong>Девушка:</strong>
                12 122 из 14 0000
              </p>
              <div class="progress">
                <div class="determinate green" style="width: 40%"></div>
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
    console.log(categories);
  },
};
</script>
