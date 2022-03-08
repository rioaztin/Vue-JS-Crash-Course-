import {createRouter, createWebHistory} from 'vue-router'
import About from '../views/About'
import Home from '../views/Home'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: About
    }
]

const router = createRouter({
    // eslint-disable-next-line no-undef
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router