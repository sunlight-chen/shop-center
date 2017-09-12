/**
 * Created by sunchenshidabendan on 2017/9/12.
 */
var oUsername = document.querySelector('#username');
var oLogout = document.querySelector('#logout');
var oRegister = document.querySelector('#regsiter');
var oLogin = document.querySelector('#login');
if (localStorage.username) {
   oUsername.innerText = localStorage.username;
  oUsername.style.display = 'inline';
  oLogout.style.display = 'inline';
} else {
    oRegister.style.display = 'inline';
  oLogin.style.display = 'inline';
}