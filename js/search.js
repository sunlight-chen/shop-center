/**
 * Created by sunchenshidabendan on 2017/9/11.
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
var search_text = getQueryString('search_text');
var oGoods = document.querySelector('#goods-kind');
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
    {search_text: search_text},
    function(err,responseText){
      var json = JSON.parse(responseText);
      var data = json.data;
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        oGoods.innerHTML += `<li>
          <div id="particularbox"><span id="particular">${obj.goods_desc}</span><img src="${obj.goods_thumb}" /></div>
          <div>${obj.goods_name}</div>
          <div class="price"><b>￥${obj.price}</b></div>
        </li>`;
      }
    });
var oSearch = document.querySelector("#searchtext");
oSearch.onkeyup= function (event) {
  if (event.keyCode===13){
    location.href="search.html?search_text="+oSearch.value;
  }
};