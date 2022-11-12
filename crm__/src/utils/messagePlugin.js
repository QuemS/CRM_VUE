
import M from 'materialize-css'
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$message = (html) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return M.toast({html},options)
    }

    app.config.globalProperties.$error = (html) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return M.toast({html:`[Ошибка]: ${html}`},options)
    }
  }
}
