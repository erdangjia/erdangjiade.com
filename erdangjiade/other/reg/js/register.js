/**
 * @Copyright Copyright 2014, LangLee
 * @Descript: 注册
 * @Author	: cn.LangLee@hotmail.com
 * @Depend	: jquery-1.10.2.js(1.10.2 or later)
 * $Id: if.Com.Reg.js  2013-11-12 05:28:06Z LangLee $
 */
$(function() {

    var _regData = {};
    var emailError = null;
    var userError = null;
    var passError = null;
    var username_10 = '<span id="username_err10" class="user-input-er-span iconfont"><b>用户名不能为空</b><i></i></span>';
    var username_20 = '<span id="username_err20" class="user-input-er-span iconfont"><b>用户名应由3-20个字符组成</b><i></i></span>';
    var username_30 = '<span id="username_errtext" class="user-input-er-span iconfont"><b>用户名已存在</b><i></i></span>';
    var username_40 = '<span id="username_errtext" class="user-input-er-span iconfont"><b>包含敏感词';
    var str40 = '</b><i></i></span>';
    var username_50 = '<span id="username_errtext" class="user-input-er-span iconfont"><b>包含特殊字符</b><i></i></span>';
    var username_60 = '<span id="username_errtext" class="user-input-er-span iconfont"><b>用户名不能为邮箱</b><i></i></span>';

    var password_70 = '<span id="password_errtext" class="user-input-er-span iconfont"><b>未填写密码</b><i></i></span>';
    var password_80 = '<span id="password_errtext" class="user-input-er-span iconfont"><b>密码应由6-20个字符组成</b><i></i></span>';
    var password_90 = '<span id="password_errtext" class="user-input-er-span iconfont"><b>两次输入不符</b><i></i></span>';
    var password_11 = '<span id="email_errtext" class="user-input-er-span iconfont"><b>密码中不能包含全角字符</b><i></i></span>'

    var email_12 = '<span id="email_errtext" class="user-input-er-span iconfont"><b>未填写邮箱</b><i></i></span>';
    var email_13 = '<span id="email_errtext" class="user-input-er-span iconfont"><b>邮箱格式无效</b><i></i></span>';
    var email_14 = '<span id="email_errtext" class="user-input-er-span iconfont"><b>邮箱已被注册</b><i></i></span>';

    var okText = '<span id="oktext" class="user-input-ri-span"><i class="iconfont"></i></span>';

    // 存储默认数据
    var valDefault = [];
    $('input.user-input').each(function(i, ele) {
        valDefault[i] = ele.value;
    });
    // 邮箱验证规则
    var reg_email = /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9\-]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var reg_feif = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/;


    $(document).delegate('.login-label span', 'click', function() {
        var inpdel = $(this).prev().val();
        $(this).next().addClass('hide');
        $(this).prev().empty().focus().val(inpdel);
        $(this).remove();


    });

    $('#username').focus(function() {

        $(this).nextAll("span").remove();
        $(this).parent().removeClass('input-ri');
        $(this).parent().removeClass('input-er');

    }).blur(function() {

        if ($(this).val() == '') {
            $(this).parent().addClass('input-er');
            $(this).next("span").remove();
            $("#username").after(username_10);
            userError = 10;
            return false;
        }

        //用户名长度
        var nameLen = $.trim($(this).val().length);
        if (nameLen < 3 || nameLen > 20) {
            $(this).parent().addClass('input-er');
            $(this).after(username_20);
            userError = 20;
            return false;
        }

        //不能为邮箱
        if (reg_email.test($(this).val())) {
            $(this).parent().addClass('input-er');
            $(this).after(username_60);
            userError = 60;
            return false;
        }

        //用户名不能有非法字符
//        if (!reg_feif.test($(this).val())) {
//            $(this).parent().addClass('input-er');
//            $("#username_err10").remove();
//            $("#username").after(username_50);
//            userError = 50;
//            return false;
//        } else {
            var name = ($('#username').val() == valDefault[0]) ? '' : $('#username').val();
            var url = $("#ajax-hook").attr("data-url");
            $.get(url + "Ajax/checkName", {
                name: name
            }, function(data) {
                if (data == -1) {
                    $('#username').parent().addClass('input-er');
                    $('#username').after(username_30);
                } else {
                    $('#username').parent().addClass('input-ri');
                    $('#username').after(okText);
                }
            })
//        }
    });

    var check = /[\u4e00-\u9fa5]/;
    var ckpass = /\s/;
    // 密码
    $('#password').focus(function() {
        $(this).nextAll("span").remove();
        $(this).parent().removeClass('input-ri');
        $(this).parent().removeClass('input-er');
    }).blur(function() {

        if (ckpass.test($(this).val())) {
            $(this).parent().addClass('input-er');
            $(this).after(password_80);
            passError = 80;
            return false;
        }

        if (check.test($.trim($(this).val()))) {
            $(this).parent().addClass('input-er');
            $(this).after(password_70);
            passError = 70;
            return false;
        }

        var pwd = $.trim($(this).val());
        var pwd2 = $.trim($('#password2').val());

        if (pwd.length < 6 || pwd.length > 20) {
            $(this).parent().addClass('input-er');
            $(this).after(password_80);
            passError = 80;
            return false;
        }
        if (pwd2 != pwd && pwd2.length > 0) {
            $(this).parent().addClass('input-er');
            $(this).after(password_90);
            passError = 90;
            return false;
        } else {
            $(this).parent().addClass('input-ri');
            $(this).after(okText);
            passError = 0;
        }
    });

    // 确认密码
    $('#password2').focus(function() {
        $(this).nextAll("span").remove();
        $(this).parent().removeClass('input-ri');
        $(this).parent().removeClass('input-er');
    }).blur(function() {
        var pwd2 = $.trim($(this).val());
        var pwd = $.trim($('#password').val());

        if (ckpass.test($(this).val())) {
            $(this).parent().addClass('input-er');
            $(this).after(password_80);
            passError = 80;
            return false;
        }

        if (pwd.length <= 0 || pwd2.length <= 0) {
            $(this).parent().addClass('input-er');
            $(this).after(password_80);
            passError == 80;
            return false;
        }

        if (pwd2.length < 6 || pwd2.length > 20) {
            $(this).parent().addClass('input-er');
            $(this).after(password_80);
            passError = 80;
            return false;
        }

        if (check.test($.trim($(this).val()))) {
            $(this).parent().addClass('input-er');
            $(this).after(password_70);
            passError = 70;
            return false;
        }

        if (pwd2 != pwd) {
            $(this).parent().addClass('input-er');
            $(this).after(password_90);
            passError = 90;
            return false;
        } else {
            $(this).parent().addClass('input-ri');
            $('#password').nextAll('span').remove();
            $('#password').parent().removeClass('input-er');
            $('#password').parent().addClass('input-ri');
            $('#password').after(okText);
            $(this).after(okText);
            passError = 0;
        }

    });

    // 邮箱
    $('#email').focus(function() {
        $(this).nextAll("span").remove();
        $(this).parent().removeClass('input-ri');
        $(this).parent().removeClass('input-er');
    }).blur(function() {
        if (valDefault[3] == $(this).val()) {
            $(this).parent().addClass('input-er');
            $(this).after(email_12);
            emailError = 12;
            return false;
        }
        if (!reg_email.test($.trim($('#email').val()))) {
            $(this).parent().addClass('input-er');
            $(this).after(email_13);
            emailError = 13;
            return false;
        }
        var email = $(this).val();
        var url = $("#ajax-hook").attr("data-url");
        $.get(url + "Ajax/checkEmail", {
            email: email
        }, function(data) {
            if (data == -1) {
                $('#email').parent().addClass('input-er');
                $('#email').after(email_14);
            } else {
                $('#email').parent().addClass('input-ri');
                $('#email').after(okText);
            }
        })
    });

    // 注册
    $("#regInputSubmit").click(function() {
        var username = $.trim($("#username").val());
        var username_length = username.length;
        var password = $.trim($("#password").val());
        var password2 = $.trim($("#password2").val());
        var password_length = password.length;
        var email = $.trim($('#email').val());
        if (!$('#eulaCheck').is(':checked')) {
            errorTip('请接受 《用户使用协议》！', 2);
            return false;
        }
        var newVal = [];

        $('input.user-input').each(function(i, ele) {
            newVal[i] = ele.value;
        });

//        if (newVal[0] == valDefault[0] || newVal[1] == valDefault[1] || newVal[2] == valDefault[2] || newVal[3] == valDefault[3]) {
//            errorTip('请先完善注册信息！', 2);
//            return false;
//        }
        // 用户名
        if (username == 10) {
            errorTip('用户名不能为空！', 2);
            return false;
        }
        if (username_length > 20 || username_length < 3) {
            errorTip('需3-20个字符！', 2);
            return false;
        }

        if (userError == 30) {
            errorTip('用户名已存在！', 2);
            return false;
        }

        if (userError == 40) {
            errorTip('包含敏感词！', 2);
            return false;
        }
        if (userError == 50) {
            errorTip('包含特殊字符！', 2);
            return false;
        }




        // 密码
        if (password == '') {
            errorTip('未填写密码！', 2);
            return false;
        }

        if (password_length < 6 || password_length > 20) {
            errorTip('密码应由6-20个字符组成！', 2);
            return false;
        }

        if (passError == 90) {
            errorTip('两次输入不符！', 2);
            return false;
        }


        if (password != password2) {
            errorTip('两次输入密码不一致', 2);
            return false;
        }
        // 邮箱
        if (email == '') {
            errorTip('未填写邮箱！', 2);
            return false;
        }
        if (!reg_email.test(email)) {
            errorTip('邮箱格式无效！', 2);
            return false;
        }
        if (emailError == 14) {
            errorTip('邮箱已被注册！', 2);
            return false;
        }
        var name = ($('#username').val() == valDefault[0]) ? '' : $('#username').val();
        var pwd = ($('#password').val() == valDefault[1]) ? '' : $('#password').val();
        var email = ($('#email').val() == valDefault[3]) ? '' : $('#email').val();


        var site_url = $("#ajax-hook").attr("data-url");
        var obj = $(this);
        obj.addClass('disabled').val('注册中...');
        var is_bind = obj.attr("data-bind");
        $.post(site_url + "Ajax/regsave", {name: name, pwd: pwd, email: email,is_bind:is_bind}, function(data) {
            if (data == 1) {
                redirectTip('恭喜你，注册成功!', true, site_url, 0);
            } else {
                errorTip(data, 3);
                $("#regInputSubmit").removeClass('mini-button-disabble');
            }
            obj.removeClass('disabled').val('注册');
        }, "json")
    });
});
