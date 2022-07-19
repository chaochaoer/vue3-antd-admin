  <template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible
      :style="{ width: !collapsed ? 0 : '250px' }">
      <sideBar></sideBar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <navBar>
          <menu-unfold-outlined v-if="collapsed" @click="() => (collapsed = !collapsed)" class="trigger" />
          <menu-fold-outlined v-else @click="() => (collapsed = !collapsed)" class="trigger" />
        </navBar>
      </a-layout-header>
      <a-divider style="height: 1px; background-color: #eee;margin: 0;" />
      <!-- <tabs></tabs> -->
      <a-layout-content class="layout-content">
        <customRouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import sideBar from './sideBar';
import navBar from './navBar/index.vue';
import tabs from './tabs/index.vue';
import { ref, watch } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import customRouterView from '@/components/customRouterView/index.vue';
const collapsed = ref<boolean>(false)
</script>
<style scoped lang="scss">
.layout {
  height: 100vh;
  display: flex;

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background: #949494;
    }

    &::-webkit-scrollbar-track {
      border-radius: 0;
      background: transparent;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}

.trigger {
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>