<template>
  <div class="login-content">
    <div style="margin-bottom:30px;">
      <img src="./../../assets/images/logo.png" style="width: 40px;margin-right: 10px;">
      <span style="font-weight: bolder;font-size: 30px;">vue3-antd-admin</span>
    </div>
    <a-form :ref="setRef" :model="loginForm" :rules="rules" @submit.prevent="loginHandle">
      <a-form-item name="userId">
        <a-input v-model:value="loginForm.userId" type="text" placeholder="请输入您的账号">
          <template #prefix>
            <svg-icon icon="account" :size="20"></svg-icon>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="loginForm.password" type="password" placeholder="请输入您的密码">
          <template #prefix>
            <svg-icon icon="password" :size="20"> </svg-icon>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(70% - 12px)' }" name="code">
          <a-input type="text" placeholder="请输入验证码" v-model:value="loginForm.code">
            <template #prefix>
              <svg-icon icon="capatha" :size="20"> </svg-icon>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(30%)' }">
          <canvas id="code" style="width: 100%; height: 48px" :ref="setRef"></canvas>
        </a-form-item>
        <a-checkbox v-model:checked="rememberPwd"> 记住密码 </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :style="{ fontSize: '18px' }" block> 登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import createCanvasCode from '@/utils/createCanvasCode';
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { message } from 'ant-design-vue';
import { getCache, setCache, removeAll } from '@/utils/cache';
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex"
import validate from '@/utils/validate';
import { login } from '@/api/login'

export default defineComponent({
  name: 'login',
  setup() {
    const store = useStore()
    const arrRef = ref<any[]>([]);
    const setRef = (el: any) => {
      arrRef.value.push(el);
    };
    const router = useRouter();
    const state = reactive({
      title: process.env.VUE_APP_BASE_NAME,
      loginForm: {
        userId: '', // 用户帐号
        password: '', // 用户密码
        code: ''
      },
      rules: {
        userId: validate(true, "change", (rule, value) => {
          return Promise.resolve();
        }),
        password: validate(true, "change", (rule, value) => {
          if (value.length < 6) return Promise.reject('请输入最少6位密码');
          else return Promise.resolve();
        }),
        code: validate(true, "change", (rule, value) => {
          // if (!(value.toLowerCase() === state.code)) return Promise.reject('请核对您的验证码');
          // else
          return Promise.resolve();
        })
      },
      code: '', // 验证码
      rememberPwd: false // 是否记住密码
    });
    let loginForm: any;
    onMounted(() => {
      loginForm = arrRef.value[1];
      const code = arrRef.value[0];
      const canvas = code; // 获取验证码元素
      state.code = createCanvasCode(4, canvas); // 初始状态生成一次
      canvas.addEventListener('click', () => (state.code = createCanvasCode(4, canvas))); // 点击事件生成
      const userId = getCache('userId');
      const password = getCache('password');
      // 保存的账户信息还在有效期
      state.loginForm.userId = userId;
      state.loginForm.password = password;
      state.rememberPwd = true;
      // TODO 为了开发时输入验证码麻烦，临时预留自动登录
      // loginHandle();
    });

    const loginOperate = () => {
      loginForm
        .validate()
        .then(() => {
          loginHandle();
        })
        .catch((err: ValidateErrorEntity<any>) => {
          console.log(err, 'err');
        });
    };
    const loginHandle = () => {
      const { userId, password } = state.loginForm;
      store
        .dispatch('user/codeLogin', { userId, password })
        .then(() => {
          message.success('登录成功');
          if (state.rememberPwd) {
            // 用户是否选择记住密码
            setCache('userId', userId);
            setCache('password', password);
          } else {
            removeAll();
          }
          router.push('/index');
        })
    };
    return { setRef, ...toRefs(state), loginHandle };
  }
});
</script>
<style lang="scss" scoped>
@import './index';
</style>
