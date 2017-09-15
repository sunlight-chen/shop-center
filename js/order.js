var order = document.querySelector("#order");
myajax.get("http://h6.duchengjiu.top/shop/api_order.php",{token:localStorage.token},function(err,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	if(data.length === 0){
		order.innerHTML = "<img src='../images/u=3820346416,2847607542&fm=27&gp=0.jpg' /><h3>你的订单空空如也...</h3>"
		retrun;
	};
	for (var i = 0; i<data.length;i++) {
	var obj = data[i];
	console.log(obj.consignee);
	var goodsHtml = "";
		for (var j = 0 ; j<obj.goods_list.length; j++) {
            var goods = obj.goods_list[j];

            goodsHtml += `
					<img src = "${goods.goods_thumb}"/>
					<span class="Goodsname">${goods.goods_name}</span>
					<b>x ${goods.goods_number}</b>
					<p><a href ="#">售后申请</a></p>
					<div class="username">${obj.consignee}</div>
					<div class = "price"><p>总额 ¥ ${goods.goods_price}</p><span>在线支付</span></div>
					<div class = "state"><p>已完成</p><span><a href="#">订单详情</a></span></div>
					<div class = "other"><span>评价|晒单</span><button><a href = "goods.html">购买其他</a></button></div>
			`;
        }
		order.innerHTML += `<li>
			<div class = "order-goods">
				${goodsHtml}
				<span class = "cancel-order" data-id="${obj.order_id}">取消订单</span>
			</div>
		</li>`;
 }	
});
order.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.className === 'cancel-order') {
        if (!confirm('确认要取消订单吗?')) {
            return;
        }
        var tr = target.parentNode;
        tr.parentNode.removeChild(tr);
        var order_id = target.dataset.id;
        myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=cancel', {order_id}, function(err, responseText) {
            var json = JSON.parse(responseText);
            if (json.code === 0) {
                alert('订单取消成功');

            }
        });
    }
}