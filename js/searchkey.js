/**
 * Created by sunchenshidabendan on 2017/9/12.
 */
var oSearch = document.querySelector("#searchtext");
oSearch.onkeyup= function (event) {
  if (event.keyCode===13){
    location.href="search.html?search_text="+oSearch.value;
  }
};
var oSearchBtn = document.querySelector(".search-button");
oSearchBtn.onclick = function (event) {

  location.href="search.html?search_text="+oSearch.value;
};
