//
//globalTip = function ( obj ){
//
// 	var scrollTopHeigth, scrollWindow;
//	scrollTopHeigth = $(document).scrollTop();
//	scrollWindow    = $(window);
//	setTime     = obj.setTime;
//	var URL     = obj.URL;
//	var jump    = obj.jump;
//	var message = obj.msg;
//
//	var tipHtml;
//	tipHtml  = '<div id="" class="globalInfoTip">';
//	tipHtml += '<div class="infoTipBack"></div>';
//	tipHtml += '<p id="wait">'+message+'</p>';
//	tipHtml += '</div>';
//
//	$( '#ajax-hook .globalInfoTip' ).remove();
//
//	$( '#ajax-hook' ).prepend(tipHtml);
//
//	if ( scrollTopHeigth > 60 ) {
//
//		$('.globalInfoTip').css({ position:'fixed', top:-70 }).animate({ top:0});
//
//	} else {
//
//		$('.globalInfoTip').css({ top:-70, height:0 }).animate({ top:0, height:'60px' });
//
//	}
//
//	scrollWindow.scroll(function(){
//
//		if ( scrollWindow.scrollTop() > 60 ) {
//
//			$('.globalInfoTip').css({ position:'fixed', });
//
//		} else if ( scrollWindow.scrollTop() < 60 ) {
//
//			$('.globalInfoTip').css({ position: 'relative',
//
//			});
//		}
//
//	});
//
//	var interval = setInterval(function(){
//		// --setTime;
//		// if(setTime == 0) {
//			clearInterval(interval);
//			$('.globalInfoTip').css({ top:0, height:'60px' }).animate({ top:-70, height:0 }, function(){
//
//				$( '#append_parent .globalInfoTip' ).remove();
//
//				if ( jump ){
//
//					if ( URL ) {
//
//						window.location.href = URL;
//
//					}
//				}
//
//			});
//
//		// };
//
//	}, 1500);
//
//}
//
