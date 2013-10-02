// JavaScript Document²
var Quizz_jb = function(content_$, display_$, userTrack_$, endScreen_$, questions_num) {
				var context = this;
				var questionSet_$; 
				this.questions_num = questions_num;
				////trace("this.questions_num :" + this.questions_num);
				this.userTrack_$ = userTrack_$;
				this.questions_$ = content_$;
				this.display_$ = display_$;
				this.answer_num = 0;
				this.endScreen_$ = endScreen_$;
				this.success_bool = false; 
				// 
				this.onStartQuestion = function (){trace  ("quizz_jb.onStartQuestion is undefined")}
				this.onQuestionAnswer = function (){trace  ("quizz_jb.onQuestionAnswer is undefined")}
				
				
				
				content_$.hide();
				content_$.find ('.solution').hide ();
				
				
				
				context.endScreen_$.find('#playAgain').click (
					function (){
						
				
						init (); 
						
						
						
						}
					
					
					)
				

				//this.questions_$.children().attr("selected_bool", "false");
				this.start = function (){
					init (); 
					
					}

				init = function() {
					
					//alert ("init");
					var IMG_WIDTH = 24; 
					var display_time =0; 
					context.answer_num = 0;
					
					$('#timer').show (600);
					
					
					 $(context.questions_$.children ()).attr ("success_bool", "false").attr ("selected_bool", "false"); 
					context.questions_$.find ('.reponse').removeClass ('true').removeClass ('false').removeClass ('missedTrue').removeClass ('unsellectedFalse').addClass ('button');
					context.userTrack_$.empty ();
					//context.userTrack_$.fadeOut ();  

					
					
					 
					 var space_pix = Math.floor ((context.userTrack_$.width ()-(IMG_WIDTH*context.questions_num))/(questions_num-1)); 
					 
					 //alert (context.userTrack_$.width ()); 
					
					for (var n = 0; n < context.questions_num; n++) {
						
						var img_$ = $("<img src='img/mark0001.jpg' alt='progress'>");
			
						context.userTrack_$.append (img_$);
						if (n < context.questions_num-1) {
						img_$.css ('margin-right', space_pix);
						}
						 

				}
					context.userTrack_$.fadeIn (4000, selectQuestion);
				}
				this.timeOut = function (){
					displayFeedBack (false); 		
				}
				displayFeedBack = function (success_bool, event) {
					//alert ("displayFeedback")
						questionSet_$.attr ("success_bool", success_bool);
						var responseList_$ = $(questionSet_$.find(".reponse"));
						var startPoint = {};
						var text_str = $('#'+String (success_bool)).text ();  
						text_str= text_str.toUpperCase (); 
						 
						
						if (event) {
						startPoint.x =  event.pageX; 
						startPoint.y =  event.pageY -70; 
							
						}else{
						startPoint.x =  $('body').width ()/2; 
						startPoint.y =  400; 
							
						}
						startPoint.x -= 40; 
						
							responseList_$.unbind(); 
						context.answer_num++;
			
							
						var feedBack_$ = $('<div/>');
					
						feedBack_$.addClass ('feedBack');
	feedBack_$.css('background-image',"url(img/mark86x86000" + Number (2 + Number (success_bool)) + ".jpg)");  
		feedBack_$.text (text_str);
						
					context.display_$.append (feedBack_$);
					feedBack_$.css ('left', startPoint.x).css ('top',startPoint.y -50).css ('rotation', 45);
					feedBack_$.fadeIn (30); 
					feedBack_$.animate (
					
					{
					
						rotate:30, 
						top:100
				
					
					}, 600,null, function () {
						
						feedBack_$.fadeOut (400, function () {
								feedBack_$.remove (); 
							var trackImg_$ = $(context.userTrack_$.find ('img')[context.answer_num - 1]);
						var img_num = Number(success_bool) + 2;
						trackImg_$.attr("src", "img/mark000" + img_num + ".jpg");
						trackImg_$.addClass ('filled');
						display_$.delay(1000).fadeOut(600, selectQuestion); 
							
							
							}); 
									
						
						
						}  
					
					
					
					); 
					 
				
			
						
						
						
						
						context.onQuestionAnswer ();
						
						 
						//feedback_$.background (); 
						 
						
				}
			
				this.afficheQuestion = function(selectedQuestion_$) {
				
					questionSet_$ = selectedQuestion_$;
					var solution_$ = questionSet_$.find(".solution")
					var responseList_$ = $(questionSet_$.find(".reponse"));
					var question_$ = $(questionSet_$.find(".question"));
					var reponse_num = Number(solution_$.text());
					content_$.append (display_$.children ());
					display_$.fadeIn (400); 
					display_$.append(questionSet_$);
					//question_$.hide();
					responseList_$.hide();
					
					//trace ("question : " + question_$.html()); 
					if (question_$.html () == undefined) {
						trace ("question id undfined");
						
						}
					
					function showReponse () {
						responseList_$.each(function(index, element) {
							//trace ("   responseList :" + index)
							var speed_num = 100;
								var button_$ = $(element);
								 
							button_$.hide();
							button_$.css("top", 30).css("opacity", 0).delay(400 + 300 * index).show().animate({
								top : 0,
								opacity : 1
							}, speed_num, context.onStartQuestion);

						})
						
						}
						showReponse (); 
						
						
			
				
					
					responseList_$.bind (getClickEvent(), function(event) {
					//	alert (event.pageX)
						responseList_$.removeClass ('button');
						var button_$ = $(this);
						//responseList_$.unbind(); 
						var selected_num = button_$.index();
					//trace ("selected_num : " + selected_num + " / " + reponse_num);
					
					success_bool = 	context.success_bool =selected_num == reponse_num;
						////alert (success_bool);
						
						
						if (success_bool) {
							button_$.addClass("true");

						} else {
							button_$.removeClass ('button')
							button_$.addClass("false");
						   $(responseList_$[reponse_num-1]).addClass ('missedTrue');

						}
						
						responseList_$.not('.true').not('.false').not('.missedTrue').addClass ('unsellectedFalse'); 
							displayFeedBack (success_bool, event); 
					});
				}
				endOfGame = function() {

					////trace(context.answer_num + "/" + context.questions_num);
					
					var feedBack_num;
					var feedBackList_$ = $(endScreen_$.children('.feedBackEnd'));
					content_$.append (display_$.children ());
					var score_num = content_$.children('[success_bool="true"]').length;
			
					var score_str = score_num + "/"+ context.questions_num;
					display_$.show();
					display_$.append(context.endScreen_$);
					endScreen_$.css ('visibility', 'visible');
					
					endScreen_$.find ('.result').text(score_str); 
					
					feedBackList_$.each(function(index, element) {

						////trace(index + "   " + $(element).attr("max"));
						if (score_num <= Number($(element).attr("max"))) {

							feedBack_num = index;
						}

					})
					
					////trace("feedBack_num : " + feedBack_num);
					feedBackList_$.each(function(index, element) {
						//trace (index +" : "+  $(element).html ())
						if (index == feedBack_num) {
							$(element).show();
						} else {
							$(element).hide();
						}

					});
				
					
					$('#timer').hide (); 
			endScreen_$.show(300);

				}

			selectQuestion = function() {
				//alert ("selectquestion : " + context.answer_num); 
					

					if (context.answer_num == context.questions_num) {
						endOfGame();

					} else {
						

						////trace("selectQuestion");
						var selectionList_$ = context.questions_$.children('[selected_bool="false"]');
						////trace(selectionList_$.length);
						var random_num = Math.floor(Math.random() * selectionList_$.length);
						var selectedQuestion_$ = $(selectionList_$[random_num]);
						selectedQuestion_$.attr("selected_bool", "true");
						context.afficheQuestion(selectedQuestion_$);

					}
				}

			//init();

			}