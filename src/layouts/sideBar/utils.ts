import type { RouteRecordRaw as _RouteRecordRaw } from 'vue-router';
export type RouteRecordRaw = _RouteRecordRaw
/* 是否存在有效的route */
export const hasRoute = (route: RouteRecordRaw[] | undefined) => {
  return route?.some(route => !route.meta?.hidden)
}
