/*
  拖拽
  opts {Object}
  opts = {
    el:{Object} [必须,拖拽对象],
    clickEl:{Object} [点击对象，点它才会拖拽,默认为el]
  }
 */
function Drag(opts){
  this.x = 0
  this.y = 0
  this.opts = opts
  this.init()
}
Drag.prototype = {
  constructor: Drag,
  init: function () {
    this.el = this.opts.el
    this.clickEl = this.opts.clickEl||this.opts.el

    if (!this.el) {
      throw("未传el")
      return false
    }
    this.clickEl.onmousedown = function (ev) {
      this.mousedown(ev)
      return false
    }.bind(this)
  },
  mousedown: function (ev) {
    var diffX = ev.clientX - this.x
    var diffY = ev.clientY - this.y
    var that = this
    document.onmousemove = function (ev) {
      that.x = ev.clientX - diffX
      that.y = ev.clientY - diffY
        //l t限制在这写
      that.el.style.transform = "translate("+that.x+"px,"+that.y+"px)"
    };
    document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
    };
  }
}