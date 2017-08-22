// 注册

$(function() {

    // 是否勾选版权
    if (!$('#eulaCheck').is(':checked')) {
        $('#regInputSubmit').removeClass('submit-button');
        $('#regInputSubmit').addClass('mini-button-disabble');
    } else {
        $('#regInputSubmit').removeClass('mini-button-disabble');
        $('#regInputSubmit').addClass('submit-button');
    }
    // 勾选版权可以点击注册
    $('#eulaCheck').click(function() {

        if (!$('#eulaCheck').is(':checked')) {
            $('#regInputSubmit').removeClass('submit-button');
            $('#regInputSubmit').addClass('mini-button-disabble');
        } else {
            $('#regInputSubmit').removeClass('mini-button-disabble');
            $('#regInputSubmit').addClass('submit-button');
        }

    });


    $("#loginSubmit").click(function() {
        location.href = '/';
    });


    //文本框文字提示
    $('#regInputForm input').focus(function() {
        $(this).parent().addClass('input-on');
        $(this).parent().find('label').addClass('hide');
        $(this).addClass('colorInput');
    }).blur(function() {
        $(this).parent().removeClass('input-on');
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('hide');
        }
    });


});

