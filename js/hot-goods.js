var oUl = document.querySelector("#shop-list");
myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(err, responseText){
  var json = JSON.parse(responseText);
  var data = json.data;
  for (var i=0;i<data.length;i++) {
    var obj = data[i];
    oUl.innerHTML += `<li><a href="goods.html?cat_id=${obj.cat_id}"><b>${obj.cat_name}</b></a></li>`
  }
});
var cat_id = getQueryString("cat_id");
var oHotGoods = document.querySelector("#hot-goods");
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id:cat_id},function(err,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i=0; i<data.length;i++){
		var obj = data[i];
		oHotGoods.innerHTML += `<li><a href="detail.html?goods_id=${obj.goods_id}">
			<div class = "HGimg" id = "HGimg"><img src ="${obj.goods_thumb}"/></div>
			<div class = "HGprice">¥${obj.price}</div>
			<div class = "HGname">${obj.goods_name}</div></a>
		</li>`
	}
});