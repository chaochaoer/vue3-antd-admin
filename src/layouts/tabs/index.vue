<template>
  <div class="tabsContainer">
    <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit" :tabBarStyle="{margin:'0'}">
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable"></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue'
export default defineComponent({
  components: {
    Tabs, TabPane
  },
  setup() {
    const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>(
      new Array(20).fill(null).map((_, index) => {
        const id = String(index + 1);
        return { title: `Tab ${id}`, content: `Content of Tab Pane ${id}`, key: id };
      }),
    );
    const activeKey = ref(panes.value[0].key);
    const newTabIndex = ref(0);

    const add = () => {
      activeKey.value = `newTab${newTabIndex.value++}`;
      panes.value.push({
        title: `New Tab ${activeKey.value}`,
        content: `Content of new Tab ${activeKey.value}`,
        key: activeKey.value,
      });
    };

    const remove = (targetKey: string) => {
      let lastIndex = 0;
      panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      panes.value = panes.value.filter(pane => pane.key !== targetKey);
      if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = panes.value[lastIndex].key;
        } else {
          activeKey.value = panes.value[0].key;
        }
      }
    };

    const onEdit = (targetKey: string) => {
      remove(targetKey);
    };

    return {
      panes,
      activeKey,
      onEdit,
      add,
    };
  },
});
</script>
<style scoped lang="scss">
.tabsContainer {
  width: 100%;
  background: #fff;
}

:deep(.ant-tabs) {
  .ant-tabs-nav {
    padding: 4px 20px 0 10px;
    background-color: white;
    user-select: none;
  }

  .ant-tabs-tabpane {
    display: none;
  }

  .ant-tabs-tab-remove {
    display: flex;
    padding: 0;
    margin: 0;

    .anticon-close {
      padding-left: 6px;
    }
  }

  .ant-tabs-tab:not(.ant-tabs-tab-active) {
    .ant-tabs-tab-remove {
      width: 0;
    }

    .anticon-close {
      width: 0;
      visibility: hidden;
      transition: width 0.3s;
    }

    &:hover {
      .anticon-close {
        width: 16px;
        visibility: visible;
        padding-left: 6px;
      }

      .ant-tabs-tab-remove {
        width: unset;
      }
    }
  }
}
</style>

