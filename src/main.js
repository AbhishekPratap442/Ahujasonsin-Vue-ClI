import { createApp } from 'vue'
import App from './App.vue'
import ProductPage from './components/ProductPage.vue'
import SingleProductPage from './components/SingleProductPage.vue'
import {createRouter,createWebHashHistory} from "vue-router";



const routes = [
    {
       path: '/', component: ProductPage, props:true
       },   
    {
       path: '/product/:id_product', component: SingleProductPage ,
       },   
  ]
 

  const router =createRouter({
    history:createWebHashHistory(),
    routes, // short for `routes: routes`
  })
  
  const app = createApp(App)

  app.use(router)
  
  app.mount('#app')
  
