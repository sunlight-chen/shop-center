var oUl = document.querySelector("#shop-list");
myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(err, responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for (var i=0;i<data.length;i++) {
		var obj = data[i];
		oUl.innerHTML += `<li><a href="goods.html?cat_id=obj.cat_id">${obj.cat_name}</a></li>`
	}
})