import {createWebHistory, createRouter} from "vue-router";
import HomeView from "@/views/HomeView";

const routes = [
    {
        path:"",
        name:"home",
        component:HomeView,


    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router