import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createClient } from "@supabase/supabase-js";

import App from "./App.vue";
import router from "./router";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.config.globalProperties.$supabase = supabase;

app.mount("#app");
