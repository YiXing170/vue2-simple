import Dep from './dep'

/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj,
  key,
  val
) {
  const dep = new Dep()


  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      if (window.target) {
        dep.depend()
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      const value = val
      /* eslint-disable no-self-compare */
      if (newVal === value) {
        return
      }
      val = newVal
      dep.notify()
    }
  })
}



export class Observer {


  constructor(value) {
    this.value = value
    // this.dep = new Dep()


    if (Array.isArray(value)) {
      // const augment = hasProto
      //   ? protoAugment
      //   : copyAugment
      // augment(value, arrayMethods, arrayKeys)
      // this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  // observeArray (items: Array<any>) {
  //   for (let i = 0, l = items.length; i < l; i++) {
  //     observe(items[i])
  //   }
  // }
}