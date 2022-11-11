<template>
  <div>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <div class="pointer">
            <a href="#" @click.prevent="$emit('click-navbar')"
              ><i class="material-icons black-text">dehaze</i></a
            >
          </div>

          <span class="black-text">{{dateFilter('datetime')}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
            >
              USER NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout()">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  computed: {
   
  },

  data() {
    return {
      options:{},
      date: new Date(),
      interval: null,
      dropdowm: null,
    };
  },
  methods: {
     dateFilter(format ='date'){

      if (format.includes('date')) {
        this.options.day = '2-digit'
        this.options.month = 'long'
        this.options.year = 'numeric'
      }

      if (format.includes('time')) {
        this.options.hour = '2-digit'
        this.options.minute ='2-digit'
        this.options.second ='2-digit'
      }
      return Intl.DateTimeFormat('ru-Ru',this.options).format(this.date)
    },

    logout() {
      console.log("logout");
      this.$router.push("/login?message=logout");
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    });
  },

  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
