declare namespace API {
  /** 全局通过表格查询返回结果 */
  type TableListResult<T = any> = {
    rows: T;
    total: string | number;
  };
  /* 获取列表传递的参数 */
  type TableListParams<T = any> = {
    page: number // 第几页
    rows: number  // 一页多少条
  } & {
      [P in keyof T]?: T[P]
    }
}
