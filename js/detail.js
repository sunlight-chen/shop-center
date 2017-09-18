/**
 * Created by sunchenshidabendan on 2017/9/12.
 */
var div0 = document.getElementById("div0");
var goods_id = getQueryString("goods_id");
// console.log(goods_id);
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{goods_id},function (err,responseText) {
    var json = JSON.parse(responseText);
    // console.log(json);
    var obj = json.data[0];
  div0.innerHTML = `<div><div class="goods_thumb smallPic"><div class="zoom"></div><div class="BigPic"></div><img src="${obj.goods_thumb}"></div><div class="div-right">
   <div class="goods_name">${obj.goods_name}</div>
   <div class="goods_desc">${obj.goods_desc}</div>
   <div class="goods_price">￥${obj.price}</div>
   
   <div class="sum"><button id="lbtn">-</button><input type="text" value="1" id="number"/><button id="rbtn">+</button></div>
   <div class="button"><input type="button" id="add-to-cart" value="添加到购物车"></div>
   </div>
</div>
`;
  var lbtn=document.querySelector("#lbtn");
  var rbtn=document.querySelector("#rbtn");
  var oNumber=document.querySelector("#number");
  lbtn.onclick=function () {
    oNumber.value=parseInt(oNumber.value)-1;
    if (oNumber.value<1) {
      oNumber.value = 1;
    }
  };
  rbtn.onclick=function () {
    oNumber.value=parseInt(oNumber.value)+1;
    if (oNumber.value>10){
      oNumber.value=10;
    }
  };
  var oBigPic=document.querySelector(".BigPic");
    oBigPic.style.backgroundImage="url("+obj.goods_thumb+")";
    Zoom();
});
document.body.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.id === 'add-to-cart') {
        if (!localStorage.token) {
            alert('请先登录再购买',1700);
            var timer=setTimeout(function () {
              localStorage.backurl = location.href;
              location.href = "login.html";
              clearTimeout(timer);
            },1700);
            return;
        }console.log(goods_id);
        myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
            {goods_id, number:parseInt(document.querySelector("#number").value)},
            function(err, responseText) {
                var json = JSON.parse(responseText);
                console.log(json);
                if (json.code === 0) {
                    alert('添加到购物车成功',1500);
                    var timer=setTimeout(function () {
                      location.href="car.html";
                      clearTimeout(timer);
                    },1500);
                }
            })
    }
};
