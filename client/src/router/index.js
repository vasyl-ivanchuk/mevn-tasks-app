import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Tasks from '@/components/Tasks';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/tasks', name: 'tasks', component: Tasks },
    { path: '/login', name: 'login', component: Login },
    { path: '*', redirect: '/tasks' },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['login'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = !!store.state.user;

  if (authRequired && !loggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
