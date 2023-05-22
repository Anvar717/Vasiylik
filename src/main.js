import Vue from "vue";
// import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from "@vue/composition-api";
import axios from "axios";
import i18n from "@/libs/i18n";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import ApiService from "@/services/api.service";

// Global Components
import "./global-components";

// 3rd party plugins
import "@axios";
import "@/libs/acl";
import "@/libs/portal-vue";
import "@/libs/clipboard";
import "@/libs/toastification";
import "@/libs/sweet-alerts";
import "@/libs/vue-select";
import "@/libs/tour";
import * as VueGoogleMaps from "vue2-google-maps";
import VueMask from "v-mask";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import MyPlugin from "@/plugins/notification.plugin";
Vue.use(MyPlugin);
Vue.component("date-picker", DatePicker);
Vue.use(VueMask);
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
axios.defaults.baseURL = "http://vasiylik-api.apptest.uz/"
if (window.location.href.indexOf("http://mu.maktab.uz") > -1) {
  axios.defaults.baseURL = "http://mu-api.maktab.uz";
}
if (window.location.href.indexOf("https://mu.maktab.uz") > -1) {
  axios.defaults.baseURL = "https://mu-api.maktab.uz";
}
const token = localStorage.getItem("auth_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const requestInterceptor = (request) => {
  request.withCredentials = true;
  return request;
};
axios.interceptors.request.use((request) => requestInterceptor(request));

ApiService.mount401Interceptor();
// BSV Plugin Registration
// Vue.use(ToastPlugin)
// Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI);
// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require("@core/assets/fonts/feather/iconfont.css"); // For form-wizard

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBJezTcA6efW5eT6ADhaaTB2v9U0R9RQCk",
    libraries: "places",
    async: true,
    defer: true,
  },
});
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
