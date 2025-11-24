import { createApp } from 'vue';
import App from './App.vue';

// Si luego usas router, lo importamos aquí:
// import router from './router';

const app = createApp(App);

// app.use(router);

app.mount('#app');
