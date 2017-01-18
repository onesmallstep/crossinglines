(function($) {
	
	var solveTimeout;
	
	var hintTimeout;
	
	
	
	var feed_app_id;
	var feed_display;
	var feed_link;
	var feed_picture;
	var feed_name;
	var feed_caption;
	var feed_description;
	var feed_redirect;
	
	var sebastian_popup_start;
	var sebastian_popup_complete;
	var sebastian_messages;
	
	var mute = false;
	
	

	//***************************************
	// Audio
	//**************************************/
	$(document).ready(function(){
		if($('.node-type-case').length > 0){
			if (typeof window.Audio != 'undefined') { 
				if(mute == false){
					$('#audio #inter')[0].play();
					$('#cl-sound-toggle').on('click', function(){
						if( $('#cl-sound-toggle .on').is(':visible') ){
							// Turn Sound On
							mute = false;
							$('#cl-sound-toggle .on').fadeOut(100, function(){
								$('#cl-sound-toggle .off').fadeIn(100);
								$('#audio #inter').prop('volume', 1);
								$('#audio #gameplay').prop('volume', 1);
							});
						} else {
							// Turn Sound Off
							mute = true;
							$('#cl-sound-toggle .off').fadeOut(100, function(){
								$('#cl-sound-toggle .on').fadeIn(100);
								$('#audio #inter').prop('volume', 0);
								$('#audio #gameplay').prop('volume', 0);
							});
						}
					});
				}
			}
		}
	});
	
	//***************************************
	// Dropkick
	//**************************************/
	$.fn.sonycl_gameplay_dropkick = function() {
		
		if(jQuery.browser.mobile == false){
			$(this).dropkick({
				change: function (value, label) {
				    $('#cl-time-progress').find('input[name="time-left"]').val($('#countdown_dashboard').getDiffSecs());
				    $(this).change();
			    }
			});
		} else {
		
			$('#location #cl-time-progress #edit-locations').css({
				'top':0,
				'visibility':'visible',
			});
		}
	}
	
	//***************************************
	// Dropkick
	//**************************************/
	$.fn.sonycl_gameplay_marquee = function() {
		$(this).marquee('case-file-marquee');
	}
	
	//***************************************
	// Solve
	//**************************************/
	$.fn.sonycl_gameplay_display_solve = function(){
		$('#cl-time-progress .cl-solve-button').fadeOut(100);
		$('#cl-time-progress .cl-guess-location').show();
		$('#cl-time-progress .cl-guess-location .spacer').slideDown(300, function(){
			$('#cl-time-progress .cl-guess-location .guessbox').delay(100).fadeIn(300, function(){
				$('#cl-time-progress .cl-guess-location .guessbox label').addClass('open');
				//$('#cl-time-progress .cl-guess-location .guessbox').addClass('open');
				$('#cl-time-progress .cl-guess-location .guessbox').pulse({'background-color':'rgba(0,0,0,0.4)'},{pulses:-1, duration:300, returnDelay:300, interval:100});
			});
		});
	}
	
	//***************************************
	// Scroll
	//**************************************/
	$.fn.sonycl_gameplay_scroll = function(){
		if($(this).html().length > 160){
			$(this).slimScroll({
				color: '#000',
				position: 'right',
				height: '230px',
				railColor: '#666',
				railVisible: false,
				alwaysVisible: true
			});
		}
	}
	
	//***************************************
	// Options Overlay
	//**************************************/
	$.fn.sonycl_gameplay_overlay_display = function(){
		$(this).show(); // this = #overlays
		$('.cl-options-menu ul').fadeOut(200);
		$(this).find('.close').one('click', function(){
			$('#overlays').fadeOut(200);
		});
	}
	
	//***************************************
	// Location Loading
	//**************************************/
	$.fn.sonycl_gameplay_location_load = function(ps, pc, cc, ccf, cc2, cli){
	
		clearTimeout(solveTimeout);
	
		$clues = $(this);
		//$clues.find('.cl-clues-container').show();
		//$clues.find('.cl-time-progress').show();
		//$clues.find('.cl-options-menu').show();
		$('.cl-briefing').html('');
		$('.cl-start').hide().fadeIn(500);
		
		sebastian_popup_start = ps;
		sebastian_popup_complete = pc;
		
		
		$('#cl-solutions').off('click','.cl-clue-back');		
		$('#cl-solutions').on('click','.cl-clue-back',function(){
			$('#cl-solutions').fadeOut(300, function(){
				$('#cl-solutions').html('').show();
				$('.cl-clues-container').stop(true,true).fadeIn(); animateClueMenu(false);
				$('#cl-time-progress .cl-progress').stop(true,true).fadeIn(300);
				$('#cl-time-progress .cl-time-remaining').stop(true,true).fadeIn(300);
				$('#cl-time-progress .cl-guess-location').stop(true,true).fadeOut(300);
				$('#cl-case-file').stop(true,true).fadeIn(300);
				//
				$('#cl-time-progress .cl-guess-location .guessbox label').removeClass('open');
				$('#cl-time-progress .cl-guess-location .guessbox').hide().pulse('destroy');
				$('#cl-time-progress .cl-guess-location').hide();
				$('#cl-time-progress .cl-guess-location .spacer').hide();
				$('#cl-time-progress .cl-solve-button').fadeIn(100);
			});
		});
		
		$('#location').off('click','.cl-clue-start');
		$('#location').one('click','.cl-clue-start', function(event){
			// Don't show sebastian again
			intro = false;
			// Get the seconds
			var seconds = parseInt($(this).attr('rel'));
			// Do work
			$('.cl-start .cl-speech-container').fadeOut(300, function(){
				$('.cl-start').fadeOut(300, function(){
					
					
					$('#location #static').fadeIn(300, function(){
						$('.cl-clues-container').delay(300).fadeIn(200, function(){
							animateClueMenu(true);
							$('#cl-case-file').fadeIn();

						});
					});
					$('#location #cl-loading-location').show().delay(100).pulse({'opacity':1},{pulses:1, duration:100, returnDelay:100, interval:100}, function(){
						$('#location #cl-loading-location').css({'opacity':1}).pulse({'opacity':0},{pulses:1, duration:50, returnDelay:50, interval:50}, function(){
							$('#location #cl-loading-location').css({'opacity':1}).pulse({'opacity':0},{pulses:1, duration:100, returnDelay:100, interval:100}, function(){
								$('#location #cl-loading-location .progress-text').html(cc).pulse({'opacity':0},{pulses:3, duration:100, returnDelay:200, interval:100}, function(){
									$('#location #cl-loading-location .progress-text').hide().html(ccf).show().pulse({'opacity':0},{pulses:2, duration:100, returnDelay:200, interval:100}, function(){
										$('#location #cl-loading-location .progress-text').hide().html(cc2).show().pulse({'opacity':0},{pulses:2, duration:100, returnDelay:200, interval:100}, function(){
											$('#location #cl-loading-location .progress-text').hide().html(cli).show().pulse({'opacity':0},{pulses:-1, duration:100, returnDelay:200, interval:100});
										});
										$('#location .cl-clue-image-macro').show().delay(300).pulse({'opacity':0},{pulses:4, duration:50, returnDelay:50, interval:50}, function(){
											$('#location .cl-clue-image-macro').hide().css({'opacity':1}).fadeIn(1000);
											$('#location #static').delay(2000).fadeOut(5000);
											
											$('#cl-time-progress').fadeIn();
											
											
											// Countdown
										    
											$('#countdown_dashboard').countDown({
												targetOffset: {
													'day': 		0,
													'month': 	0,
													'year': 	0,
													'hour': 	0,
													'min': 		0,
													'sec': 		seconds
												},
												// onComplete function
												onComplete: function() {
													$('#cl-time-progress').find('input[name="time-left"]').val('zero');
													$('#cl-time-progress .location-select').change();
												}
											});
											
											var warning = parseInt(((seconds - ((1/(seconds/30)) * seconds)) * 1000) + 1000);
											clearTimeout(solveTimeout);
											solveTimeout = setTimeout(function(){
												$('.cl-time-remaining').addClass('solve-shadow').stop(true, true).pulse({'background-color':'#550000'}, {pulses:20, duration:400, returnDelay:300, interval:300}, function(){
													$('.cl-time-remaining').pulse({'background-color':'#770000'}, {pulses:10, duration:200, returnDelay:150, interval:150}, function(){
														$('.cl-time-remaining').pulse({'background-color':'#990000'}, {pulses:-1, duration:100, returnDelay:75, interval:75});
													});
												});
											}, warning);
											
											clearInterval(hintTimeout);
											hintTimeout = setInterval(function(){
												sonycl_gameplay_clue_reminder();
											}, 20000);
										});
									});
								});
							});
						});
					});
				});
			});
			
			
			//***************************************
			// Case Info Click
			//**************************************/
			$('#cl-case-file .cl-case-file-title').on('click', function(){
				$('.cl-options-menu #cl-dialog-caseinfo-link').click();
			});
			
			
			
			//***************************************
			// Audio
			//**************************************/
			setTimeout(function(){
				if (typeof window.Audio != 'undefined') { 
					$('#audio #gameplay').prop('currentTime', 0);
					if(mute == false){
						$('#audio #gameplay').prop('volume', 1);
						$('#audio #gameplay')[0].play();
					}
				
				}
			},5700);
			//$('#audio #gameplay').prop('volume', 0);
			//$('#audio #gameplay').delay(4000).animate({'volume':1},100);
			
			if (typeof window.Audio != 'undefined') { 
				$('#audio #inter').animate({'volume':0}, 5700);
			}
			//$('#location .cl-clue-image-macro').fadeIn();
			
			
		});
		
		// $('#location #cl-loading-location').delay(1000).fadeIn(1000);
		

		$('#cl-clues').on('click', '.cl-clue-close', function(){
			sonycl_gameplay_reset_clue_content(false);
		});
		
		$('#cl-time-progress .cl-guess-location').stop(true, true).hide(); // Force hide, can't figure out where this is coming from
	}
	
	$.fn.sonycl_gameplay_fade_out_sound = function(){
		
		if (typeof window.Audio != 'undefined') { 
			$(this).animate({'volume':0}, 2500, function(){
				$(this)[0].pause();
			});
			
			//$('#audio #inter').prop('currentTime', 0);
			$('#audio #inter')[0].play();
			if(mute == false){ 
				$('#audio #inter').animate({'volume':1}, 4000);
			}
		}
	
	}
	
	function sonycl_gameplay_clue_reminder(){
		$clues = $('#location');
		// Agent
		$clues.find('.cl-clues .cl-clue-button.cl-clues-agent .cl-clues-image').show().stop(true, true).animate({
			height: "160px"
		}, 500, 'easeOutQuart', function(){
			$clues.find('.cl-clues-container .cl-clues .cl-clues-agent .cl-clues-image').delay(1000).animate({ height: "0" }, 250);
		});
		
		// Social
		$clues.find('.cl-clues .cl-clue-button.cl-clues-social .cl-clues-image').show().stop(true, true).delay(200).animate({
			height: "160px"
		}, 500, 'easeOutQuart', function(){
			$clues.find('.cl-clues-container .cl-clues .cl-clues-social .cl-clues-image').delay(1000).animate({ height: "0" }, 250);
		});
		
		// Geo
		$clues.find('.cl-clues .cl-clue-button.cl-clues-geo .cl-clues-image').show().stop(true, true).delay(400).animate({
			height: "160px"
		}, 500, 'easeOutQuart', function(){
			$clues.find('.cl-clues-container .cl-clues .cl-clues-geo .cl-clues-image').delay(1000).animate({ height: "0" }, 250);
		});
	}
	
	
	/*
	// Degregated cause of popup blocker
	
	$.fn.soncycl_gameplay_location_variables = function(id, display, link, picture, name, caption, description, redirect){
		//$('#notreal')
		$('#notreal').on('click', function(){
			// calling the API ...
			var obj = {
				method: 'feed',
				redirect_uri: 'http://ssl.pistonclients.com',
				link: link,
				picture: picture,
				name: name,
				caption: caption,
				description: description,
			};
			
			function callback(response) {
				$ = jQuery.noConflict();
				if (response && response.post_id) {
					sonycl_gameplay_pause_time();
					$('#cl-clues .cl-clue-intel-social').fadeIn(300, function(){
						$('#cl-clues .cl-clue-intel-social').delay(3000).fadeOut(200, function(){
							$('#cl-clues').html('');
							$('.cl-clues-container .cl-clues-social').removeClass('cl-clue-button-active');
						});
					});
			    } else {
			    	$('#cl-clues').html('');
			    	$('.cl-clues-container .cl-clues-social').removeClass('cl-clue-button-active');
			    }
			}
			
			FB.ui(obj, callback);
		});
	}
	
	$.fn.notclick = function(){
		$('#notreal').click();
	}
	*/
	
	
	$.fn.sonycl_gameplay_reset_clues_menu = function(){
		$cont = $(this);
		$cont.fadeOut(300, function(){
			$(this).find('.cl-clue-button').css({'right':'500px'});
			$(this).find('.cl-clues').css({'overflow':'hidden'});
		});
		$cont.find('.cl-clue-button').removeClass('cl-clue-button-active');
	}
	
	function animateClueMenu(intro){
		$clues = $('#location');
		
		//startClueMenu
		$clues.find('.cl-clues').stop(true, true).animate({
			//width: 545
		}, 300, function(){
			
			$clues.find('.cl-clues-geo').stop(true, true).animate({ 
				right: 0,
				overflow: "auto",
			}, 200, function(){
				
				$clues.find('.cl-clues-social').stop(true, true).animate({ 
					right: "160px",
					overflow: "auto",
				}, 150, function(){
		
					$clues.find('.cl-clues-agent').stop(true, true).animate({ 
						right: "320px",
						overflow: "auto"
					}, 100, function(){
		
						$clues.find('.cl-clues').css({
							overflow: "visible"
						});
		
						$clues.find('.cl-clues-container .cl-clues .cl-clue-button').css({
							overflow: "visible"
						}).addClass('disabled');
						// Agent
						$clues.find('.cl-clues .cl-clue-button.cl-clues-agent .cl-clues-image').show().stop(true, true).animate({
							height: "160px"
						}, 500, 'easeOutQuart', function(){
							$clues.find('.cl-clues-container .cl-clues .cl-clues-agent .cl-clues-image').stop(true, true).animate({ height: "0" }, 250);
						});
						// Social
						$clues.find('.cl-clues .cl-clue-button.cl-clues-social .cl-clues-image').delay(500).show().stop(true, true).animate({
							height: "160px"
						}, 500, 'easeOutQuart', function(){
							$clues.find('.cl-clues-container .cl-clues .cl-clues-social .cl-clues-image').stop(true, true).animate({ height: "0" }, 250);
						});
						if(intro == true){
							// Map
							$clues.find('.cl-clues .cl-clue-button.cl-clues-geo .cl-clues-image').delay(1000).show().stop(true, true).animate({
								height: "160px"
							}, 500, 'easeOutQuart', function(){
								var $bubble = $('.cl-clues .cl-clue-button.cl-clues-geo .cl-speech-container');
								var $originalMessage = $bubble.find('.cl-clue-content').html();
								$bubble.find('.cl-clue-content').html(sebastian_popup_start);
								$bubble.fadeIn(300, function(){
									$bubble.find('.cl-clue-content').delay(2600).fadeOut(100, function(){
										$bubble.find('.cl-clue-content').html(sebastian_popup_complete).fadeIn(300, function(){
											$bubble.delay(3000).fadeOut(200, function(){
												$bubble.find('.cl-clue-content').html($originalMessage);
												$clues.find('.cl-clues .cl-clue-button.cl-clues-geo .cl-clues-image').stop(true, true).animate({
													height: "0"
												});
												$clues.find('.cl-clues-container .cl-clues .cl-clue-button').removeClass('disabled');
												$clues.find('.cl-clue-button').find( '.cl-clues-text' ).off('hover').off('click').on('hover', thumbEvent).on('click', thumbEvent);
												
												$clues.find('.cl-clues-container').on('mouseleave', function(){
													$(this).find('.cl-speech-container').stop(true,true).hide();
												});
													
											});
										});
									});
								})
							});
						} else {
							// Social
							$clues.find('.cl-clues .cl-clue-button.cl-clues-geo .cl-clues-image').delay(500).show().stop(true, true).animate({
								height: "160px"
							}, 500, 'easeOutQuart', function(){
								$clues.find('.cl-clues-container .cl-clues .cl-clues-geo .cl-clues-image').stop(true, true).animate({ height: "0" }, 250);
							});
							
							$clues.find('.cl-clues-container .cl-clues .cl-clue-button').removeClass('disabled');
						}
					});
				});
			});
		});
	};
	
	/*
	 * @function:	thumbEvent
	 * @purpose:	Event Handler for Clues
	 * @param: 		event - used to check type
	 *
	 */
	
	function thumbEvent(event){
		if( $(this).parent().hasClass('disabled') == false || $(this).parent().hasClass('cl-clue-button-active') == false ){
			
			switch(event.type){
				case 'mouseenter':
					if($(this).parent().hasClass('map-open')){ return false; }
					if($(this).parent().hasClass('cl-clue-button-active')){ return false; }
					$('.cl-clues-container .cl-clues .cl-clue-button').each(function(){
						$(this).find('.cl-clues-image').css({ height:'0' });
						$(this).find('.cl-speech-container').hide();
					});
					$(this).parent()
						.addClass('cl-clue-button-hover')
						.find('.cl-clues-image').delay(225).stop(true, true).animate({
							height: "160px"
						}, 400, 'easeOutQuart', function(){
							$(this).parent().find('.cl-speech-container').stop(true,true).fadeIn(); 
						});
					break;
				case 'mouseleave':
					if($(this).parent().hasClass('map-open')){ return false; }
					$(this).parent().find('.cl-speech-container').css({'display':'none'});
					$(this).parent().removeClass('cl-clue-button-hover');
					$(this).parent().find('.cl-clues-image').stop(true, true).animate({ height:'0' });
					break;
				case 'click':
					clearInterval(hintTimeout);
					if( $(this).parent('.cl-clue-button').hasClass('cl-clue-button-active') ){
						return false;
					} else {
						sonycl_gameplay_reset_clue_content(true);
						$(this).parent('.cl-clue-button').addClass('cl-clue-button-active');
					}
					break;
				default:
			}
		}
	}

	function sonycl_gameplay_reset_clue_content(hard){
		if(hard){
			$('#cl-clues').hide().html('').show();
		} else {
			$('#cl-clues').fadeOut(200, function(){
				$('#cl-clues').hide().html('').show();
			});
		}
		
		$('.cl-clue-button').removeClass('cl-clue-button-active');
		$('.cl-clue-button-active').removeClass('cl-clue-button-active');
	}
	
	//***************************************
	// Hide Extras
	//**************************************/
	$.fn.sonycl_gameplay_hide_extras = function(){
		$('#cl-time-progress .cl-progress').fadeOut(300);
		$('#cl-time-progress .cl-time-remaining').fadeOut(300);
		$('#cl-time-progress .cl-guess-location').fadeOut(300);
		$('#cl-case-file').fadeOut(300);
	}
	
	//***************************************
	// Hide Extras
	//**************************************/
	$.fn.sonycl_gameplay_mission_success = function(badWords){
		$('#cl-solutions #edit-name').keypress(function (e) {
		   	var charCode = e.which;
		   	if(charCode == 8 || charCode == 0){ 
		   		return;
		   	} else {
			   	var regex = new RegExp("^[a-zA-Z0-9 ]+$");
			    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
			    if (regex.test(str)) {
			        return true;
			    }
			    e.preventDefault();
			    return false;
		    }
		});
		
		var words = badWords;
		var regstring = "(^|\\s)+(" + words + ")+($|\\s)";
		/*
		$('#cl-solutions #edit-name').keyup(function(e){
		    var value = $("#edit-name").val();
		    var regex = new RegExp(regstring);
		    value = value.replace(regex, "");
		    $("#cl-solutions #edit-name").val(value);
		});
		*/
		
		
		$('#sonycl-gameplay-save-score-form #edit-submit').on('mousedown', function(e){
			var value = $("#sonycl-gameplay-save-score-form #edit-name").val();
			var regex = new RegExp(regstring);
		    if(value.search(regex) != -1){
		        $("#edit-name").addClass('fail');
		        return false;
		    } else {
		        $('#sonycl-gameplay-save-score-form #edit-submit').dblclick();
		    }

		});
		
		$('#sonycl-gameplay-save-score-form #edit-submit').on('click', function(e){
			//console.log(e);
			//alert('click');
			//event.preventDefault();
			return false;
		});
		
		$('#sonycl-gameplay-save-score-form').submit(function(e) {
			
			/*event.preventDefault();
			alert($('#sonycl-gameplay-save-score-form').attr('id'));
		    /*
		    var value = $("#sonycl-gameplay-save-score-form #edit-name").val();
			var regex = new RegExp(regstring);
		    if(value.search(regex) != -1){
		        $("#edit-name").addClass('fail');
		        alert('fail');
		        //return false;
		    } else {
		    	alert('pass');
		        //return true;
		    }
		    */
		   // return false;
		});
	}
	
	//***************************************
	// Time Reduction
	//**************************************/
	$.fn.sonycl_gameplay_reduce_time = function(reduceAmount){
		clearTimeout(solveTimeout);
		
		var seconds = $('#countdown_dashboard').getDiffSecs() - reduceAmount;
		if(seconds < 0){ seconds = 4; }
		
		var warning = parseInt(((seconds - ((1/(seconds/30)) * seconds)) * 1000) + 1000);
		solveTimeout = setTimeout(function(){
			$('.cl-time-remaining').addClass('solve-shadow').stop(true, true).pulse({'background-color':'#550000'}, {pulses:20, duration:400, returnDelay:300, interval:300}, function(){
				$('.cl-time-remaining').pulse({'background-color':'#770000'}, {pulses:10, duration:200, returnDelay:150, interval:150}, function(){
					$('.cl-time-remaining').pulse({'background-color':'#990000'}, {pulses:-1, duration:100, returnDelay:75, interval:75});
				});
			});
		}, warning);
	
		$('#countdown_dashboard').stopCountDown();
	    $('#countdown_dashboard').setCountDown({
	        targetOffset: {
	            'day':      0,
	            'month':    0,
	            'year':     0,
	            'hour':     0,
	            'min':      0,
	            'sec':      seconds,
	        }
	    });            
	    $('#countdown_dashboard').startCountDown();
	}
	
	//***************************************
	// Time Pause for Social
	//**************************************/
	sonycl_gameplay_pause_time = function(){
		$('#countdown_dashboard').stopCountDown();
		
		$('#countdown_dashboard .minutes_dash').pulse({'color':'rgb(50,0,0)'},{pulses:40, duration:300, returnDelay:300, interval:100});
		$('#countdown_dashboard .seconds_dash').pulse({'color':'rgb(50,0,0)'},{pulses:40, duration:300, returnDelay:300, interval:100});

		
		clearTimeout(solveTimeout);
		
		
		var seconds = $('#countdown_dashboard').getDiffSecs();
		var warning = parseInt(((seconds - ((1/(seconds/30)) * seconds)) * 1000) + 1000);
		
	

	    setTimeout(function(){
	    	$('#countdown_dashboard').startCountDown();
	    	
	    	solveTimeout = setTimeout(function(){
				$('.cl-time-remaining').addClass('solve-shadow').stop(true, true).pulse({'background-color':'#550000'}, {pulses:20, duration:400, returnDelay:300, interval:300}, function(){
					$('.cl-time-remaining').pulse({'background-color':'#770000'}, {pulses:10, duration:200, returnDelay:150, interval:150}, function(){
						$('.cl-time-remaining').pulse({'background-color':'#990000'}, {pulses:-1, duration:100, returnDelay:75, interval:75});
					});
				});
			}, warning);
	    }, 30000);      
	    
	}

	
	//***************************************
	// Post to Facebook
	//**************************************/
	/* // Old Post Version
	$.fn.sonycl_gameplay_post_to_facebook = function(appid, display, link, picture, name, caption, description ){
		FB.init({appId: "191593130998242", status: true, cookie: true});
	
		// calling the API ...
		var obj = {
			method: 'feed',
			redirect_uri: 'http://ssl.pistonclients.com',
			link: link,
			picture: picture,
			name: name,
			caption: caption,
			description: description,
		};
		
		function callback(response) {
			document.getElementById('clues').innerHTML = "Post ID: " + response['post_id'];
		}
		
		FB.ui(obj, callback);
	}
	*/
	
	//***************************************
	// Submit Score View Leaderboard
	//**************************************/
	$.fn.sonycl_gameplay_score_submitted = function(){
		$(this).off('click');
		$(this).on('click', function(){
			$('.cl-options-menu #cl-dialog-leaderboard-link').click();
		});
	}

	//***************************************
	// Google Maps
	//**************************************/
	function Shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	var panorama;
	var sv;
	var map;
	
	window.initialize = function() {
		
		sv = new google.maps.StreetViewService();
		

		
		var mapCenter = new google.maps.LatLng( (window.lat - (Math.floor( (Math.random()*5 - Math.random()*5) )) * .00018) + ( Math.random()*.01 - Math.random()*.01 ) , window.long + (Math.floor((Math.random()*5 - Math.random()*5))) * .00018 + ( Math.random()*.01 - Math.random()*.01 ), 7);
		
		
		var novice = { zoom : 14, minzoom : 13, markers : 3, distance: 55 };
		
		var intermediate = { zoom : 14, minzoom : 12, markers : 5, distance: 80 };
		
		var advanced = { zoom : 14, minzoom : 13, markers : 7, distance: 125 };
		
		var config = [ novice, intermediate, advanced ];
		
		console.log('level: ' + window.level);
		console.log(config[window.level].markers);
		
		var myLatlng =  mapCenter;
	
		var mapOptions = {
			zoom: config[window.level].zoom,
			minZoom: config[window.level].minzoom,
			center: myLatlng,
			disableDefaultUI: true,
			zoomControl: true,
			zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.RIGHT_CENTER
		    },
			streetViewControl: true,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
		    mapTypeControl: false,
		    panControl: false,
		    panControlOptions: {
		        position: google.maps.ControlPosition.RIGHT_CENTER
		    },
		    zoomControl: true,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.LEFT_CENTER
		    },
		    scaleControl: false,
		    streetViewControl: false,
		    streetViewControlOptions: {
		        position: google.maps.ControlPosition.RIGHT_CENTER
		    }
		};
		
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
	    var clues = [
			[ window.lat + 25 * 0.00018, window.long],
			[ window.lat + 25 * 0.00017, window.long + 30 * 0.00017],
			[ window.lat, window.long + 30 * 0.00018],
			[ window.lat - 25 * 0.00016, window.long + 30 * 0.00019],
			[ window.lat - 25 * 0.00018, window.long],
			[ window.lat - 25 * 0.00017, window.long - 30 * 0.00017],
			[ window.lat, window.long - 30 * 0.00018],
			[ window.lat + 25 * 0.00018, window.long - 30 * 0.00018],
			
			[ window.lat + 50 * 0.00018, window.long],
			[ window.lat + 50 * 0.00018, window.long + 60 * 0.00019],
			[ window.lat, window.long + 60 * 0.00018],
			[ window.lat - 50 * 0.00016, window.long + 60 * 0.00017],
			[ window.lat - 50 * 0.00017, window.long],
			[ window.lat - 50 * 0.00018, window.long - 60 * 0.00016],
			[ window.lat, window.long - 60 * 0.00018],
			[ window.lat + 60 * 0.00019, window.long - 60 * 0.00018],
			
			[ window.lat + 50 * 0.00018, window.long + 30 * 0.00018],
			[ window.lat + 25 * 0.00016, window.long + 60 * 0.00017],
			[ window.lat - 25 * 0.00017, window.long + 60 * 0.00018],
			[ window.lat - 50 * 0.00018, window.long + 30 * 0.00019],
			[ window.lat - 50 * 0.00018, window.long - 30 * 0.00018],
			[ window.lat - 25 * 0.00019, window.long - 60 * 0.00017],
			[ window.lat + 25 * 0.00017, window.long - 60 * 0.00016],
			[ window.lat + 50 * 0.00018, window.long - 30 * 0.00018],
			
			[ window.lat + 50 * 0.00019, window.long + 90 * 0.00018],
			[ window.lat + 25 * 0.00018, window.long + 90 * 0.00018],
			[ window.lat, window.long + 90 * 0.00018],
			[ window.lat - 25 * 0.00018, window.long + 90 * 0.00017],
			[ window.lat - 50 * 0.00017, window.long + 90 * 0.00018],
			
			[ window.lat + 50 * 0.00016, window.long - 120 * 0.00016],
			[ window.lat + 25 * 0.00018, window.long - 120 * 0.00019],
			[ window.lat, window.long - 90 * 0.00018],
			[ window.lat - 25 * 0.00018, window.long - 120 * 0.00016],
			[ window.lat - 50 * 0.00019, window.long - 120 * 0.00018],
			
			[ window.lat + 50 * 0.00019, window.long + 150 * 0.00018],
			[ window.lat + 25 * 0.00018, window.long + 150 * 0.00018],
			[ window.lat, window.long + 90 * 0.00018],
			[ window.lat - 25 * 0.00018, window.long + 150 * 0.00017],
			[ window.lat - 50 * 0.00017, window.long + 150 * 0.00018],
			
			[ window.lat + 50 * 0.00016, window.long - 150 * 0.00016],
			[ window.lat + 25 * 0.00018, window.long - 150 * 0.00019],
			[ window.lat, window.long - 90 * 0.00018],
			[ window.lat - 25 * 0.00018, window.long - 150 * 0.00016],
			[ window.lat - 50 * 0.00019, window.long - 150 * 0.00018],
			
			[ window.lat + 75 * 0.00019, window.long + 60 * 0.00018],
			[ window.lat + 75 * 0.00018, window.long + 30 * 0.00018],
			[ window.lat + 75 * 0.00016, window.long],
			[ window.lat + 75 * 0.00018, window.long - 60 * 0.00017],
			[ window.lat + 75 * 0.00017, window.long - 30 * 0.00018],
			
			[ window.lat - 75 * 0.00016, window.long + 60 * 0.00016],
			[ window.lat - 75 * 0.00018, window.long + 30 * 0.00019],
			[ window.lat - 75 * 0.00017, window.long],
			[ window.lat - 75 * 0.00018, window.long - 30 * 0.00016],
			[ window.lat - 75 * 0.00019, window.long - 60 * 0.00018],
			

	    ];
	    
		var iterator = 0;
		var newCenter = new google.maps.LatLng(clues[3][0],clues[7][1]);

		Shuffle(clues);
		
		var maxLong = window.long;
		var minLong = window.long;
		var maxLat = window.lat;
		var minLat = window.lat;
		
		
		
		for(var i = 0; i < config[window.level].markers; i++){
			var data = clues[i];
			
			if(maxLong < data[1]) maxLong = data[1];
			if(minLong > data[1]) minLong = data[1];
			if(maxLat < data[0]) maxLat = data[0];
			if(minLat > data[0]) minLat = data[0];
			setTimeout(function() {
		    	addMarker();
		    }, i * 200);
		}
		addLocation();
		var newCenter = new google.maps.LatLng((maxLat+minLat)/2,(maxLong+minLong)/2);
		
		function addMarker() {
			var data = clues[iterator];
			var image = {
				url: 'https://www.crossinglinesgame.com/sites/all/modules/custom/sonycl_gameplay/includes/img/gmap-icon.png',
				size: new google.maps.Size(60, 41),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(18, 41)
			};
			
			var shadow = {
				url: 'https://www.crossinglinesgame.com/sites/all/modules/custom/sonycl_gameplay/includes/img/gmap-shadow.png',
				size: new google.maps.Size(60, 41),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(18, 41)
			};

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng (data[0], data[1]),
				map: map,
				shadow: shadow,
				icon: image,
				animation: google.maps.Animation.DROP,
				draggable: false,
				zIndex: 1,
			});
			
			
			google.maps.event.addListener(marker, 'click', function() {
				sv.getPanoramaByLocation(marker.getPosition(), 50, processSVData);
				$('#cl-map-nav-back').fadeIn(300);
			});
			
			
			iterator++;
		}
		
		function processSVData(data, status) {
			if (status == google.maps.StreetViewStatus.OK) {
				//var marker = new google.maps.Marker({
				//	position: data.location.latLng,
				//	map: map,
				//	title: data.location.description
				//});
				//$('#pano').show
				$panoramaOptions = {
					enableCloseButton: false,
					addressControl: false,
					zoomControl:false,
					linksControl: false,
					panControl:false,
					clickToGo: false,
					pov: {
						heading: 0,
						pitch: -5
					},
					visible: true,
					scrollwheel: false,
				}
				panorama = new google.maps.StreetViewPanorama(document.getElementById("map-canvas"), $panoramaOptions);
				
				panorama.setPano(data.location.pano);
			
				
				
				/*
				google.maps.event.addListener(marker, 'click', function() {
				
					var markerPanoID = data.location.pano;
					// Set the Pano to use the passed panoID
					panorama.setPano(markerPanoID);
					panorama.setPov({
						heading: 270,
						pitch: 0
					});
					
					panorama.setVisible(true);
				});
				*/
			} else {
				//alert('The connection to this camera has been severed.');
				$clues = $('#cl-clues');
				var random = Math.floor((Math.random()*2));
				$clues.find('.cl-speech-container .cl-clue-content').html(sebastian_messages[random]);
				$clues.find('.cl-speech-container').delay(200).fadeIn(200);
				$clues.find('.cl-character').fadeIn(200);
				
				$('#cl-map-nav-back').fadeOut(300);
			}
		}

		
		
		function addLocation(){
			var image = {
				url: 'https://www.crossinglinesgame.com/sites/all/modules/custom/sonycl_gameplay/includes/img/gmap-icon.png',
				size: new google.maps.Size(60, 41),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(18, 41)
			};
			
			var shadow = {
				url: 'https://www.crossinglinesgame.com/sites/all/modules/custom/sonycl_gameplay/includes/img/gmap-shadow.png',
				size: new google.maps.Size(60, 41),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(18, 41)
			};

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng (window.lat, window.long),
				map: map,
				shadow: shadow,
				icon: image,
				animation: google.maps.Animation.DROP,
				draggable: false,
				zIndex: 1,
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				sv.getPanoramaByLocation(marker.getPosition(), 50, processSVData);
				
				$('#cl-map-nav-back').fadeIn(300);

			});
		}
		

		// Perimeter
		var perimeterOptions = {
			strokeColor: '#000000',
			strokeOpacity: 0.65,
			strokeWeight: 2,
			fillColor: '#9e9d46',
			fillOpacity: 0.35,
			map: map,
			center: newCenter,
			radius: 1700 * window.level,
		};
		//perimeter = new google.maps.Circle(perimeterOptions);
		
		var perimeterOptions2 = {
			strokeColor: '#000000',
			strokeOpacity: 0.65,
			strokeWeight: 2,
			fillColor: '#000000',
			fillOpacity: 0.35,
			map: map,
			center: newCenter,
			radius: 10000,
		};
		perimeter = new google.maps.Circle(perimeterOptions2);
		
		map.center = newCenter;
    	
		var controlUI = document.getElementById('cl-map-nav-back');

		google.maps.event.addDomListener(controlUI, 'click', function() {
		    // close out of street view
		    panorama.setVisible(false);
		    
		    // reset center and zoom values
		    map.setCenter(newCenter);
		    map.setZoom(14);
		    
		    $('#cl-map-nav-back').fadeOut(300);

		});
		
	}

	$.fn.initializeGoogleMap = function(lat, long, level, messages) {
		window.lat = lat;
		window.long = long;
		window.level = level;
		sebastian_messages = messages;
		
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_kUURABa_m0bT7rcFrHtLJbNFdcJdP7g&sensor=false&callback=initialize";
		document.body.appendChild(script);
		
		// Sebastian Load
		$('#cl-map-container .cl-character').delay(2000).fadeIn(200);
		$('#cl-map-container .cl-speech-container').delay(2200).fadeIn(200);
		
		$clues = $(this);
		$cluesContainer = $('.cl-clues-container');
		
		
		// Sebastian exit
		$clues.off('click','.cl-clue-explore');
		$clues.on('click','.cl-clue-explore',function(){
			$clues.find('.cl-speech-container').stop(true,true).fadeOut(200, function(){
				//$clues.find('.cl-speech-container').remove();	
			});
			$clues.find('.cl-map-nav').fadeIn(300);
			$clues.find('.cl-character').stop(true,true).delay(50).fadeOut(200, function(){
				//$(this).remove();
				
				$clues.off('click', '#cl-map-nav-close');
				$clues.one('click', '#cl-map-nav-close', function(){
					sonycl_gameplay_reset_clue_content(false);
				});

				
				// Show bubble
				/*
				$cluesContainer.find('.cl-clues .cl-clue-button.cl-clues-geo .cl-clues-image').show().css({'height':0}).stop(true, true).animate({
					height: "160px"
				}, 500, 'easeOutQuart', function(){
					
					var $bubble = $('.cl-clues .cl-clue-button.cl-clues-geo .cl-speech-container');
					var $originalMessage = $bubble.find('.cl-clue-content').html();
					$bubble.find('.cl-clue-content').html('<a id="cl-map-nav-back">Back to Full Map</a><br /><a id="cl-map-nav-close">Close</a>');
					$bubble.fadeIn(200, function(){
						$cluesContainer.on('click', '#cl-map-nav-close', sonycl_gameplay_reset_clue_content());
					});
				});
				*/
			});
		});
		
	}
	
	
	
	callFB();

})(jQuery);

function callFB(){
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '191593130998242', // App ID
        channelURL : '//www.crossinglinesgame.com/fb/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        oauth      : true, // enable OAuth 2.0
        xfbml      : true  // parse XFBML
      });

    // Additional initialization code here
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     d.getElementsByTagName('head')[0].appendChild(js);
   }(document));     
}

function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;

    if (isInIframe) {
        parentUrl = document.referrer;
    }

    return parentUrl;
}

function postToFeed(l, p, n, c, d) {
		
	// calling the API ...
	var obj = {
		method: 'feed',
		redirect_uri: 'http://axn.com',
		link: l,
		picture: p,
		name: n,
		caption: c,
		description: d,
	};
		
	function callback(response) {
		$ = jQuery.noConflict();
		if (response && response.post_id) {
			sonycl_gameplay_pause_time();
			$('#cl-clues .cl-clue-intel-social').fadeIn(300, function(){
				$('#cl-clues .cl-clue-intel-social').delay(3000).fadeOut(200, function(){
					$('#cl-clues').html('');
					$('.cl-clues-container .cl-clues-social').removeClass('cl-clue-button-active');
				});
			});
	    } else {
	    	$('#cl-clues').html('');
	    	$('.cl-clues-container .cl-clues-social').removeClass('cl-clue-button-active');
	    }
	}
	
	FB.ui(obj, callback);
}
