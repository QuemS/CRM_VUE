<template>
  <div>
    <main class="app-content">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Новая запись</h3>
          </div>
          <v-loader v-if="loading"></v-loader>
          <p class="center" v-else-if="!categories.length">
            Категория пока нет
            <router-link to="/categories">Добавить категорию </router-link>
          </p>
          <form class="form" v-else @submit.prevent="submitHendler">
            <div class="input-field">
              <select ref="select" v-model="category">
                <option v-for="c in categories" :key="c.id" :value="c.id">
                  {{ c.title }}
                </option>
              </select>
              <label>Выберите категорию</label>
            </div>

            <p>
              <label>
                <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="income"
                  v-model="type"
                />
                <span>Доход</span>
              </label>
            </p>

            <p>
              <label>
                <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="outcome"
                  v-model="type"
                />
                <span>Расход</span>
              </label>
            </p>

            <div class="input-field">
              <input
                id="amount"
                type="number"
                v-model.number="amount"
                :class="{
                  invalid: v$.amount.$dirty && v$.amount.minValue.$invalid,
                }"
              />
              <label for="amount">Сумма</label>
              <span
                class="helper-text invalid"
                v-if="v$.amount.$dirty && v$.amount.minValue.$invalid"
              >
                Минимальная величина {{ v$.amount.minValue.$params.min }}</span
              >
            </div>

            <div class="input-field">
              <input
                id="description"
                type="text"
                :class="{
                  invalid: v$.discription.$dirty && v$.discription.$invalid,
                }"
                v-model="discription"
              />
              <label for="description">Описание</label>
              <span
                class="helper-text invalid"
                v-if="v$.discription.$dirty && v$.discription.required.$invalid"
                >Введите описания записи</span
              >
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Создать
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
import M from "materialize-css";
import VLoader from "../components/app/V-Loader.vue";
import { minValue, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "V-Record",
  components: {
    VLoader,
  },

  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: "outcome",
      amount: 1,
      discription: "",
    };
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      console.log(this.info);
      return this.info.bill >= this.amount;
    },
  },

  methods: {
    async submitHendler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (this.canCreateRecord) {
        console.log("ok");
        try {
          await this.$store.dispatch("createRecord", {
            category: this.category,
            amount: this.amount,
            discription: this.discription,
            type: this.type,
            date: new Date().toJSON(),
          });

          const newBill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
              console.log(newBill);

          await this.$store.dispatch("updateInfo", { bill: newBill } );
          this.amount = 1;
          this.discription = '';
          this.v$.$reset();
          this.$message('Запись успешно добавлена')

        } catch (error) {
          this.$error(error);
        }
      } else {
        console.log(this.info);
        this.$message(
          `Недостаточно на счете (${this.amount - this.info.bill})`
        );
      }
    },
  },

  validations: {
    discription: { required },
    amount: { minValue: minValue(1) },
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategory");
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  onUnmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
      console.log(this.select);
    }
  },
};
</script>
