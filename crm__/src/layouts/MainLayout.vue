<template>
  <div class="app-main-layout">

    <Navbar @click-navbar=" isOpen = !isOpen"/>

    <Sidebar v-model="isOpen"/>
    
    <main class="app-content"
    :class="{ full: !isOpen }">
      <div class="app-page"></div>
      <router-view />
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/app/V-Navbar'
import Sidebar from '../components/app/V-Sidebar'
export default {
  data(){
    return{
      isOpen: true
    }
  },
  name:'main-layout',
  components:{
    Navbar,
    Sidebar
  }
}
</script>
