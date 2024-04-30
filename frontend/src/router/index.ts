import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProfilePage from '@/pages/ProfilePage.vue';
import ArticlesPage from '@/pages/ArticlesPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import CreateArticle from '@/pages/CreateArticle.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/articles'
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticlesPage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/create-article',
    name: 'create-article',
    component: CreateArticle
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router