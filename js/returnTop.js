var oReturnTop = document.querySelector("#retrunTop");
window.onscroll = function(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop>500){
		oReturnTop.style.display = "block"
	}else{
			oReturnTop.style.display = "none"
	}
};
oReturnTop.onclick = function(){
	scrollAnimate(0, 1000);
};
function scrollAnimate(target , timer){
	var interval = 20;
  var frame = 0;
  var frames = timer / interval;
  var start = document.body.scrollTop || document.documentElement.scrollTop;
  var distance = target - start;
  var timer;
  clearInterval(timer);
  timer = setInterval(function(){
  	frame++;
  	if(frame>frames){
  		clearInterval(timer);
  	};
  	document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInout(frame, start, distance, frames);
  },interval);
  function CubicEaseInout(t,b,c,d){
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
	};
}

