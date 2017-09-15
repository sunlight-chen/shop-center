				var oTable = document.querySelector('table');
				var oSum = document.querySelector('#sum');
				myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', {token: localStorage.token}, function(err, responseText){
		      var json = JSON.parse(responseText);
		      console.log(json);
		      var data = json.data;
		      for (var i = 0; i < data.length; i++) {
		        var obj = data[i];
		        obj.goods_sum = obj.goods_price * obj.goods_number;
		        oTable.innerHTML += `
		                          <tr>
		                            <td name="goods_id">${obj.goods_id}</td>
		                            <td class="picture"><div class="same">找相似</div><img src="${obj.goods_thumb}" ></td>
		                            <td>${obj.goods_name}</td>
		                            <td class="selected">
		                            	<button class="numjian" name="minus">-</button><input data-id="${obj.goods_id}" type="number" name="number" min="1" max="10" class="inputnum" value="${obj.goods_number}" /><button name="numjia" class="numjia">+</button>
		                            </td>
		                            <td class="tocal">¥${obj.goods_price}</td>
		                            <td name="sum" class="alltocal">￥${obj.goods_sum}</td>
		                            <td class="delete"><input data-id="${obj.goods_id}" type="button" name="delete" value="删除"></td>
		                          </tr>
		                          `;
		      }
		      var oNumJia = document.querySelectorAll('.numjia');
		      var oNumJian = document.querySelectorAll('.numjian');
		      var oTocal = document.querySelectorAll('.tocal');
				  var oInputNum = document.querySelectorAll('.inputnum');
				  var oAllTocal = document.querySelectorAll('.alltocal');
				  console.log(oNumJia,oTocal,oInputNum,oAllTocal.nodeType);
			  	for (var i = 0; i < oNumJia.length; i++) {
			  		  (function(i){
			  		  	oNumJia[i].onclick=function(){
			  		  		oInputNum[i].value=parseInt(oInputNum[i].value)+1;
			  		  		console.log('i:'+oInputNum[i].value);
			  		  		oAllTocal[i].innerText='￥'+oInputNum[i].value*parseInt((oTocal[i].innerText).slice(1));
			  				if (oInputNum[i].value >= 10) {
			  	         	 oInputNum[i].value = 10;
			  				}
			  				getSum();
			  			}
			  		 })(i);
			  		(function (i){
					  oNumJian[i].onclick = function(){
					  	oInputNum[i].value = parseInt(oInputNum[i].value) - 1;
					  	oAllTocal[i].innerText='￥'+oInputNum[i].value*parseInt((oTocal[i].innerText).slice(1));
					  	console.log('a:'+oInputNum[i].value);
					  	if (oInputNum[i].value <= 1) {
					  		oInputNum[i].value = 1;
					  		oNumJian[i].style.cursor = 'not-allowed';
					  	 }
              getSum();
					   }
			  		})(i);
			  	}
			});
        oTable.addEventListener('click', function (event) {
          event = event || window.event;
          var target = event.target || event.srcElement;
          if (target.name === 'delete') {
            confirm('确认要删除吗？', function () {
              var goods_id = target.dataset.id;
              var number = 0;
              myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token,
                  {goods_id, number},
                  function(err, responseText){
                var json = JSON.parse(responseText);
              console.log(json);
              if (json.code === 0) {
                var tr = target.parentNode.parentNode;
                tr.parentNode.removeChild(tr);
                getSum();
              }
            })
              alert('删除成功',1000);
            }, function () {
              return;
            });
          }
        });
	    var oClearCart = document.querySelector('#clear-cart');
	    oClearCart.onclick = () => {
            confirm('确认要删除吗？', function(){
            	var oGoodsIds = document.querySelectorAll('td[name=goods_id]');
              for (var i = 0; i < oGoodsIds.length; i++) {
                var td = oGoodsIds[i];
                var goods_id = parseInt(td.innerText);
                var number = 0;
                (function(td){
                  myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
                      {goods_id, number},
                      function(err, responseText) {
                        var json = JSON.parse(responseText);
                        console.log(json);
                        if (json.code === 0) {
                          var tr = td.parentNode;
                          tr.parentNode.removeChild(tr);
                          getSum();
                        }
                      });
                })(td);
              }
             alert('清空成功',1000);
            }, function(){
            	return;
            });
          }
	    function getSum() {
	      var oSums = document.querySelectorAll('td[name=sum]');
	      var sum = 0;
	      for (var i = 0; i < oSums.length; i++) {
	        sum += parseInt(oSums[i].innerText.substr(1));
	      }
	      localStorage.sum = sum;
	      oSum.innerText = "￥" + sum;
	    }