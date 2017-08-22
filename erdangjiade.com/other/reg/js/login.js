$(function() {
    //用户框失去、得到焦点事件处理
    var userdel = $('#username').val();
    $('#username').blur(function() {
        if ($.trim($(this).val()).length <= 0) {
            $(this).val(userdel)
            $(this).parent().removeClass('login-on');  //给#username的父元素添加class
        } else {
            $(this).parent().addClass('login-on');  //给#username的父元素添加class
        }
    }).focus(function() {
        $(this).parent().addClass('login-on');
        if ($(this).val() == userdel)
            $(this).val('');
    });

    var la_pass = '<label class="la_password mls">请输入密码</label>';
    var passdel = $('#password').val();
    $('#password').blur(function() {
        if ($.trim($(this).val()).length <= 0) {
            $(".la_password").remove();
            $(this).after(la_pass);
            $(this).parent().removeClass('login-on');
        } else {
            $(this).parent().addClass('login-on');  //给#username的父元素添加class
        }
    }).focus(function() {
        $(this).parent().addClass('login-on');
        $(".la_password").remove();
        if ($(this).val() == passdel)
            $(this).val('');
    });

    //登录验证
    $('#login-button').click(function() {
        if ($.trim($('#username').val()).length <= 0 || $('#username').val() == userdel) {
            globalTip({'msg': '请填写用户名或邮箱'}) //当密码不为空并且不是“请输入密码”时，弹出提示信息“密码不能为空”
            $('#username').focus();
            return false;  //如果判断为真，停止执行下面的代码，
        }

        if ($.trim($('#password').val()).length <= 0 || $('#password').val() == passdel) {
            globalTip({'msg': '请填写密码'}) //当密码不为空并且不是“请输入密码”时，弹出提示信息“密码不能为空”
            $('#password').focus();
            return false;  //如果判断为真，停止执行下面的代码，
        }
        var url = $("#ajax-hook").attr("data-url");
        var obj = $(this);
        obj.addClass('disabled').val('登录中...');
        $.post(url + "Ajax/checkLogin", {
            email: $.trim($('#username').val()),
            pwd: $.trim($('#password').val())

        }, function(data) {
            if (data.error == -1) {
                globalTip({'msg': '用户名或密码错误！'})
            } else {
                window.location.href = url;
            }
            obj.removeClass('disabled').val('登录');
        }, "json")
    });

    $(window).keydown(function(event) {
        switch (event.keyCode) {
            case 13:
                $('#login-button').trigger('click');
                break;
        }
    });
});