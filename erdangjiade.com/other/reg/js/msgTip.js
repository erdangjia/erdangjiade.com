/**
 *  成功提示
 */
successTip = function ( msg, setTime ){

	var msg = msg, setTime = setTime;

	if ( !setTime ) {
		setTime = 1;
	}

	var obj = {
		msg : msg,
		setTime : setTime
	}

	globalTip( obj );

};
/**
 *  错误提示
 */
errorTip = function ( msg, setTime ){

	var msg = msg, setTime = setTime;

	if ( !setTime ) {
		setTime = 1;
	}

	var obj = {
		msg : msg,
		setTime : setTime
	}

	globalTip( obj );

};
redirectTip = function( msg, jump, URL, setTime ){


	var msg = msg, setTime = setTime, jump = jump, URL = URL;

	if ( typeof jump != 'boolean' ) {
		jump = false;
	}

	if ( !setTime ) {
		setTime = 1;
	}

	var obj = {
		msg : msg,
		jump    : jump,
		URL     : URL,
		setTime : setTime
	}

	globalTip( obj );

}

globalTip = function ( obj ){

	var scrollTopHeigth, scrollWindow;
	scrollTopHeigth = $(document).scrollTop();
	scrollWindow = $(window);
	var setTime = obj.setTime;
	var URL = obj.URL;
	var jump = obj.jump;
	var msg = obj.msg;

	var tipHtml;
	tipHtml  = '<div id="" class="globalInfoTip">';
	tipHtml += '<div class="infoTipBack"></div>';
	tipHtml += '<p id="wait">'+msg+'</p>';
	tipHtml += '</div>';

	$( '#ajax-hook .globalInfoTip' ).remove();

	$( '#ajax-hook' ).prepend(tipHtml);

	if ( scrollTopHeigth > 60 ) {

		$('.globalInfoTip').css({ position:'fixed', top:-70 }).animate({ top:0});

	} else {

		$('.globalInfoTip').css({ top:-70, height:0 }).animate({ top:0, height:'60px' });

	}

	scrollWindow.scroll(function(){

		if ( scrollWindow.scrollTop() > 60 ) {

			$('.globalInfoTip').css({ position:'fixed', });

		} else if ( scrollWindow.scrollTop() < 60 ) {

			$('.globalInfoTip').css({ position: 'relative',

			});
		}

	});

	var interval = setInterval(function(){

			clearInterval(interval);

			$('.globalInfoTip').css({ top:0, height:'60px' }).animate({ top:-70, height:0 }, function(){

				//$( '#ajax-hook .globalInfoTip' ).remove();

				if ( jump ){

					if ( URL ) {

						window.location.href = URL;

					} else {

						window.location.href = document.referrer ? document.referrer : './';

					}
				}

			});

	}, 1500);

}


