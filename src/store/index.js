import { createStore } from 'vuex';
import getters from './getters';
import user from './modules/user';

// 导入modules里面的文件
const modules = {
  user,
};
const store = createStore({
  modules,
  getters
});

export default store;
