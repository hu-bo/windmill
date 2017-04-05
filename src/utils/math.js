var random = function (min, max) {
  // TODO 随机数
  var _min = min|0
  var _max = max|0
  var _minR = 0
  var _maxR = 0
  // int
  if (min === _min) {
    _minR = min | 0
  } else {
    // float
    var minDecimalLen = min.toString().split(".")[1].length
    _minR = (min).toFixed(minDecimalLen) - 0
  }
  // int
  if (_max === max) {
    _maxR = (Math.random() * (max - min)) | 0
  } else {
    // float
    var maxDecimalLen = max.toString().split(".")[1].length
    _maxR = (Math.random() * (max - min)).toFixed(maxDecimalLen) - 0
  }
  return _minR +　_maxR
}

export {
  random
}
