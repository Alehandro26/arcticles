import { createRouter, createWebHistory } from "vue-router";

import PageMain from "../pages/PageMain.vue";
import PageArticle from "../pages/PageArticle.vue";

export default createRouter({
  history: createWebHistory('/articles/'),
  routes: [
    {
      path: "/",
      name: "main",
      component: PageMain,
    },
    {
      path: "/article/:id?",
      name: "article",
      component: PageArticle,
    },
  ],
});