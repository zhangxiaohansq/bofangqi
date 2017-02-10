'use strict';

;(function(win,doc){
	function change(){
		doc.documentElement.style.fontSize = 50*doc.documentElement.clientWidth/320 +'px';
	}
	win.addEventListener('resize',change,false);
	change();
})(window,document);


document.addEventListener('DOMContentLoaded',function(){
	new Swiper('.banner',{
		pagination:'.swiper-pagination'	
	});
	new Swiper('.games', {
        slidesPerView: 3,
        paginationClickable: true
    });
},false);

