import Home from './components/Home.vue'
import Kanbans from './components/Kanbans.vue';
import Account from './components/Account.vue';

export const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/kanbans',
        component: Kanbans
    },
    {
        path: '/user',
        component: Account
    }
];