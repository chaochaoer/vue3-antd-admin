import { defineComponent, reactive, watch, onMounted } from 'vue';
import { useRoute, type RouteLocationNormalized } from 'vue-router';
import { routes } from '@/router';
import type { RouteRecordRaw } from "./utils"
import menuItem from './menuItem'; // 普通的一项
import subMenuItem from './subMenuItem'; // 带子菜单的项
import { hasRoute } from "./utils"
export default defineComponent({
  name: 'sideBar',
  components: {
    menuItem,
    subMenuItem,
  },
  setup() {
    const route: RouteLocationNormalized = useRoute();
    const state = reactive<{
      routes: RouteRecordRaw[],
      getSelectPath: string[],
      openKeys: string[]
    }>({
      routes,
      getSelectPath: [],
      openKeys: []
    });
    onMounted(() => {
      // 手动输入路由时，带有子菜单的路由会自动展开，
      // 输入没有子菜单的路由时，已经展开的带有子菜单的aside会自动合起
      try {
        state.getSelectPath = [route.matched[2] ? route.matched[2].path : route.matched[1].path];
        state.openKeys = [route.matched[1]?.path];
      } catch (err) { }
    });
    watch(
      () => route.path,
      () => {
        try {
          state.getSelectPath = [route.matched[2] ? route.matched[2].path : route.matched[1].path];
          state.openKeys = [route.matched[1]?.path];
        } catch (err) { }
      }
    );

    return () => (
      <a-menu mode="inline" theme="dark" v-model:selectedKeys={state.getSelectPath} v-model:open-keys={state.openKeys}>
        {{
          default: () => (
            routes[0]['children']?.map((route) => (
              <>
                {(!route.meta?.hidden && !hasRoute(route.children)) ? <menu-item key={route.path} currentRoute={route} /> : null}
                {(!route.meta?.hidden && hasRoute(route.children)) ? <sub-menu-item key={route.path} currentRoute={route} /> : null}
              </>
            ))
          )
        }}

      </a-menu>
    )
  }
});


