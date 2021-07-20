export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  removeSub (sub) {
    remove(this.subs, sub)
  }
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }
}

Dep.target = null
const targetStack = []

export function pushTarget (_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}