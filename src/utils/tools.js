/*
  返回随机颜色
  @return {string}
*/
var randomColor = function () {
  return '#'+('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
/*
  相机移动到指定位置
  @return {string}
*/
var go = function () {
  return '#'+('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

export {
  randomColor
}
