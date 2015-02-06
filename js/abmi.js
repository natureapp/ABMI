jQuery( document ).ready(function( $ ) {
  
	//NO TRANSITIONS ON LOAD
	if( jQuery("body").hasClass("preload") ){ jQuery("body").removeClass("preload"); };
	//---------------------

	//==============================================

    if($('.postmeta.arrow').length){

			var arrowwidth = 0;
			
			$( '.postmeta.arrow' ).each(function( index ) {
				if( !$(this).prev().hasClass('photobox') ){
					arrowwidth = $(this).prev().width() + 40;
					$(this).css('border-width','10px '+arrowwidth+'px 0 0');
				}
			});
	    	

	};
	
	//==============================================

	function initializeGmap( lat , lon, maptitle ) {

		var myLatlng = new google.maps.LatLng(lat , lon);
		
		var MY_MAPTYPE_ID = 'abmi_style';
		
		var mapOptions = {
			zoom: 14,
			center: myLatlng,
			mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID] }, 
			mapTypeId: MY_MAPTYPE_ID 
			};		
			
		var map = new google.maps.Map(document.getElementById('gmap-canvas'), mapOptions);
		
		var marker = new google.maps.Marker({ position: myLatlng, map: map, title: maptitle});
		
		var featureOpts = [
		    { stylers: [ { hue: '#74882E' }, { visibility: 'simplified' }, { gamma: 0.5 }, { weight: 0.5 } ] },
		    { elementType: 'labels', stylers: [ { visibility: 'on' } ] },
		    { featureType: 'water', stylers: [ { color: '#8AB0A3' } ] }
			];
		  
		var styledMapOptions = { name: 'ABMI' };
		
		var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
		
		map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
  
	}
	
	//==============================================
		
	if(jQuery("#gmap-canvas").length ){
		initializeGmap( 53.5288172 , -113.5239991, 'ABMI Headquarters' );
	}

	//==============================================

	/* LOAD MAP VIA CLICK */
	jQuery("body.contact-us").on("click", "a.gmap-content", function(event) {
	 	 	
	 	 event.preventDefault();
	 	 	
	 	 initializeGmap( jQuery(this).data('gmaplon') , jQuery(this).data('gmaplat'), jQuery(this).data('gmaptitle') );
	 	 
	 	 $('html, body').animate({scrollTop: parseInt($('#gmap-canvas').offset().top - 20)}, 800);
	 	 		
	});

	//==============================================	
	
	//if (typeof zoomwizard !== 'undefined' && $.isFunction(zoomwizard)){
	//	jQuery('.dataMapZoom').zoomwizard({ mode: 'window', windowstyle: 1, width: 250, height: 250, hidecursor: false, zoom: 4 });
	//}
	
	//==============================================	
		 
});//ON DOC READY
	
		jQuery(function($){
			
			$('.imageZoom').smoothZoom({
				width: $('.imageZoom').data('width'),
				height: $('.imageZoom').data('height'),
				button_SIZE: 22,
				button_ALIGN: "top left",
				zoom_MAX: 200,
				zoom_OUT_TO_FIT: "NO",
				button_AUTO_HIDE: "YES",
				button_AUTO_HIDE_DELAY: 2,
				responsive: true,
				responsive_maintain_ratio: true,
				max_WIDTH: '',
				max_HEIGHT: ''
			});
		});
		


