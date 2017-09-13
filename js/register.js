var oUsername = document.querySelector('input[name=username]');
var oPassword = document.querySelector('input[name=password');
var oSubmit = document.querySelector('input[type=submit]');
oSubmit.onclick = function(){
				myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
				{
					status: 'register',
					username: oUsername.value,
					password: oPassword.value
				},function(error,responseText){
					var json = JSON.parse(responseText);
					console.log(json);
					location.href='login.html';
				});
			}