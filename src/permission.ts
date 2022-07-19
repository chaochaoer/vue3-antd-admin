import router from './router'
import getPageTitle from '@/utils/getPageTitle';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getCache } from "@/utils/cache"

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // let isLogin = getCache('accessToken');
  // if (to.path === '/login') {
  //   NProgress.done();
  //   next()
  // } else if (!isLogin) {
  //   router.replace("/login")
  //   NProgress.done();
  //   next()
  // }
  NProgress.done();
  next()
});
router.afterEach(to => {
  document.title = getPageTitle(to.meta.title);
  NProgress.done();
});
export default router;
