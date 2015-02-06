(function($) {

	$.fn.zoom = function(options) {
		 var zoomImg;
		 var w;
		 var h;
		 var ok=0;
		 var okk=0;
		 var i;
		 var poz;
         var fadeTime=500;
	     var defaults = {},  
	       options = $.extend(defaults, options);

		this.each(function() {
        var $this = $(this);	

		$(this).append("<div id='zoomCon'></div>");
		$(this).append("<div id='preloaderCon'></div>");
		
		var fullzoom=$(".fullzoom");		
		var zoomm=$("a.zoom");
		var zoom=$(".zoom");
		var preloader=$("#preloaderCon");
		var zoomCon=$("#zoomCon");
		var wwidth = $(window).width();
		var wheight = $(window).height();
	    var scrolling="horizontal";	
	    var cacheObject;
		var prel=preloader.children().eq(0);
		
		zoomCon.append("<div id='back'></div>")
		preloader.append("<img src='preloader.gif '/>");
		
		var wp=prel.width();
		var hp=prel.height();

		preloader.css({
	        'position':'absolute',
			'width':wp,
			'height':hp,
		    'top':wheight/2-hp/2,
	        'left': wwidth /2-wp/2,
	        'visibility':'hidden'
       })
	
		zoomCon.css({
			'position':'absolute',
			'width': wwidth,
			'height': wheight,
		    'z-index':'998',
			'top':'0px',
			'left' :'0px',
			'overflow':'hidden',
			'visibility':'hidden'
		})
		zoom.css({
			'cursor' : 'pointer'
		})
		$("#back").css({
			'position':'absolute',
			'width': wwidth,
			'height': wheight,
			'top':'0px',
			'left' :'0px',
			'background-color':'#000',
			'opacity':'0.9'
		})
		cacheObject=zoomCon.children().eq(1)
		cacheObject.css({
		  	'position':'absolute',
			'opacity' :'0',
			'top':'0px',
			'left' :'0px'
		})

		function checkScrolling()  ///type of scrolling
		{
	
			 if (okk == 1) {

			 	if ((w <= wwidth) || (h <= wheight)) {    //if the image is smaller than window
	            scrolling = "none";
			   	cacheObject.css({
			 			'top': wheight / 2 - h/2,
			 			'left': wwidth / 2 - w/2,
			 			'position': 'absolute'
			 		})
			 	}
			 	else {scrolling = "verhor";                 //if the image has fullzoom class
			 		  cacheObject.css({
			 			'top': -(h - wheight) / 2,
			 			'left': -(w - wwidth) / 2,
			 			'position': 'absolute'
			 		})
			 	}
			 }
			 else {
			 	if ((wwidth / wheight) < (w / h)) 
			 		scrolling = "horizontal";            
			 	else 
			 		scrolling = "vertical";
			 	
			 	if (scrolling == "vertical") {                   //vertical scrolling
			 	
			 		cacheObject.css({
			 			'left': 0,
			 			'width': wwidth,
			 			'height': wwidth * (h / w),
			 			'position': 'absolute'
			 		})
			 		w = cacheObject.width();
			 		h = cacheObject.height();
			 		
			 	}
			 	else {                                            //horizontal scrolling
			 	
			 		cacheObject.css({
			 			'top': 0,
			 			'height': wheight,
			 			'width': wheight * (w / h),
			 			'position': 'absolute',
			 			'overflow' : 'hidden'
			 		})
			 		w = cacheObject.width();
			 		h = cacheObject.height();
			 	}
			 }
		}
		
		function handleResize(){                    //resize function
			wwidth = $(window).width();
			wheight = $(window).height();
			
			checkScrolling();

			$("#back").css({
			'width': wwidth+10,
			'height': wheight+10
		})
			zoomCon.css({
			'overflow': 'hidden',
			'width': wwidth,
			'height': wheight
			})
			
			preloader.css({
		    'top':wheight/2-hp/2,
	        'left': wwidth /2-wp/2
       })
	   
		
		}
		
		$(window).resize(handleResize)
		handleResize(); 
			
		zoomm.click(function(event) {              //when click the image
		if (ok != 0) 
		return;
		    
		poz=$(this).offset().top;

		ok=1;
		
		$('body').css({
			'overflow': 'hidden'
		})                                               //loading image 
		
		scroll(0,0);
		checkScrolling();
		
			preloader.css({
				'visibility': 'visible'
			})
			
			event.preventDefault();
			zoomImg = $(this).attr('href');
			zoomCon.append("<img src='" + zoomImg + " '/>");
			cacheObject= zoomCon.children().eq(1);
			cacheObject.css({
			'opacity' :'0'
		    })
			cacheObject.load(handleLoaded);
			 if ($(this).hasClass("fullzoom")) {
			 okk=1;
			 }
		 		});
			
		zoomCon.click(function(){                  //close zoom
		if(ok!=1) return;
		
		$('body').css({
			'overflow': 'auto'
		})   

			scroll(0, poz-h/2);
			
		cacheObject.remove();
		zoomCon.css({
			'visibility':'hidden'
		})
			
			ok=0;
			okk=0;
			
			wwidth = $(window).width();
			wheight = $(window).height();
			
			zoomCon.css({
			'overflow': 'hidden',
			'width': wwidth,
			'height': wheight
			})
			
			
		})
		

		function handleLoaded(){  
		wwidth = $(window).width();
		wheight = $(window).height();
		
		cacheObject= zoomCon.children().eq(1);
		w=cacheObject.width();
	    h=cacheObject.height();
		
	    preloader.css({
			'visibility':'hidden'
				})
	   cacheObject.animate({
		    'opacity' :'1'
		},fadeTime)

	    zoomCon.css({
			'visibility':'visible',
				'position' : 'absolute',
				'overflow' : 'hidden',
				'width': wwidth,
				'height': wheight
		})
		

	    checkScrolling();
	   if(okk == 1){
		   cacheObject.mousemove(handleMouse);
		  }
		  else {
			 cacheObject.mousemove(handleMouseVer);
			 cacheObject.mousemove(handleMouseHor);
		  }
		
		function handleMouse(e){
			if (scrolling == "verhor") 
			cacheObject.css({
					'top': -((e.pageY - cacheObject.offset().top) / h * (h - wheight)),
					'left': -((e.pageX - cacheObject.offset().left) / w * (w - wwidth))
		    },{queue:false,duration:3})
		   }
		function handleMouseHor(e){ 
		if(scrolling=="horizontal")
			cacheObject.animate({
		  'left' : -((e.pageX-cacheObject.offset().left)/w * (w - wwidth) )
		},{queue:false,duration:3})
		}
		
		function handleMouseVer(e){ 
		if(scrolling=="vertical")
			cacheObject.animate({
			     'top' : -((e.pageY-cacheObject.offset().top)/h * (h - wheight))
			},{queue:false,duration:3})
			/*cacheObject.css({
		     'top' : -((e.pageY-cacheObject.offset().top)/h * (h - wheight))
		})*/
		}
	 }
           return this;
		}); // end each
	}

})(jQuery);
jQuery(document).ready(function(){
  if (/*jQuery.browser.safari && */ document.readyState != "complete"){
    console.info('done');
    setTimeout( arguments.callee, 120 );
    return;
  } 

 $('body').zoom({ 
 })
})
