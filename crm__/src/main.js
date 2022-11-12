import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'materialize-css/dist/js/materialize.js'
import messagePlugin from '@/utils/messagePlugin'





createApp(App)
    .use(messagePlugin)
    .use(store)
    .use(router)
    .mount('#app')


