const getters = {
  tabType: state => state.tab.currentTab,
  accessRoute: state => state.permission.accessRoute,
  accessBaseRoute: state => state.permission.accessBaseRoute,
  accessOperate: state => state.permission.accessOperate
};
export default getters;
