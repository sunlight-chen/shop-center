/**
 * Created by sunchenshidabendan on 2017/9/12.
 */
var oUl = document.querySelector("#nav");
myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function (error, responseText) {
  var json = JSON.parse(responseText);
  var data = json.data;
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    oUl.innerHTML += '<li><a href="#">' + obj.cat_name + '</a></li>';
  }
});
var oDetails = document.querySelector("#detailsbox");
var goods_id = getQueryString("goods_id");
console.log(goods_id);
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{goods_id:goods_id},function (err,responseText) {
  var json = JSON.parse(responseText);
  var obj = json.data[0];
  oDetails.innerHTML = `
<div>
    <div id="details">
              <div class="smallPic"><img src="${obj.goods_thumb}"></div>
                 <div id="introduce">
                  <div class="namedesc">${obj.goods_name}</div>
                  <div class="namedesc">${obj.goods_desc}</div>
                 <div id="price">￥${obj.price}</div>
                 <div><input type="button" id="add-to-cart" value="添加到购物车"></div>
              </div>
            </div>
            `;
});
document.body.onclick = function (event) {
  event = event || window.event;
  var target = event.target||event.srcElement;
  if(target.id === "add-to-cart"){
    if (!localStorage.token) {
      alert('请先登录再购买');
      localStorage.backurl = location.href;
      location.href = "login.html";
      return;
    }
    myajax.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,{goods_id,number:1},function (error,responseText) {
      var json = JSON.parse(responseText);
      console.log(json);
      var data = json.data;
      if(json.code === 0){
        alert("添加到购物车成功");
        location.href="car.html";
      }
    })
  }
};