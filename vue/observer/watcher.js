



import Dep, { pushTarget, popTarget } from './dep'


let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {

  constructor(
    vm,
    expOrFn,
    cb,

  ) {
    this.vm = vm

    this.cb = cb
    this.id = ++uid // uid for batching



    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)

    }
    // 触发依赖收集
    this.value = this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    window.target = this
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      throw e
    } finally {
      window.target = undefined
    }
    return value
  }




  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {

    // queueWatcher(this)
    const vm = this.vm
    const oldValue = this.value
    this.value = this.getter.call(vm, vm)
    this.cb.call(this.vm, this.value, oldValue)

  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }



  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}


/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/
export function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      // console.log(String(obj), segments[i])
      obj = obj[segments[i]]

    }
    return obj
  }
}
