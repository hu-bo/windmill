import Drag from '../Drag/index-es6.js'
import './index.css'
/*
  弹出框/模态框
  @options {Object}
  options={
    el:{Element}[must],
    enterClass:{String}[optional],
    exitClass:{String}[optional],
    duration:{Number}[optional]
  }
*/
class Modal {
  constructor (options) {
    this.opts = options
    this.init();
  }
  init () {
    var opts = this.opts
    if (opts.el) {
      switch (typeof opts.el) {
        case 'string':
          this.modal = document.querySelector(opts.el)
          break
        case 'object':
          this.modal = opts.el
          break
        default:
          return false
      }
    }else{
      throw("未传el")
      return false
    }
    this.body = this.modal.querySelector(".modal-body")
    this.modalContent = this.modal.querySelector(".modal-content")
    //加关闭事件
    this.addCloseEvent()
    // 添加拖拽功能
    if (drag) {
      var drag = new ModalDrag({
        el: this.modalContent,
        clickEl: this.modal.querySelector(".modal-header"),
        autoRest: true,
        restObj: this.modal,
        duration: opts.duration || 200
      })
    }
  }

  addCloseEvent () {
    var closeBtn = this.modal.querySelector('.close') // x按钮
    var cancelBtn = this.modal.querySelector(".cancel") //取消按钮
    document.addEventListener("click", function (ev) {
      var srcEl = ev.target
      if( closeBtn.contains(srcEl) ||
          srcEl.className.indexOf("cancel") != -1 ||
          (!this.modalContent.contains(srcEl) && this.modal.style.display === "block") ){
        this.hide()
      }
    }.bind(this), true)
  }

  hide () {
    var that = this
    var time = this.opts.duration || 200
    //出场动画(配合animate.css)
    if (this.opts.enterClass && this.opts.exitClass) {
      this.modal.classList.add(this.opts.exitClass)
      this.modal.classList.remove(this.opts.enterClass)
    } else {
      time = 0
    }
    setTimeout(function(){
      that.modal.style.display="none"
    }, time)
  }

  show () {
    var that = this
    var maxH = document.documentElement.clientHeight*0.68+"px"
    this.body.style.maxHeight=maxH
    this.modal.style.display="block"
    //进场动画(配合animate.css)
    if (this.opts.enterClass && this.opts.exitClass) {
      this.modal.classList.add(this.opts.enterClass)
      this.modal.classList.remove(this.opts.exitClass)
    }
  }
}

/*
  options {Object}
  options = {
    el:{Object} [必须,拖拽对象],
    clickEl:{Object} [点击对象，点它才会拖拽]
    autoRest:{Boolean} [自动复位],
    restObj:{Object} [autoRest = true 必须传提供复位的检测对象(一般为控制show,hide的对象)],
    duration:{Number} [自动复位检测时间,看需求传,默认为0]
  }
 */
/*class ModalDrag extends Drag{
  constructor(options) {
   var parentOpts = {
     el: options.el,
     clickEl: options.clickEl
   }
   super()
   this.restObj = options.restObj
   this.opts = options
   if (options.autoRest === true && this.restObj ) {
     this.autoRest()
   }
   if (options.autoRest && !this.restObj ) {
     throw("autoRest = true 时 restObj必须")
   }

  }
  autoRest () {
     var that = this;
     document.addEventListener('click', function () {
       window.setTimeout(function () {
         if ( that.restObj.style.display === 'none' ) {
           that.rest()
         }
       },that.opts.duration || 0)
     }, false)
  }
  rest () {
     this.x = 0
     this.y = 0
     setTimeout(function () {
       this.el.style.transform = "translate(0px,0px)"
     }.bind(this), 200)
  }
 }*/

export default Modal
