/**
 * @Copyright Copyright 2014, LangLee
 * @Descript: 函数库
 * @Author	: cn.LangLee@hotmail.com
 * @Depend	: jquery-1.10.2.js(1.10.2 or later)
 * $Id: if.Com.Func.js  2013-11-12 05:28:06Z LangLee $
 */

getUrlLocal = function ( strUrl ){
	var strUrl = strUrl;
	var strResult = strUrl.indexOf('ui.cn');
	if ( strResult == -1 ){
		return './';
	} else {
		return strUrl;
	}

//	alert ( strResult );
}


/**
 * @Descript: 登录窗口浮动层定位方法函数
 * @Author	: LangLee
 */
floatPostion = function(){
    
	//获取改变之后的宽度
	var changeWidth=$(window).width();
	var changeHeight=$(window).height();
	// 获取DIV宽度
	var smallW = $('#log-box').width();
	var smallH = $('#log-box').height();
	//计算宽度修改比例
	var divChangeWidth	=	(changeWidth - smallW) / 2;
	var divChangeHeight	=	(changeHeight - smallH) / 2;
	$('#log-box').css('top', divChangeHeight);
	$('#log-box').css('left', divChangeWidth);
};

/**
 * @Descript: 登录窗口浮动层定位方法函数
 * @Author	: LangLee
 */
userMefloatPostion = function(){
	//获取改变之后的宽度
	var changeWidth=$(window).width();
	var changeHeight=$(window).height();
	// 获取DIV宽度
	var smallW = $('.com-back-box').width();
	var smallH = $('.com-back-box').height();
	//计算宽度修改比例
	var divChangeWidth	=	(changeWidth - smallW) / 2;
	var divChangeHeight	=	(changeHeight - smallH) / 2;
	$('.com-back-box').css('top', divChangeHeight);
	$('.com-back-box').css('left', divChangeWidth);
};
/**
 * @Descript: 私信窗口浮动层定位方法函数
 * @Author	: LangLee
 */
userfloatPostion = function(){
	//获取改变之后的宽度
	var changeWidth=$(window).width();
	var changeHeight=$(window).height();
	// 获取DIV宽度
	var smallW = $('#com-backs-box').width();
	var smallH = $('#com-backs-box').height();
	//计算宽度修改比例
	var divChangeWidth	=	(changeWidth - smallW) / 2;
	var divChangeHeight	=	(changeHeight - smallH) / 2;
	$('#com-backs-box').css('top', divChangeHeight);
	$('#com-backs-box').css('left', divChangeWidth);
};
/**
 * @Descript: 举报窗口浮动层定位方法函数
 * @Author	: LangLee
 */
examinefloatPostion = function(){
	//获取改变之后的宽度
	var changeWidth=$(window).width();
	var changeHeight=$(window).height();
	// 获取DIV宽度
	var smallW = $('#com-examine-box').width();
	var smallH = $('#com-examine-box').height();
	//计算宽度修改比例
	var divChangeWidth	=	(changeWidth - smallW) / 2;
	var divChangeHeight	=	(changeHeight - smallH) / 2;
	$('#com-examine-box').css('top', divChangeHeight);
	$('#com-examine-box').css('left', divChangeWidth);
};

/**
 * @Descript: 获取焦点失去焦点
 * @Author	: LangLee
 */
inputFocusBlurValue = function(i, inputId){
	
	var defVal, isPwd, defType, defId, $this;
	defVal = inputId.value;
//	defType = inputId.type;
	defId = inputId.id;
	$this = $('#'+defId);

	// 文本框获取焦点
	$this.focus(function(){
		$this.addClass('input-on');
//		$this.removeClass('input-co');
		if( $this.val() == defVal ){
			$this.val('');
		}
		if ( defId == 'loginbox-password' ){
			$('#passText').html('');
		}
	});
	
	$this.blur(function(){
//		$this.addClass('user-input-co');
		$this.removeClass('input-on');
		if( $this.val() == '' ){
			$this.val( defVal );
		}
		if ( defId == 'loginbox-password' ){
			if( $this.val() == defVal ){
				$('#passText').html('请输入登录密码');
			}
		}

	});
};



var checkSubmit = function(inputEl, err){
	if( !err ){
		inputEl.addClass('user-input-ri');
		new Element('span', {
			'id'	: inputEl.attr('id')+'_oktext',
			'class' : 'user-input-ri-span'
		}).inject(inputEl, 'after');
	}
};
// 注册页面底部浮动
var regBottomFloat = function(){

	var windowH = $( window ).height();

	if ( windowH > 810 ) {

		$( '.reg-footer, .reg-water-3, .reg-water-2, .reg-water-1' ).css({
			position    :   'fixed'
		});

	} else {

		$( '.reg-footer, .reg-water-3, .reg-water-2, .reg-water-1' ).css({
			position    :   'absolute'
		});

	}
}


$(function(){
		
	// 退出登录
	$('#top-logout').click(function(){

		var regData = {
			act	:	'logout',
			_b		: IF.CLIENT.build,
			_s		: IF.ME.sid
		};

		$.ajax({
			type:	'post',
			url:	'_login.php',
			data:	regData,
			success: function(emsg){
				var res = $.parseJSON(emsg);
				if ( res[1].ucCode ){
					var jsonurl = res[1].ucCode;
					$('.logfoo').after(jsonurl);
					IF.ME = {
						id		:	0,
						name	:	'',
						avatarid:	0
					};
				};

				$.cookie('UI_s', null, { path: '/' , domain: '.ui.cn' });
				$.cookie('IF_s', null, { path: '/' , domain: '.ui.cn' });
				redirectTip( '亲! 好舍不得你走喔, 记得一定要常来看看我喔~ ' , true, './', 3);
//				IF.consoleLog('注销成功！');
			}
		});
			
		return false;
		
	});
	
	
	
});

urlGet = function(){

	var aQuery = window.location.href.split("?");  //取得Get参数
	var aGET = new Array();
	if(aQuery.length > 1)
	{
		var aBuf = aQuery[1].split("&");
		for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
		{
			var aTmp = aBuf[i].split("=");  //分离key与Value
			aGET[aTmp[0]] = aTmp[1];
		}
	}
	return aGET;

}

/**
 * 成功跳转
 * @param res
 * @returns {boolean}
 * @constructor
 */
CheckResult = function(res){
	if ( res[0].toInt() ) {
		IF.consoleLog('[iconfans.conctl.js] Request error ('+res[0]+'): '+res[1].eMsg);
		return false;
	}
};
/**
 *  成功提示
 */
successTip = function ( message, setTime ){

	var message = message, setTime = setTime;

	if ( !setTime ) {
		setTime = 1;
	}

	var obj = {
		message : message,
		setTime : setTime
	}

	globalTip( obj );

};
/**
 *  错误提示
 */
errorTip = function ( message, setTime ){

	var message = message, setTime = setTime;

	if ( !setTime ) {
		setTime = 1;
	}

	var obj = {
		msg : message,
		setTime : setTime
	}

	globalTip( obj );

};
redirectTip = function( message, jump, URL, setTime ){


	var message = message, setTime = setTime, jump = jump, URL = URL;

	if ( typeof jump != 'boolean' ) {
		jump = false;
	}

	if ( !setTime ) {
		setTime = 1;
	}

	var obj = {
		msg : message,
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
	var message = obj.msg;

	var tipHtml;
	tipHtml  = '<div id="" class="globalInfoTip">';
	tipHtml += '<div class="infoTipBack"></div>';
	tipHtml += '<p id="wait">'+message+'</p>';
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
		--setTime;
		if(setTime == 0) {

			clearInterval(interval);

			$('.globalInfoTip').css({ top:0, height:'60px' }).animate({ top:-70, height:0 }, function(){

				$( '#ajax-hook .globalInfoTip' ).remove();

				if ( jump ){

					if ( URL ) {

						window.location.href = URL;

					} else {

						window.location.href = document.referrer ? document.referrer : './';

					}
				}

			});

		};

	}, 1000);

	$('.globalInfoTip' ).click(function(){

		clearInterval(interval);

		$('.globalInfoTip').css({ top:0, height:'60px' }).animate({ top:-70, height:0 }, function(){

			$( '#ajax-hook .globalInfoTip' ).remove();

			if ( jump ){

				if ( URL ) {

					window.location.href = URL;

				} else {

					window.location.href = document.referrer ? document.referrer : './';

				}
			}
		});

	});

}


