import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'materialize-css/dist/js/materialize.js'
import messagePlugin from '@/utils/messagePlugin'

import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'





const firebaseConfig = {
  apiKey: "AIzaSyCfOTxOGpXoWnXfcovNt1wEteJEMpn7GUo",
  authDomain: "vue-crm-work.firebaseapp.com",
  projectId: "vue-crm-work",
  storageBucket: "vue-crm-work.appspot.com",
  messagingSenderId: "442684899098",
  appId: "1:442684899098:web:7bccf3aa5b59395af3b6a3",
  measurementId: "G-SN1TL1Q382"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let appInvert

onAuthStateChanged(auth, () => {
  if (!appInvert) {
    appInvert = createApp(App)
      .use(messagePlugin)
      .use(store)
      .use(router)
      .mount('#app')
  }


})




