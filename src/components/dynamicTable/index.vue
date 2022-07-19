<template>
  <div class="tableContainer">
    <queryForm ref="queryFormRef" :queryFormSchema="queryFormSchema" v-if="search" :handleSearch="getTableData" />
    <a-tabs v-model:activeKey="activeKey" @change="tableTabChange" style="background:white;padding:10px 20px;">
      <a-tab-pane v-for="item in tableTabList" :key="item.key" :tab="item.tab" />
      <template #rightExtra>
        <slot name="rightExtra" :activeKey="activeKey" />
      </template>
    </a-tabs>
    <a-table :columns="handleColumns(activeKey)" :dataSource="dataSource" :loading="loading"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :rowKey="(record: any) =>
      record[rowKey]" :pagination="Object.assign(paginationOptions, paginationDefaultOptions)"
      @change="tablePageChange" :bordered="customDragCol">
      <template #bodyCell="{ column, record }">
        <tableAction v-if="column.key === 'action'" :actions="column.action(record)"></tableAction>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, onUpdated, ref, type PropType, reactive, computed } from 'vue';
import customDragCol from './hooks';
import { type TableProps } from 'ant-design-vue';
import type { FormSchema } from "@/components/dynamicForm/types";
import queryForm from './components/queryForm/index.vue'
import tableAction from './components/tableAction'
import { TableColumnItem, TableTabList, SelectedRowKey, SearchListCache } from './types'
import type { BaseResponse } from "@/service/request"

export default defineComponent({
  name: 'dynamicTable',
  props: {
    /* 表格获取数据原始接口 */
    dataRequest: {
      required: true,
      type: Function as PropType<(args: API.TableListParams) => Promise<
        BaseResponse<API.TableListResult>
      >>
    },
    /* 动态获取表格项 */
    handleColumns: {
      required: true,
      type: Function as PropType<(active: number) => TableColumnItem[]>
    },
    /* 是否允许用户拖拽cellHeader */
    customDragCol: {
      type: Boolean,
      default: false
    },
    /* tab组件的参数 */
    tableTabList: {
      type: Array as PropType<TableTabList>,
      required: true,
    },
    /* 有复选框时，用哪个key作为id */
    rowKey: {
      type: String,
      default: 'id'
    },
    /* 检索组件动态表单数据 */
    queryFormSchema: {
      type: Object as PropType<FormSchema>,
      required: true
    },
    /* 是否展示检索框 */
    search: {
      type: Boolean,
      default: true
    },
  },
  components: { queryForm, tableAction },
  setup(props) {
    /* 选中了第几个tabs */
    const activeKey = ref<number>(0)
    // onUpdated(() => {
    //   props.customDragCol && customDragCol({ columns: reactive(props.handleColumns(activeKey.value)), mode: 'line' });
    // });
    const state = reactive<{
      dataSource: any[],
      selectedRowKeys: SelectedRowKey[],
      loading: boolean
    }>({
      dataSource: [],
      selectedRowKeys: [],
      loading: false
    })
    const queryFormRef = ref()
    /* 延迟获取数据，防止数据获取太快loading闪动 */
    const _delay = async (result: any, timeStamp = 1e2): Promise<any> => {
      return await new Promise(resolve => setTimeout(() => resolve(result), timeStamp));
    }
    /* 表格复选框选择 */
    const onSelectChange = (selectedRowKeys: SelectedRowKey[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    /* 表格上面的tab */
    const tableTabChange = (active: number) => {
      activeKey.value = active
      getTableData('init')
    }
    /* 搜索框数据缓存 */
    let searchListCache: SearchListCache = {}

    /* 分页数据 */
    let paginationOptions = reactive({
      total: 0,
      current: 1,
      pageSize: 10,
    })
    let paginationDefaultOptions = reactive({
      defaultPageSize: 10,
      showTotal: (total: number) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '30', '40', '100'],
      showSizeChanger: true,
      showLessItems: true,
      showQuickJumper: true,
    })

    /* 获取表格数据 */
    const getTableData = async (type: 'merge' | 'init', options?: SearchListCache) => {
      state.loading = true
      let filteredOptions = type === 'merge' ? handleMergeData(options) : handleInitData()
      let result = await _delay(props.dataRequest && await props.dataRequest({ ...filteredOptions }))
      let { rows, total } = result.data
      state.dataSource = rows
      paginationOptions.total = total
      state.loading = false
    }

    // 合并表格数据，搜索框，tabs，分页数据合并
    const handleMergeData = (options?: SearchListCache) => {
      searchListCache = options || searchListCache
      let tabActiveIndex = activeKey.value
      let tabKey = props.tableTabList[tabActiveIndex].requestKey
      let tabValue = props.tableTabList[tabActiveIndex].requestValue
      return {
        ...searchListCache,
        page: paginationOptions.current,
        rows: paginationOptions.pageSize,
        [tabKey]: tabValue
      }
    }
    // 初始化表格数据
    const handleInitData = () => {
      queryFormRef.value?.dynamicFormRef.formRef.resetFields()
      /* 数据初始化分页组件初始化 */
      paginationOptions.total = 0
      paginationOptions.current = 1
      paginationOptions.pageSize = 10
      /* 复选框组件初始化 */
      state.selectedRowKeys = []
      searchListCache = {}
      let tabActiveIndex = activeKey.value
      let tabKey = props.tableTabList[tabActiveIndex].requestKey
      let tabValue = props.tableTabList[tabActiveIndex].requestValue
      return {
        page: paginationOptions.current,
        rows: paginationOptions.pageSize,
        [tabKey]: tabValue
      }
    }

    /* 点击分页执行 */
    const tablePageChange: TableProps['onChange'] = ({ current, pageSize }, filters, sorter, { currentDataSource }) => {
      paginationOptions.pageSize = pageSize!
      paginationOptions.current = current!
      getTableData('merge')
      console.log(current, pageSize, currentDataSource, "pagination, filters, sorter")
    }
    getTableData('init')
    return {
      ...toRefs(state),
      queryFormRef,
      activeKey,
      paginationOptions,
      paginationDefaultOptions,
      onSelectChange,
      tableTabChange,
      tablePageChange,
      getTableData
    }
  }
});

</script>
<style scoped lang="scss">
.tableContainer {
  margin: 20px;
  box-sizing: border-box;
}

.noOperate {
  color: $baseBlueColor;
}

:deep(.ant-table-empty) .ant-table-body {
  overflow-x: inherit !important;
  overflow-y: inherit !important;
}

:deep(.ant-table) {
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 7px;
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
</style>