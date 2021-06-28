import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import Vuex from 'vuex';
import store from "./store/store";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/test",
      name: "Test",
      component: () => import("./components/Test.vue"),
      meta: {
          breadcrumb: [
              { title: "Home", url: "/" },
              { title: "test",active:true }
          ]
      },
      pageTitle: "Test",
      rule: "editor"
  },
  ],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
