import type { TableColumnType } from 'ant-design-vue';
import type { ActionItem } from './components/tableAction'

/* 表格操作栏 */
export type ColumnParams<T = any> = {
  record: T;
  text: string;
  index: number;
  column: TableColumnType;
};

/* 表格数据格式规范 */
export interface TableColumnItem<T = any> extends Omit<TableColumnType, 'dataIndex' | 'key'> {
  title: string;
  dataIndex: keyof T | 'action';
  key: keyof T | 'action';
  width?: number;
  action?: (params: ColumnParams<T>) => ActionItem[];
}

/* 表格的tab传递的参数 */
export type TableTab = {
  key: number,
  tab: string,
  requestKey: string,
  requestValue: string
}
export type TableTabList = TableTab[]

/* 表格选中的key */
export type SelectedRowKey = string | number;

/* 检索缓存 */
export type SearchListCache = { [key: string]: any }


