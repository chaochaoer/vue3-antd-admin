import { getWholeAccessTree, getUserAccessIdList } from '@/api/permission';
import generatorRouteAndOperate from '@/permission';
const state = {
  accessRoute: {},
  accessOperate: {},
  accessBaseRoute: {}
};
const mutations = {
  SET_USER_ACCESS_ROUTE(state, accessRoute) {
    state.accessRoute = accessRoute;
  },
  SET_BASE_USER_ACCESS_ROUTE(state, accessBaseRoute) {
    state.accessBaseRoute = accessBaseRoute;
  },
  SET_USER_ACCESS_OPERATE(state, accessOperate) {
    state.accessOperate = accessOperate;
  }
};
const actions = {
  setUserAccessRoute({ commit }, accessRoute) {
    commit('SET_USER_ACCESS_ROUTE', accessRoute);
    return accessRoute;
  },
  setBaseUserAccessOperate({ commit }, accessBaseRoute) {
    commit('SET_BASE_USER_ACCESS_ROUTE', accessBaseRoute);
    return accessBaseRoute;
  },
  setUserAccessOperate({ commit }, accessOperate) {
    commit('SET_USER_ACCESS_OPERATE', accessOperate);
    return accessOperate;
  },
  async setUserAccess({ dispatch }) {
    const wholeAccessTree = (await getWholeAccessTree()).data;
    const currentUserAccess = (await getUserAccessIdList()).data;
    const { accessRoute, accessOperate, accessBaseRoute } = generatorRouteAndOperate(
      wholeAccessTree,
      currentUserAccess
    );
    await dispatch('setUserAccessRoute', accessRoute);
    await dispatch('setBaseUserAccessOperate', accessBaseRoute);
    await dispatch('setUserAccessOperate', accessOperate);
    return { accessRoute, accessOperate };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
