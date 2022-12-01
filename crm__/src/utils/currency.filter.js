export default {
  install: (app) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$currencyFilter = (value, currrency = "UAH") => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return new Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency: currrency,
      }).format(value);
    }
  }
}



