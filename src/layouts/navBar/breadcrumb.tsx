import { Breadcrumb } from 'ant-design-vue'
import { defineComponent, reactive, watch,  onMounted } from 'vue';
import type { RouteLocationMatched } from 'vue-router';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'breadCrumb',
  components: {
    Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item
  },
  setup() {
    const route = useRoute();
    const state = reactive<{
      breadList: RouteLocationMatched[];
    }>({
      breadList: []
    });
    onMounted(() => {
      getBreadCrumb();
    });
    const getBreadCrumb = () => {
      const matched = route.matched.filter(item => item.meta && item.meta.title);
      state.breadList = matched;
    };
    watch(
      () => route.path,
      () => getBreadCrumb()
    );
    return () => (
      <>
        <a-breadcrumb separator=">>">
          {
            state.breadList.map((item) => (
              <a-breadcrumb-item key={item.path}>
                <router-link to={item.path}>{item.meta.title}</router-link>
              </a-breadcrumb-item>
            ))
          }
        </a-breadcrumb>
      </>
    )
  }
});