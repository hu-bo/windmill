/*
  拖拽
  opts {Object}
  opts = {
    el:{Object} [必须,拖拽对象],
    clickEl:{Object} [点击对象，点它才会拖拽,默认为el]
  }
 */

class Drag {
  constructor (opts) {
    this.x = 0
    this.y = 0
    this.opts = opts
    this.init()
  }
  init () {
    this.el = this.opts.el
    this.clickEl = this.opts.clickEl || this.opts.el
    if (!this.el) {
      throw("未传el")
      return false
    }
    this.clickEl.onmousedown = (ev) => {
      this.mousedown(ev)
      return false
    }
  }
  mousedown (ev) {
    var diffX = ev.clientX - this.x
    var diffY = ev.clientY - this.y
    var that = this
    document.onmousemove = (ev) => {
      this.x = ev.clientX - diffX
      this.y = ev.clientY - diffY
        //l t限制在这写
      this.el.style.transform = "translate(" + this.x + "px,"+ this.y + "px)"
    };
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
    };
  }
}
export default {
  Drag
}
