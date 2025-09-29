import { createApp } from 'vue'
import App from './App.vue'
import router from './router'      // подхватит router/index.js
import './assets/main.css'         // оставь, если файл существует

createApp(App).use(router).mount('#app')

