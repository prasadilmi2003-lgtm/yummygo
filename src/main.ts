import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const savedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark
document.documentElement.classList.toggle('dark', shouldUseDark)

createApp(App).use(router).mount('#app')