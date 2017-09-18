/**
 * Created by sunchenshidabendan on 2017/9/17.
 */
var ocar = document.querySelector("#shop-car");
ocar.onclick=function () {
  if(!localStorage.token){
   alert("请先登录用户",1700);
  }else {
    location.href="car.html";
  }
};
var oorder = document.querySelector("#order");
oorder.onclick=function () {
  if(!localStorage.token){
    alert("请先登录用户",1700);
  }else {
    location.href="car.html";
  }
};
