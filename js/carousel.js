var oCarouselBox = document.querySelector("#carousel-center");
var oCarouselList = document.querySelector("#carousel-list");
var oLi = oCarouselList.querySelectorAll("li");
var oLeftBtn = document.querySelector("#left-button");
var oRightBtn = document.querySelector("#right-button");
var oCircleList = document.querySelector("#circle-list").querySelectorAll("li");
var imgLength = oLi.length;
var width = 800;
var animatetime = 400;
var tweenString = "Linear";
var interval = 1000;
var lock = true;
var index = 0;
var timer = setInterval(rightBtnHandler, interval);
oCarouselBox.onmouseover = function(){
	clearInterval(timer);
};
oCarouselBox.onmouseout = function(){
	timer = setInterval(rightBtnHandler, interval);
};
oCarouselList.appendChild(oLi[0].cloneNode(true));
oRightBtn.onclick = rightBtnHandler;
oLeftBtn.onclick = function(){
	if(oCarouselList.isAnimated) return;
	index--;
	if(index < 0){
		index = imgLength-1;
		oCarouselList.style.left = -width*index+"px";
	}
	changeCircles();
	animate(oCarouselList, {"left":-index*width}, interval, tweenString);
}
for(var i = 0; i<oCircleList.length ;i++){
	(function(i){
		oCircleList[i].onmouseover = function(){
			 if (oCarouselList.isAnimated) return;
			 index = i;
			 changeCircles();
			 animate(oCarouselList, {"left":-index*width}, interval, tweenString);
		};
	})(i);
}
function rightBtnHandler(){
	if(oCarouselList.isAnimated) return;
	index++;
	changeCircles();
	animate(oCarouselList,{"left":-index*width},interval,tweenString, function(){
		if(index > imgLength-1){
		index = 0;
		this.style.left = "0px";
		};
	});
}
function changeCircles(){
	var n = index;
	if(n === imgLength){
		n=0;
	};
	for(var i = 0; i<oCircleList.length;i++){
		oCircleList[i].className = "";
	};
	oCircleList[n].className = " current";
}