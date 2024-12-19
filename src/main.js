import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router configuration
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Tambahkan JavaScript Bootstrap agar modal dan fitur lain bekerja

const app = createApp(App);

app.use(router); // Tambahkan router ke aplikasi
app.mount('#app');
