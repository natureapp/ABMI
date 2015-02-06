/* -----------------------------------------------------------------------

ABMI Slide Navigation Menu / JS File (Menu System)
Version: 1.0
Latest Update: 2/12/2014
By: Syncopate Media
Email: hosting@syncopatemedia.com

----------------------------------------------------------------------- */

$(function(){ 
	
			/* ----- GET DATA BTN ------- */
			$("div#get-data-btn").click(function(e) {

				e.preventDefault();
				
				var allDataFields = $('#data-input-container').find('input:checkbox');
				var dataArray = [];

				var ct = 0;
				
	            allDataFields.each(function(){
		            
					dataArray[ct] = { 'id':$(this).prop('id'),'state':$(this).prop('checked'), 'name':$(this).val() };
					ct++;
	            });
	              
	            //DEBUG
	            console.log( JSON.stringify(dataArray) );
            
            /* ++++++++++++++++++++++++ */
                        
				//AJAX
				$.ajax({
				  type: "POST",
				  cache: false,
				  url: "processingfile.html",
				  data: { elements : dataArray },
				  dataType: "html"
				  
				})
					.done(function( html ) {
					
						$('#download-data-area').fadeOut( 400, function() {	
							$('#download-data-area').html( html ).fadeIn( 800 );  
						});

					});//done ajax
					
            /* ++++++++++++++++++++++++ */
				
			});//click function 
			/* ----- GET DATA BTN ------- */


		/* --------------------------------------- */


            /* GENERAL SECTION */ 
			$("#map-container").hide();
			$('.sub-sub-options').hide();
			$('.sub-optns').hide();
			$(".sub-slide-nav").hide();
			$(".slide-nav > .menu-child").hide();
            $(".slide-nav").hide();
            /* END GENERAL SECTION */
  
            
		/* --------------------------------------- */


			/* ----- .parent BTN ------- */
            $(".parent").click(function() {

				
				$(".slide-nav > .menu-child").hide();

	            $(".slide-nav").animate({width: 'toggle'}, function(){
		            $(".slide-nav > .menu-child").fadeToggle(200, "linear");    
		        });
				
				if ($("#map-container").is(":visible")) {
					$("#map-container").fadeToggle(200, "linear");
				}

            });//click function
			/* ----- .parent BTN ------- */
			            
 
		/* --------------------------------------- */

		
			/* ----- .parent-gis-data BTN,  SIDENAV GIS DATA SUB MENU ------- */
			$(".parent-gis-data").click(function() {
				
				$(".gis-data").slideToggle(200, function(){
					if( $(".gis-data").css('display') == 'none' ){ $(".parent-gis-data > a > i").css({'background-position':'-48px 0px'}); }
					else{ $(".parent-gis-data > a > i").css({'background-position':'-28px 0px'}); }	
				});

			});//click function
			/* ----- .parent-gis-data BTN,  SIDENAV GIS DATA SUB MENU ------- */


		/* --------------------------------------- */

			
			/* -----  a.first-child BTN,  SIDENAV SUB MENU ------- */			
            $("a.first-child").click(function(){
	            
	            var thisE = $(this);

				thisE.addClass('sub-parent-active');
				
				thisE.next("div.sub-slide-nav").children(".menu-child").hide();

	            thisE.next("div.sub-slide-nav").animate({width: 'toggle'}, function(){
		            thisE.next("div.sub-slide-nav").children(".menu-child").fadeToggle(200, "linear", function(){
			            
			            $("a.first-child").each(function(){
	
							if( thisE.prop('id') != $(this).prop('id') ){
								
								if( $(this).hasClass('sub-parent-active') ){
									$(this).removeClass('sub-parent-active');
								}
								
								if( $(this).next("div.sub-slide-nav").is(":visible") ){
									
									var tnext = $(this).next("div.sub-slide-nav");
									
									tnext.children(".menu-child").fadeOut(100, function(){
										tnext.fadeOut(200);
									});
			
								}
								
							}//if not this
							
						});//for each cleanup
						
						//----------------------------------
						if ( (thisE.next("div.sub-slide-nav").is(":visible") && !$("#map-container").is(":visible")) || (!thisE.next("div.sub-slide-nav").is(":visible") && $("#map-container").is(":visible")) ) {
							$("#map-container").fadeToggle(200, "linear");
						//map-container
						}
			            //----------------------------------
			            			            
		            });    
		        });

			});//click function
			/* -----  a.first-child BTN,  SIDENAV SUB MENU ------- */
			
			
			/* ==================================================================================== */
			
			
			/* -----  TERRESTRIAL SIDENAV SUB SUB MENU ------- */
            $('.terrestrial-form').on('change', 'input:checkbox', function() {
	            
	            updateOptions( $(this).prop('name'), $(this).data('heading') );
                $(this).parent().toggleClass('highlight', this.checked);
                
            });

            $("#select-terrestrial").click(function() {

                $('input[name=habitat1]').attr('checked', true);
                $('input[name=terrestrial]').attr('checked', true);
                $('input[name=terrestrial]').parent().addClass('highlight', this.checked);
                $('input[name=habitat1]').parent().addClass('highlight', this.checked);
                
               updateOptions( 'habitat1', 'terrestrial-habitat' );
               updateOptions( 'terrestrial', 'terrestrial-species' );
               
            });//on change function
            
            
            $("#clear-terrestrial").click(function(e) {
	           
	           e.preventDefault();
	           
	           $("#clear-terrestrial").trigger("reset");

               $('input[name=habitat1]').attr('checked', false);
               $('input[name=terrestrial]').attr('checked', false);
               $('input[name=terrestrial]').parent().removeClass('highlight', this.checked);
               $('input[name=habitat1]').parent().removeClass('highlight', this.checked);
               
               updateOptions( 'habitat1', 'terrestrial-habitat' );
               updateOptions( 'terrestrial', 'terrestrial-species' );
               
            });//click function
			/* -----  TERRESTRIAL SIDENAV SUB SUB MENU ------- */


			/* ==================================================================================== */


			/* -----  WETLAND SIDENAV SUB SUB MENU ------- */
            $('.wetland-form').on('change', 'input:checkbox', function() {
	            
	            updateOptions( $(this).prop('name'), $(this).data('heading') );
                $(this).parent().toggleClass('highlight', this.checked);
                
            });//on change function

            $("#select-wetland").click(function() {

                $('input[name=habitat2]').attr('checked', true);
                $('input[name=wetland]').attr('checked', true);
                $('input[name=wetland]').parent().addClass('highlight', this.checked);
                $('input[name=habitat2]').parent().addClass('highlight', this.checked);
                
               updateOptions( 'habitat2', 'wetland-habitat' );
               updateOptions( 'wetland', 'wetland-species' );
               
            });//click function
            
            
            $("#clear-wetland").click(function(e) {
	           
	           e.preventDefault();
	           
	           $("#clear-wetland").trigger("reset");

               $('input[name=habitat2]').attr('checked', false);
               $('input[name=wetland]').attr('checked', false);
               $('input[name=wetland]').parent().removeClass('highlight', this.checked);
               $('input[name=habitat2]').parent().removeClass('highlight', this.checked);
               
               updateOptions( 'habitat2', 'wetland-habitat' );
               updateOptions( 'wetland', 'wetland-species' );
               
            });//click function
			/* -----  WETLAND SIDENAV SUB SUB MENU ------- */
        

			/* ==================================================================================== */


			$('.region-form').on('change', 'input:checkbox', function() {
				
				if( !$(this).hasClass('has-child-sub') ){
					updateOptions( $(this).prop('name'), $(this).data('heading') );
				}
				
            });//on change function	

			$(".region-form input[type=checkbox]").click(function() {
				
				var newhtml = '';

					var allDataFields = $('#data-input-container').find('input:checkbox');
					var jsonData = [{'region-select': $(this).prop('id')}];

					allDataFields.each(function(){
					
						jsonData[$(this).prop('id')] = $(this).prop('checked');
						
	            	}); 

					//AJAX
					$.ajax({
					  type: "POST",
					  cache: false,
					  url: "getmapfile.html",
					  data: jsonData
					})
					  .done(function( html ) { newhtml = html; });
				
				//}//IF checked
					
				$('#map-container > #html-map').fadeOut( 400, function() {	
					$('#map-container > #html-map').html( newhtml ).fadeIn( 800 );  
				});
				

			});//click function
			

            $("#clear-region-form").click(function() {
	            
                $('.region-form').trigger("reset");
                $('.region-form ul.sub-optns').slideUp();
                $('#map-container > #html-map').fadeOut( 300, function() {	
					$('#map-container > #html-map').html('').fadeIn( 600 );  
				});
				
				updateOptions( 'natural-regions', 'async-region' );
				
            });//click function
            
            /* ------------------------- */
            
            //natural-regions
            
            $('.has-child-sub').click(function(e) {
                
                var thisbox = $(this);
                var childul = $(this).parent().next('ul.sub-optns');
                
                if ( !childul.is(':visible') ){

                    childul.slideDown();
                    thisbox.prop('checked', true);

                }
                else{

	                childul.slideUp();
	                
	                var boxes = childul.find('input:checkbox');
	                var active = false;
	                
	                boxes.each(function(){
		                if( $(this).prop('checked') ){
			                active = true;
			                thisbox.prop('checked', true);
		                }
	                });
	                
	                if( !active ){
		                boxes.each(function(){
		                	$(this).prop('checked', false);
	                	});
	                }
	                                
				}//else
					
            }).change();//click function
            
            /* ----------------------------------- */

			/* YEARS SECTION */
            $('#select-years').click(function() {
                $('input[name=years]').prop('checked', true);
                $('input[name=years]').parent().addClass('highlight', this.checked);
            });//click function


            $('.years-form').on('change', 'input:checkbox', function() {
	            updateOptions( $(this).prop('name'), $(this).data('heading') );
                $(this).parent().toggleClass('highlight', this.checked);
            });//on change function


            $("#clear-years").click(function() {
                $('input[name=years]').attr('checked', false);
                $('input[name=years]').parent().removeClass('highlight', this.checked);
            });//click function               

			
            /* ----------------------------------- */			
			
			
			/* DATA TYPE SECTION */
            $('.data-type-form').on('change', 'input:checkbox', function() {  
	            updateOptions( $(this).prop('name'), $(this).data('heading') );
                $(this).parent().toggleClass('highlight', this.checked);
            });//on change function


            /* ----------------------------------- */



});// end primary load function


/* ================================================== */
/* ================================================== */

/* FUNCTION - UPDATE DATA SELECTION ON CHANGE */

var updateOptions = function(thisName,thisID){
        
        var vals = '';
        var sep = '';
        
        $('input[name='+thisName+']').each(function(){
        	
        	if( $(this).prop('checked') ){

	        	vals += sep + $(this).val(); 	
		        sep = ', ';

	        }
	        
        });
        
        if(vals.length == 0){ vals = '<span class="noselect">none selected</span>'; }
        
        $('#map-container #async-map-details #'+  thisID).html(vals); 
        
    };

/* ================================================== */
/* ================================================== */


//EOF