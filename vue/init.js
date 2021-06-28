export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            initProxy(vm)
        } else {
            vm._renderProxy = vm
        }

        vm.$options=options
        // expose real self
        // vm._self = vm
        // initLifecycle(vm)
        // initEvents(vm)
        // initRender(vm)
        // callHook(vm, 'beforeCreate')
        // initInjections(vm) // resolve injections before data/props
        // initState(vm)
        // initProvide(vm) // resolve provide after data/props
        // callHook(vm, 'created')

        
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}