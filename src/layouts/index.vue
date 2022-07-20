  <template>
  <a-layout class="layout">
    <a-drawer v-if="isMobile" v-model:visible="visible" placement="left" :closable="false" width="auto"
      :bodyStyle="{ padding: 0 }">
      <a-layout-sider :trigger="null" v-model:collapsed="collapsed" style="height:100%" collapsible>
        <sideBar />
      </a-layout-sider>
    </a-drawer>
    <a-layout-sider v-else v-model:collapsed="collapsed" :trigger="null" collapsible>
      <sideBar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <navBar>
          <menu-unfold-outlined v-if="collapsed" @click="!handleFold()" class="trigger" />
          <menu-fold-outlined v-else @click="handleFold" class="trigger" />
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
import enquireJs from 'enquire.js'
const collapsed = ref<boolean>(false)
const visible = ref<boolean>(false)
const isMobile = ref<boolean>(false)

const handleFold = () => {
  if (isMobile.value) {
    visible.value = !visible.value
    return collapsed.value = false
  }
  return collapsed.value = !collapsed.value
}
enquireJs.register('only screen and (max-width: 576px)', {
  match: function () {
    isMobile.value = true
    collapsed.value = false
  },
  unmatch: function () {
    isMobile.value = false
    collapsed.value = false
    visible.value = false
  }
})
enquireJs.register('only screen and (max-width: 768px)', {
  match: function () {
    collapsed.value = true
  },
})
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