import { login } from '@/api/login';

import { getCache, setCache } from '@/utils/cache';
const state = {
  token: getCache('accessToken') || ''
};

const mutations = {

};

const actions = {
  codeLogin({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await login(params);
        setCache('accessToken', result.data.accessToken);
        resolve(result);
      } catch (e) {
        reject('');
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
