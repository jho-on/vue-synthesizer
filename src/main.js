import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import Keyboard from './components/Keyboard.vue'
import Key from './components/Key.vue'

const app = createApp(App)

app
    .component('Keyboard', Keyboard)
    .component('Key', Key)

app.mount('#app')
