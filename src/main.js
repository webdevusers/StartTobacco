import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from 'vue-i18n';
import { translations } from './i18n/translations.js';

const i18n = createI18n({
    locale: 'ua',
    messages: translations,
});

const app = createApp(App);

app.use(router);
app.use(i18n)
app.mount("#app");