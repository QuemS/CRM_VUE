<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { minValue, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import M from "materialize-css";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      limit: 50,
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
        const category = await this.$store.dispatch('createCategory',{
          title:this.title,
          limit:this.limit
        })
        this.title = '';
        this.limit = 50;
        this.v$.$reset();
        this.$message(`Категория ${category.title} была созданна`);
        this.$emit('createdCategory',category);
      } catch (e){
        console.log(e);
      }
    },
  },
  mounted() {
    M.updateTextFields();
  },
};
</script>
