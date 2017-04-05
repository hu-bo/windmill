var banner = function (options) {
  var aItem = options.item;
  if (!aItem) {
    throw('item is must {item:[nodeList]}')
  }
  document.onmousemove = function(ev){
    for (var i = 0; i < aItem.length; i++) {
      var a = aItem[i].getBoundingClientRect().left-ev.clientX + aItem[i].offsetWidth / 2;
      var b = aItem[i].getBoundingClientRect().top-ev.clientY + aItem[i].offsetHeight / 2;
      var c = Math.sqrt(a*a+b*b);
      var dis = c;
      var ratio = 1 - dis / 100;
      if (ratio <= 0.4) ratio = 0.4;
      aItem[i].style.width = ratio*125+"px";
      aItem[i].style.height = ratio*125+"px";
    }
  }
}
export default banner
