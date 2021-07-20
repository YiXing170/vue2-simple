import { initMixin } from './init'
// import { stateMixin } from './state'
// import { renderMixin } from './render'
// import { eventsMixin } from './events'
// import { lifecycleMixin } from './lifecycle'


function Vue (options) {
    if (!(this instanceof Vue)) {
        console.warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}

stateMixin(Vue) // 给vue的prototype添加_init方法
// eventsMixin(Vue)
// lifecycleMixin(Vue)
// renderMixin(Vue)

export default Vue
