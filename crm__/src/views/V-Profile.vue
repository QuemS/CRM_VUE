<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Профиль</h3>
          </div>

          <form class="form" @submit.prevent="submitHendler()">
            <div class="input-field">
              <input
                id="name"
                type="text"
                v-model.trim="name"
                @blur="v$.name.$touch"
                :class="{
                  invalid:
                    name.length <= v$.name.minLength.$params.min &&
                    v$.name.$dirty,
                }"
              />

              <label for="name">Имя</label>
              <small
                class="helper-text invalid"
                v-if="
                  name.length <= v$.name.minLength.$params.min && v$.name.$dirty
                "
              >
                Имя некоректое
              </small>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </form>
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
import useVuelidate from '@vuelidate/core';
import { minLength ,required } from '@vuelidate/validators';
export default {
  data() {
    return {
      v$:useVuelidate(),
      name: "",
    };
  },
  methods: {
    async submitHendler() {
      
      if (this.v$.$invalid) return;
      console.log(this.name);
      await this.$store.dispatch("updateInfo", { name: this.name } );
    },
  },
  validations(){
    return{
      name: {minLength:minLength(4), required}
    }
  }
 
};
</script>
