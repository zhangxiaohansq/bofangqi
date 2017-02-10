// JavaScript Document

domReady(function(){
	var oSide = document.getElementById('side');  
	var aMovie_moreMsg = getByClass(oSide,'movie_moreMsg');
	var oVideoGallery = document.getElementById('videoGallery');
	var aMovie_moreMsgCon = oVideoGallery.children;
	
	var oRollBox = document.getElementById('rollBox');
	var oMovieBox = oRollBox.parentNode;
	var oMovieBox_msg = oMovieBox.children[1];
	var oRollBar = oRollBox.children[0];
	var oRollBarUp = oRollBox.children[1];
	var oRollBarDown = oRollBox.children[2];
	
	var oContent = document.getElementById('content');
	var oRollBox2 = document.getElementById('rollBox2');
	var oContent_main = oContent.children[1];
	var oRollBar2 = oRollBox2.children[0];
	var oRollBarUp2 = oRollBox2.children[1];
	var oRollBarDown2 = oRollBox2.children[2];
	var oScroll_content = document.getElementById('scroll_content');
	
	var oPlayerIndexFocus = document.getElementById('playerIndexFocus');
	var ofi_ct = oPlayerIndexFocus.children[0];
	var oUl1 = oPlayerIndexFocus.children[0].children[1];
	var aLi1 = oUl1.getElementsByTagName('li');				//每个大图片
	var oBtn1 = oPlayerIndexFocus.children[1].children[0];
	var aBtn2 = oBtn1.getElementsByTagName('li');
	var ofi_pointer = oBtn1.parentNode.children[1];
	
	var aMaskVideo = getByClass(oScroll_content,'maskVideo');
	//今日热点
	for(var i =0; i<aMaskVideo.length; i++){
		aMaskVideo[i].parentNode.onmousemove = function(){
			this.children[1].style.display = 'block';		
		};	
		aMaskVideo[i].parentNode.onmouseout = function(){
			this.children[1].style.display = 'none';	
		};
	}
	//焦点图	
	for(var i=0; i<aBtn2.length; i++){
		aBtn2[i].index = i;
		aBtn2[i].onmouseover = function(){
			for(var i=0; i<aBtn2.length; i++){
				move(aLi1[i],{opacity:0},{complete:function(){
					aLi1[i].style.display = 'none';
				}});
			}
			ofi_pointer.style.left = this.index*ofi_pointer.offsetWidth + 'px';
			aLi1[this.index].style.display = 'block';
			move(aLi1[this.index],{opacity:100});
		}
	}		
	//右侧滚动条
	oRollBarUp2.onclick = function(){
		var top = oRollBar2.offsetTop;
		top -= 10;
		setTop2(top);	
	};
	oRollBarDown2.onclick = function(){
		var top = oRollBar2.offsetTop;
		top += 10;
		setTop2(top);	
	};
	addWheel(oContent,function(bDown){
		var top = oRollBar2.offsetTop;
			if(bDown){
				top += 10;	
			}
			else{
				top -= 10;	
			}

		setTop2(top);	
	});
	
	function setTop2(top){
		if(top < oRollBarUp2.offsetHeight){top=oRollBarUp2.offsetHeight;}
		if(top > oRollBox2.offsetHeight - oRollBar2.offsetHeight - (oRollBarUp2.offsetHeight)){
			top = oRollBox2.offsetHeight - oRollBar2.offsetHeight - (oRollBarUp2.offsetHeight);	
		}
		var scale = (top-oRollBarUp2.offsetHeight)/(oRollBox2.offsetHeight - oRollBar2.offsetHeight - (oRollBarUp2.offsetHeight)*2);
		oScroll_content.style.top = - scale*(oScroll_content.offsetHeight - oContent.offsetHeight) +'px';	
		oRollBar2.style.top = top + 'px';	
	}
	oRollBar2.onmousedown = function(ev){
		var  oEvent = ev || event;
		var disY = oEvent.clientY - oRollBar2.offsetTop;
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			var top = oEvent.clientY - disY;
			setTop2(top);			
			
		};	
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			oRollBar2.releaseCapture && oRollBar2.releaseCapture();	
		};
		oRollBar2.setCapture && oRollBar2.setCapture();
		return false;
	};
	//左侧滚动条
	function rollBox(){
		if(oMovieBox_msg.offsetHeight > oMovieBox.offsetHeight){
			oRollBar.style.display = 'block';
			oRollBar.style.height = oMovieBox.offsetHeight*oRollBox.offsetHeight/oMovieBox_msg.offsetHeight+'px';
		}else{
			oRollBar.style.display = 'none';
		}
	}
	
	oRollBarUp.onclick = function(){
		var top = oRollBar.offsetTop;
		top -= 10;	
		setTop(top);	
	};
	oRollBarDown.onclick = function(){
		var top = oRollBar.offsetTop;
		top += 10;	
		setTop(top);	
	};
	addWheel(oMovieBox,function(bDown){
		var top = oRollBar.offsetTop;
			if(bDown){
				top += 10 ;	
			}
			else{
				top -= 10;	
			}

		setTop(top);	
	})
	function setTop(top){
		if(top <= oRollBarUp.offsetHeight+2){top = oRollBarUp.offsetHeight+2;}
		if(top >= oRollBox.offsetHeight - oRollBar.offsetHeight-(oRollBarUp.offsetHeight+2)){
			top = oRollBox.offsetHeight - oRollBar.offsetHeight-(oRollBarUp.offsetHeight+2);	
		}
		var scale = top /(oRollBox.offsetHeight - oRollBar.offsetHeight-(oRollBarUp.offsetHeight*2));	
		oMovieBox_msg.style.top = -scale*(oMovieBox_msg.offsetHeight - oMovieBox.offsetHeight) + 'px';
		oRollBar.style.top = top + 'px';
	}	
	oRollBar.onmousedown = function(ev){
		var oEvent = ev || event;
		var disY = oEvent.clientY - oRollBar.offsetTop;
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			var top = oEvent.clientY - disY;
			setTop(top);	
		};	
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			oRollBar.releaseCapture && oRollBar.releaseCapture();	
		};
		oRollBar.setCapture && oRollBar.setCapture();
		return false;
	};
	rollBox();
	//排行榜开始
	addEvent(oVideoGallery,'mouseover',movie_rankActive);
	function movie_rankActive(ev){
			var oEvent = ev || event;
			var target = oEvent.target || oEvent.srcElement;
			
			if(target.className == 'movie_rankone'){
				var oDiv = target.parentNode.parentNode;
				for(var i=0; i<oDiv.children.length; i++){
					oDiv.children[i].children[0].style.display = 'block';
					oDiv.children[i].children[1].style.display = 'none';
				}
				target.style.display = 'none';
				getSibling(target).next.style.display = 'block';
			}
		}	
	//选项卡调用
	for(var i = 0; i<aMovie_moreMsg.length; i++){
		aMovie_moreMsg[i].index = i;		
		var aBtn = aMovie_moreMsg[i].children[0].lastElementChild || aMovie_moreMsg[i].children[0].lastChild;
		aBtn.iNow = rnd(0,aBtn.parentNode.children.length);
		var aDiv = aMovie_moreMsg[i].children[1].children;
		show(aBtn,aDiv);		
		var oSp = aMovie_moreMsg[i].children[0].children[0];
		
		if(oSp.innerHTML == '-'){
			aMovie_moreMsg[i].onmouseover = function(){
				var _this = this;
				clearInterval(_this.children[0].lastElementChild.timer || _this.children[0].lastChild.timer);	
			};	
			aMovie_moreMsg[i].onmouseout = function(){
				var aBtn = this.children[0].lastElementChild || this.children[0].lastChild;
				var aDiv = this.children[1].children;
				if(this.children[0].children[0].innerHTML == '-'){
					show(aBtn,aDiv);	
				}
				else{
					clearInterval(aBtn.timer);	
				}
			};			
		}
	}	
	//收放调用
	addEvent(oSide,'click',movie_moreMsg);	


	//收放
	function movie_moreMsg(ev){
		var oEvent = ev || event;
		var target = oEvent.target || oEvent.srcElement;
		if(target.className == 'move_moreMsgBtn'){
			var oDiv = target.parentNode.nextElementSibling || target.parentNode.nextSibling;
			var oHeight1 = target.parentNode.offsetHeight;
			var oHeight2 = oHeight1 + oDiv.offsetHeight;
			var oHeight = oHeight1 + oHeight2;
			if(target.innerHTML == '-'){
				target.innerHTML = '+';	
				move(target.parentNode.parentNode,{height:oHeight1},{complete:function(){
				rollBox();	
				}});
			}
			else{
				target.innerHTML = '-';	
				move(target.parentNode.parentNode,{height:oHeight},{complete:function(){
				rollBox();	
				}});
			}	
		}			
	}
	//选项卡
	function show(obtn,obj){
		clearInterval(obtn.timer);	
		for(var i = 0; i<obtn.children.length; i++){
			obtn.children[i] . index= i;
			obtn.children[i].onclick = function(){
				obtn.iNow = this.index;
				tab();
			};	
		}
		obtn.timer = setInterval(function(){
			obtn.iNow++;
			if(obtn.iNow > obtn.children.length - 1){
				obtn.iNow = 0;	
			}	
			tab();
		},1000);
		function tab(){
			for(var i = 0; i<obtn.children.length; i++){
					obtn.children[i].className = '';
					obj[i].style.display = 'none';
				}
				obtn.children[obtn.iNow].className = 'active';
				obj[obtn.iNow].style.display = 'block';		
		}
	}
});