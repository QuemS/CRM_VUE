<template>
  <form class="card auth-card" @submit.prevent="submitForm()">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          @blur="v$.email.$touch"
          :class="{ invalid: v$.email.$dirty && v$.email.$invalid }"
        />

        <label for="email">Email</label>

        <small
          class="helper-text invalid"
          v-if="email.length == 0 && v$.email.$invalid && v$.email.$dirty"
          >Поле Email не должно бить пустим</small
        >
        <small
          class="helper-text invalid"
          v-if="v$.email.$invalid && v$.email.$dirty && email.length >= 1"
          >Введите коректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          @blur="v$.password.$touch"
          :class="{ invalid: v$.password.$dirty && v$.password.$invalid }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="
            password.length == 0 && v$.password.$invalid && v$.password.$dirty
          "
          >Поле Password не должно бить пустим</small
        >
        <small
          class="helper-text invalid"
          v-if="
            v$.password.$invalid && v$.password.$dirty && v$.password.minLength
          "
          >Пароль должен состоять не меншее
          {{ v$.password.minLength.$params.min }} символов
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { minLength, required, email } from "@vuelidate/validators";
import messages from "../utils/messages";

export default {
  names: "login",
  setup() {
    return {};
  },

  data() {
    return {
      v$: useVuelidate(),
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
    };
  },

  methods: {
    async submitForm() {
      if (this.v$.$invalid) return;
    
    try {
      await this.$store.dispatch("login", {email : this.email, password: this.password});
      
    }catch(e){console.log(e)}
        
      
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }

    
  },


};
</script>


