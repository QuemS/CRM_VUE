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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          @blur="v$.name.$touch"
          :class="{
            invalid:
              name.length <= v$.name.minLength.$params.min && v$.name.$dirty,
          }"
        />

        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="name.length <= v$.name.minLength.$params.min && v$.name.$dirty"
        >
          Имя некоректое
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { minLength, required, email } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { minLength: minLength(4), required },
      agree: { checked: (v) => v },
    };
  },
  methods: {
    async submitForm() {
      console.log(this.v$.password.minLength.$params.min);
      if (this.v$.$invalid) return;

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch("registerUser", formData);
        console.log(formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
