import Vue from "./index";
import { query } from './utils'

/* 
el?: string | Element,
*/
Vue.prototype.$mount = function (el) {
    el = el && query(el)  // 兼容 string | Element

    /* istanbul ignore if  Vue 不能挂载在 body、html 这样的根节点上*/
    if (el === document.body || el === document.documentElement) {
        console.warn(
            `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
    }
    return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 * 
 * 
 * 返回el 的dom结构字符串
 * 
 * el: Element
 */
function getOuterHTML (el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}


export default Vue