/*通过className获取元素*/
function getElementsByClassName(parent,className,tagName){
		var aEls=parent.getElementsByTagName(tagName);
		var arr=[];
		for(var i=0;i<aEls.length;i++){
			/*if(aEls[i].className==className){
				arr.push(aEls[i]);
			}*/
			var aClassName=aEls[i].className.split(" ");
			for(var j=0;j<aClassName.length;j++){
				if(aClassName[j]==className){
					arr.push(aEls[i]);
					break;
				}
			}
		}
		return arr;
}
function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}
function startMove(obj, json, fn) {
	clearInterval(obj.iTimer);
	var iCur = 0;
	var iSpeed = 0;
	obj.iTimer = setInterval(function() {
		var iBtn = true;
		for ( var attr in json ) {
			var iTarget = json[attr];
			if (attr == 'opacity') {
				iCur = Math.round(css( obj, 'opacity' ) * 100);
			} else {
				iCur = parseInt(css(obj, attr));
			}
			iSpeed = ( iTarget - iCur ) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if (iCur != iTarget) {
				iBtn = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}
		if (iBtn) {
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}
	}, 30);
}
/*鼠标经过图片放大效果*/

function imagefocus(box) {
	//在转换布局的，相对用户眼睛的位置保持不变
	//offsetLeft[Top];
	var oUl = document.getElementById(box);
	var aLi = oUl.getElementsByTagName('li');
	var arr = [];
	var zIndex = 1;
	var w=$(".menu").width();
	var flag=true;
	var idx;
	for (var i=0; i<aLi.length; i++) {
		arr.push( {left: aLi[i].offsetLeft, top: aLi[i].offsetTop} );
	}
	for (var i=0; i<aLi.length; i++) {
		aLi[i].index = i;
		//在用js去设置css样式的时候：在同一个代码块中，有些css样式的设置的权限要高于其他的样式
		/*aLi[i].style.left = aLi[i].offsetLeft + 'px';
		aLi[i].style.top = aLi[i].offsetTop + 'px';*/
		aLi[i].style.left = arr[i].left + 'px';
		aLi[i].style.top = arr[i].top + 'px';
		aLi[i].style.position = 'absolute';
		aLi[i].style.margin = '0px';
		aLi[i].onclick=function(){
			$("<div class='mask'></div>").appendTo("body");
			$(".pop_box").eq(this.index).fadeIn()
			flag=false;
			idx=this.index;
			this.children(1).style.boxShadow="0 0 10px #007be8";
			this.style.fontSize="20px";
		}
		var cl=getElementsByClassName(document,"close","*");
		for(var j=0;j<cl.length;j++){
			cl[j].index = j;
			cl[j].onclick=function(){
				flag=true;
				$(".mask").remove();
				$(".pop_box").eq(this.index).fadeOut();
				startMove( aLi[this.index], {
					width : 150,
					height : 150,
					left : arr[this.index].left,
					top : arr[this.index].top,
					fontSize:18
				});
				aLi[this.index].children(1).style.boxShadow="0 0 0 #000";
				//alert(this.index)
			}
		}
		aLi[i].onmouseover = function() {
			this.style.zIndex = zIndex++;
			startMove( this, {
				width : 180,
				height : 180,
				left : arr[this.index].left - 15,
				top : arr[this.index].top - 15,
				fontSize:20
			});
			this.children(1).style.boxShadow="0 0 10px #007be8";
		}
		
		aLi[i].onmouseout = function() {
			if(flag){
				startMove( this, {
					width : 150,
					height : 150,
					left : arr[this.index].left,
					top : arr[this.index].top,
					fontSize:18
				});
				this.children(1).style.boxShadow="0 0 0 #007be8"
			}
			
		}
	}
}
window.onload=function(){
	var widthM=$(".menu_item").width();
	$(".menu_item").height(widthM)
	if (window.PIE) {
        $('.menu_bg').each(function() {
            PIE.attach(this);
        });
		$('.pop_btn_red').each(function() {
            PIE.attach(this);
        });
    }
	imagefocus("menu")
	$(".pop_box").each(function() {
        var w=$(this).width();
		var h=$(this).height();
		this.style.marginTop=-h/2+"px";
		this.style.marginLeft=-w/2+"px"
    });

}
window.onresize=function(){
	imagefocus("menu")
	var w=$("#main").width();
	var wrap=document.getElementById("main");
	wrap.style.marginLeft=-w/2+"px"
}
	
