import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
// import Sidebar from "../components/Sidebar.vue";
import Dashboard from "../views/Dashboard.vue";
import AboutUs from "../views/About.vue";
import AddEvent from "../components/AddEvent.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path:"/aboutus",
    name:"AboutUs",
    component:AboutUs,
    meta: {
        tokenRequired: false
    }
  },
  {
    path:"/dashboard",
    name:"dashboard",
    component:Dashboard ,
    meta: {
        tokenRequired: false
    }
  },
  {
    path:"/addevent",
    name:"AddEvent",
    component:AddEvent,
    meta: {
        tokenRequired: false
    }
  },
  // {
  //   path:"/imageupload",
  //   name:"imageupload",
  //   component:imageupload,
  //   meta: {
  //       tokenRequired: false
  //   }
  // },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
