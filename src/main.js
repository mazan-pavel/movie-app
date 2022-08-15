import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/bootstrap";
import Router from "vue-router"

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({
  mode: "history",
  rotes: [
    {
      path: "/",
      name: "root",
      components: "App",
    },
  ],
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
