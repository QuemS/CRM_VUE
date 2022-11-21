<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && v$.title.required.$invalid }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && v$.title.required.$invalid"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: v$.limit.$dirty && v$.limit.minValue.$invalid }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
            >Минимальная величина {{ v$.limit.minValue.$params.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Редактировать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import { minValue, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["categories"],
  setup() {
    return { v$: useVuelidate() };
  },
  created() {
    if (this.categories.length) {
      const { id, title, limit } = this.categories[0];
      this.current = id;
      this.title = title;
      this.limit = limit;
    }
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 50,
      current: null,
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(50) },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        let data = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", data);
        this.$message(`Категория успешно изменна`);
        this.$emit('updateCategory',data)
        this.v$.$reset();
      } catch (error) {
        console.log(error);
        this.$error(error);
      }
    },
  },
  watch: {
    current(catId) {
      return this.categories.filter((item) => {
        if (item.id == catId) {
          this.current = item.id;
          this.title = item.title;
          this.limit = item.limit;
        }
      });
    },
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  onUnmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
      console.log(this.select);
    }
  },
};
</script>
