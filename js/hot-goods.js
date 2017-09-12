var oHotGoods = document.querySelector("#hot-goods");
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{},function(err,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i=0; i<data.length;i++){
		var obj = data[i];
		oHotGoods.innerHTML += `<li><a href="detail.html?good_id=${obj.good_id}">
			<div class = "HGimg" id = "HGimg"><img src ="${obj.goods_thumb}"/></div>
			<div class = "HGprice">¥${obj.price}</div>
			<div class = "HGname">${obj.goods_name}</div></a>
		</li>`
	}
})