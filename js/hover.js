/**
 * Created by sunchenshidabendan on 2017/9/15.
 */
var oParticularbox = document.querySelectorAll(".particularbox");
var oParticular = document.querySelectorAll(".particular");
var lock = true;
for (var i=0;i<oParticularbox.length;i++){
  (function (i) {
    oParticularbox[i].onmouseover=function () {
      if (!lock) return;
      lock = false;
      animate(oParticular[i],{"left":0,"opacity":0.6},300,"Linear");
      var timer=setTimeout(function(){
        lock = true;
      },300);
    }
  })(i);
  (function (i) {
    oParticularbox[i].onmouseout=function () {
      if (!lock) return;
      lock = false;
      animate(oParticular[i],{"left":-238,"opacity":0},300,"Linear");
      var timer=setTimeout(function(){
        lock = true;
      },300);
    }
  })(i);
}