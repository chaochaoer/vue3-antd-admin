import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layouts/index.vue'
import type { RouteRecordRaw } from 'vue-router';
import customRouterView from '@/components/customRouterView/index.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [
      /* 首页 start */
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: "index"
        }
      },
      /* 首页 end */

      /* 表单demo start */
      {
        name: 'formDemos',
        path: '/formDemos',
        redirect: '/formDemos/basic',
        component: customRouterView,
        meta: {
          title: '表单',
          icon: "form"
        },
        children: [
          {
            name: 'basic-form',
            path: "/formDemos/basic",
            component: () => import('@/views/formDemos/basic/index.vue'),
            meta: {
              title: '基础表单',
            },
          },
          {
            name: 'async-form',
            path: "/formDemos/async",
            component: () => import('@/views/formDemos/async/index.vue'),
            meta: {
              title: '异步获取数据表单',
            },
          },
          {
            name: 'linkage-form',
            path: "/formDemos/linkage",
            component: () => import('@/views/formDemos/linkage/index.vue'),
            meta: {
              title: '联动表单',
            },
          },
          {
            name: 'custom-form',
            path: "/formDemos/custom",
            component: () => import('@/views/formDemos/custom/index.vue'),
            meta: {
              title: '自定义组件表单',
            },
          }
        ]
      },
      /* 表单demo end */
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    }
  },
  {
    name: "403",
    path: '/403',
    component: () => import('@/views/error/403.vue'),
    meta: {
      hidden: true,
    }
  },
  {
    name: "404",
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
    }
  },
  {
    name: "500",
    path: '/500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      hidden: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true,
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(''),
  routes
});

export default router;
