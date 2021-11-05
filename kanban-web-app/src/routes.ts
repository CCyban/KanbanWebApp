import Home from './components/Home.vue'
import Kanbans from './components/Kanbans/Kanbans.vue';
import Kanban from './components/Kanbans/Kanban/Kanban.vue'
import Account from './components/Account/Account.vue';
import CreateAccount from './components/Account/CreateAccount.vue'
import SignIn from './components/Account/SignIn.vue'
import Settings from './components/Account/Settings.vue'
import PrivacyPolicy from './components/Account/PrivacyPolicy.vue'

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
    },
    {
        path: '/user/createaccount',
        component: CreateAccount
    },
    {
        path: '/user/signin',
        component: SignIn
    },
    {
        path: '/user/settings',
        component: Settings
    },
    {
        path: '/user/privacypolicy',
        component: PrivacyPolicy
    },
];