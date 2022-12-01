<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>{{ dateFilter(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data() {
    return {
      options: {},
    };
  },
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
  methods: {
    currencyFilter(value, currrency = "UAH") {
      return new Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency: currrency,
      }).format(value);
    },
    dateFilter(date, format = "datetime") {
      if (format.includes("date")) {
        this.options.day = "2-digit";
        this.options.month = "long";
        this.options.year = "numeric";
      }

      if (format.includes("time")) {
        this.options.hour = "2-digit";
        this.options.minute = "2-digit";
        this.options.second = "2-digit";
      }
      return Intl.DateTimeFormat("ru-Ru", this.options).format(
        Date.parse(date)
      );
    },
  },
};
</script>
