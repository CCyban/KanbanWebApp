import Home from './components/Home.vue'
import Kanbans from './components/Kanbans/Kanbans.vue';
import Kanban from './components/Kanbans/Kanban/Kanban.vue'
import Account from './components/Account/Account.vue';
import { RouteConfig } from 'vue-router';

export const routes: Array<RouteConfig> = [
    {
        path: '',
        component: Home
    },
    {
        path: '/kanban',
        component: Kanbans,
    },
    {
        path: '/kanban/:id',
        component: Kanban
    },
    {
        path: '/user',
        component: Account
    }
];