import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/pages/LoginPage';
import TasksPage from '@/pages/TasksPage';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '*',
      redirect: '/tasks',
    },
  ],
});

export function beforeEach(to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = store.getters['user/isAuthenticated'];
    if (!loggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => beforeEach(to, from, next));

export default router;
