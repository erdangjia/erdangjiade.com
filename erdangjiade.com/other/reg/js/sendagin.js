$("#sendagin").click(function(){

	$.ajax({
		type:'post',
		post:'',
		url:'/sendagin',
		dataType:'json',
		success:function(msg){

			alert(msg.msg);

		}
	});

});