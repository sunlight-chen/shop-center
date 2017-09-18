/**
 * Created by sunchenshidabendan on 2017/9/11.
 */
  var cat_id = getQueryString("cat_id");
  var oGoods = document.querySelector("#goods-kind");
  myajax.get("http://h6.duchengjiu.top/shop/api_goods.php", {cat_id: cat_id}, function (err, responseText) {
    var json = JSON.parse(responseText);
    var data = json.data;
    for (i = 0; i < data.length; i++) {
      var obj = data[i];
      oGoods.innerHTML += `<li><a href="detail.html?goods_id=${obj.goods_id}"><div class="particularbox"><div class="particular">${obj.goods_desc}</div><img src="${obj.goods_thumb}"></div><div>${obj.goods_name}</div><div class="price"><b>￥${obj.price}</b></div></a></li>`;
    }
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
      oParticularbox[i].onmouseleave=function () {
        if (!lock) return;
        lock = false;
        animate(oParticular[i],{"left":-238,"opacity":0},300,"Linear");
        var timer=setTimeout(function(){
          lock = true;
        },300);
      }
    })(i);
  }
});
