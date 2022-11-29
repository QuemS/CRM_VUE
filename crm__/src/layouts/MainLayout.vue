<template>
  <div>
    <v-loader v-if="loading"></v-loader>
    <div v-else class="app-main-layout">
      <Navbar @click-navbar="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page"></div>
        <router-view />
      </main>

      <div class="fixed-action-btn" v-tooltip="'Новая запись'">
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/app/V-Navbar";
import Sidebar from "../components/app/V-Sidebar";
import VLoader from "../components/app/V-Loader.vue";
export default {
  name: "main-layout",

  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },

  components: {
    Navbar,
    Sidebar,
    VLoader,
  },

  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
      console.log('fetchInfo OK');
    }

    this.loading = false;
  },
};
</script>
