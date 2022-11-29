<template>
  <ul class="app-sidenav sidenav" :class="{ open: modelValue }">
    
    <router-link
      v-for="link in links"
      :key="link.url"
      active-class="active"
      :to="link.url"
      :exact="link.exect"
    >
      <li>
        <a href="#" class="waves-effect waves-orange pointer">{{
          link.title
        }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["modelValue"],
  data() {
    return {
      links: [
        { title: "Счет", url: "/", exect: true },
        { title: "История", url: "/history" },
        { title: "Планирование", url: "/planning" },
        { title: "Новая запись", url: "/record" },
        { title: "Категории", url: "/categories" },
      ],
    };
  }
};
</script>
