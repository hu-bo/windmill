const BUILTIN_OBJECT = {
    '[object Function]': 1,
    '[object RegExp]': 1,
    '[object Date]': 1,
    '[object Error]': 1,
    '[object CanvasGradient]': 1,
    '[object CanvasPattern]': 1,
    // For node-canvas
    '[object Image]': 1,
    '[object Canvas]': 1
};

const TYPED_ARRAY = {
    '[object Int8Array]': 1,
    '[object Uint8Array]': 1,
    '[object Uint8ClampedArray]': 1,
    '[object Int16Array]': 1,
    '[object Uint16Array]': 1,
    '[object Int32Array]': 1,
    '[object Uint32Array]': 1,
    '[object Float32Array]': 1,
    '[object Float64Array]': 1
};
var objToString = Object.prototype.toString;
var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var nativeReduce = arrayProto.reduce;
/*
  @param {any}
  @return {any}
*/
var clone = function (source) {
  if (source == null || typeof source != 'object') {
      return source;
  }

  var result = source;
  var typeStr = objToString.call(source);

  if (typeStr === '[object Array]') {
      result = [];
      for (var i = 0, len = source.length; i < len; i++) {
          result[i] = this.clone(source[i]);
      }
  }
  else if (TYPED_ARRAY[typeStr]) {
      result = source.constructor.from(source);
  }
  else if (!BUILTIN_OBJECT[typeStr] && !this.isDom(source)) {
      result = {};
      for (var key in source) {
          if (source.hasOwnProperty(key)) {
              result[key] = this.clone(source[key]);
          }
      }
  }
  return result;
};

/*
  @param {any}
  @return {boolean}
*/
var isObject = function (object) {
  return Object.prototype.toString.call(object) === "[object Object]";
};

/*
  @param {any}
  @return {boolean}
*/
var isArray = function (arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
};

/*
  @param {any}
  @return {boolean}
*/
var isDom = function (value) {
  return typeof value === 'object'
      && typeof value.nodeType === 'number'
      && typeof value.ownerDocument === 'object';
};

export {
  clone,
  isObject,
  isArray,
  isDom
}
