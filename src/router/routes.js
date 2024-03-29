const routes = [
  {
    path: "/",
    name:"home",
    component: () => import("layouts/MainLayout.vue")
  },
  {
    path:"/addtram",
    name:"addtram",
    component: () => import("layouts/AddTramLayout.vue")
  },
  {
    path:"/chitiet/:matram",
    name:"chitiet",
    component:() => import("layouts/ChiTietLayout.vue")
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
