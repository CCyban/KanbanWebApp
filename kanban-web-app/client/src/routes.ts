import Home from './components/Home.vue'
import Kanbans from './components/Kanbans/Kanbans.vue';
import Kanban from './components/Kanbans/Kanban/Kanban.vue'
import Account from './components/Account/Account.vue';
import CreateAccount from './components/Account/CreateAccount.vue'
import SignIn from './components/Account/SignIn.vue'
import Settings from './components/Account/Settings.vue'
import PrivacyPolicy from './components/Account/PrivacyPolicy.vue'
import ChangePassword from './components/Account/ChangePassword.vue'
import DeleteAccount from './components/Account/DeleteAccount.vue'

import { RouteConfig } from 'vue-router';

export const routes: Array<RouteConfig> = [
    {
        path: '',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/Kanban',
        name: 'Kanbans',
        component: Kanbans,
        props: true
    },
    {
        path: '/Kanban/:id',
        name: 'Kanban',
        component: Kanban,
        props: true
    },
    {
        path: '/Account',
        name: 'Account',
        component: Account,
        props: true
    },
    {
        path: '/Account/Create',
        name: 'CreateAccount',
        component: CreateAccount,
        props: true
    },
    {
        path: '/Account/SignIn',
        name: 'SignIn',
        component: SignIn,
        props: true
    },
    {
        path: '/Account/Settings',
        name: 'Settings',
        component: Settings,
        props: true
    },
    {
        path: '/Account/PrivacyPolicy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy
    },
    {
        path: '/Account/ChangePassword',
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        path: '/Account/Delete',
        name: 'DeleteAccount',
        component: DeleteAccount
    }
];