import { SvgIcon } from '@/components/svgIcon/index.js'

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app) {
    app.component("svg-icon", SvgIcon)
}
