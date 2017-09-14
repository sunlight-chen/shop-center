/**
 * Created by sunchenshidabendan on 2017/9/11.
 */
var oShowAllAddress = document.querySelector('.show-all-address');
oShowAllAddress.addEventListener('click', function(){
  var oAddressUl = document.querySelector('.address-ul');
  var overflow = fetchComputedStyle(oAddressUl, 'overflow');
  var flag = overflow === 'hidden' ? false : true;
  oAddressUl.style.overflow = !flag ? 'visible' : 'hidden';
  this.innerText = flag ? '显示全部地址' : '隐藏地址';
});
function showAddress() {
  myajax.get('http://h6.duchengjiu.top/shop/api_useraddress.php',
      {token: localStorage.token},
      function(error, responseText) {
        var json = JSON.parse(responseText);
        console.log(json);
        var data = json.data;
        var oAddressUl = document.querySelector('.address-ul');
        if (data.length === 0) {
          oAddressUl.innerHTML = '<h2>您还没有收货地址，请点击添加收货地址\!\!\!</h2>';
          return;
        }
        oAddressUl.innerHTML = '';
        for (var i = data.length - 1; i >= 0; i--) {
          var obj = data[i];
          oAddressUl.innerHTML += `
                            <li data-id="${obj.address_id}">
                              <span class="adds">收货人：${obj.consignee}</span><span name="delete" class="delete" data-id="${obj.address_id}">删除</span><br />
                              <span class="adds">邮编：${obj.zip_code}</span><br />
                              <span class="adds">手机：${obj.mobile}</span><span class="address-type adds">${obj.address_name}</span><br/>
                              <span class="adds">地址：${obj.province}${obj.district}${obj.address}</span> 
                            </li>
            `;
        }
      })
}
showAddress();
var selected_address_id = 0;
var oAddressUl = document.querySelector('.address-ul');
oAddressUl.onclick = function(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;
  console.log(target.nodeName);
  if (target.className === 'delete') {
    if (!confirm('确认要删除收货地址吗？')) {
      return;
    }
    var address_id = target.dataset.id;
    console.log(address_id);
    myajax.get('http://h6.duchengjiu.top/shop/api_useraddress.php',
        {status: 'delete', address_id, token: localStorage.token}, function(error, responseText){
          var json = JSON.parse(responseText);
          if (json.code === 0) {
            target.parentNode.parentNode.removeChild(target.parentNode);
          }
        })
  } else {
    var oAddressLis = oAddressUl.querySelectorAll('li');
    for (var i = 0; i < oAddressLis.length; i++) {
      oAddressLis[i].classList.remove('selected');
    }
    if (target.nodeName === 'LI') {
      //点击LI元素选择一个收货地址
      selected_address_id = parseInt(target.dataset.id);
      target.classList.add('selected');
    } else if (target.nodeName === 'SPAN'){
      selected_address_id = parseInt(target.parentNode.dataset.id);
      target.parentNode.classList.add('selected');
    }

  }
};
var oOrder = document.querySelector('#order');
oOrder.onclick = function() {
  var address_id = selected_address_id;
  if (address_id === 0) {
    alert('请选择一个收货地址',1500);
    return;
  }
  var total_prices = localStorage.sum;
  myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=add', {address_id, total_prices}, function(err, responseText){
    var json = JSON.parse(responseText);
    console.log(json);
    if (json.code === 0) {
      alert('下订单成功');
      location.href = 'order.html';
    }
  });
};
var modal = new Modal('#add-address');
var oAdd = document.querySelector('.add');
oAdd.onclick = function() {
  var postobj = serializeForm(document.querySelector('form'));
  myajax.post('http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token='+localStorage.token, postobj, function(err, responseText){
    var json = JSON.parse(responseText);
    console.log(json);
    if (json.code === 0) {
      showAddress();
    }
  });
};