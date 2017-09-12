/**
 * Created by sunchenshidabendan on 2017/9/12.
 */
var oUsername = document.querySelector("input[name=username]");
var oPassword = document.querySelector("input[name=password]");
var oButton = document.querySelector("input[name=button]");
oButton.onclick = function () {
  myajax.post("http://h6.duchengjiu.top/shop/api_user.php",{
    status:"login",
    username:oUsername.value,
    password:oPassword.value
  },function (error,responseText) {
    var json = JSON.parse(responseText);
    console.log(json);
    localStorage.token = json.data.token;
    localStorage.username = json.data.username;
    console.log(localStorage.token);
    console.log(localStorage.username);
    if (localStorage.backurl) {
      location.href = localStorage.backurl;
    } else {
      location.href = 'index.html';
    }
  });
}