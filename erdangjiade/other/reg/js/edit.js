//用户框失去、得到焦点事件处理

var newpass_10 = '<span id="password_qsr" class="user-input-er-span"><b>请输入您的新密码</b><i class="iconfont"></i></span>';
var renewpass_10 = '<span id="password_qqe" class="user-input-er-span"><b>请输入确认密码</b><i class="iconfont"></i></span>';
var renewpass_20 = '<span id="password_errtext" class="user-input-er-span"><b>需至少6位</b><i class="iconfont"></i></span>';
var renewpass_30 = '<span id="password_byz" class="user-input-er-span"><b>两次输入不符</b><i class="iconfont"></i></span>';
var code_10 = '<span id="password_code" class="user-input-er-span"><b>请输入验证码</b><i class="iconfont"></i></span>';

var newpassdef = $('#newpass').val();
var repassdef = $('#repass').val();
$('#newpass').blur(function() {
    if ($.trim($(this).val()).length <= 0 || $.trim($(this).val()) == newpassdef) {
        $(this).val(newpassdef);
        //globalTip({'msg':'请输入您的新密码'});
        $("#newpass").after(newpass_10);
        $(this).attr('type', 'text');
        $(this).parent().removeClass('login-on');  //给#username的父元素添加class
    } else if ($(this).val().length < 6) {
        $("#password_errtext").remove();
        $("#newpass").after(renewpass_20);
        return false;
    }
    $("#password_errtext").remove();

}).focus(function() {
    $(this).parent().addClass('login-on');
    if ($(this).val() == newpassdef)
        $(this).val('');
    $(this).attr('type', 'password');
    $("#password_errtext").remove();
    $("#password_qsr").remove();
});

$('#repass').blur(function() {
    if ($.trim($(this).val()).length <= 0 || $.trim($(this).val()) == repassdef) {
        $(this).attr('type', 'text');
        $(this).val(repassdef);
        $("#password_qqe").remove();
        $("#repass").after(renewpass_10);
        //globalTip({'msg':'请输入确认密码'});
        $(this).parent().removeClass('login-on'); //给#username的父元素添加class 

    } else if ($.trim($("#newpass").val()) != $.trim($(this).val())) {
        //globalTip({'msg':'密码不一致'});
        $("#password_qqe").remove();
        $("#repass").after(renewpass_30);
    } else {

        $("#password_qqe").remove();
        $("#password_byz").remove();

    }



}).focus(function() {
    $(this).attr('type', 'password');
    $(this).parent().addClass('login-on');
    if ($(this).val() == repassdef)
        $(this).val('');
    $("#password_qqe").remove();
    $("#password_byz").remove();
});

$('#code').blur(function() {
    if ($.trim($(this).val()).length <= 0)
        //globalTip({'msg':'请输入验证码'});
        if ($("#code").val() == '' || $("#code").val() == '请输入验证码') {
            $("#password_code").remove();
            $("#code").after(code_10);
            $(this).val('请输入验证码');
            $(this).parent().removeClass('login-on');  //给#username的父元素添加class          

        } else {
            $(this).parent().addClass('login-on');  //给#username的父元素添加class          

        }
}).focus(function() {
    $("#password_code").remove();
    $(this).parent().addClass('login-on');
    if ($(this).val() == '请输入验证码')
        $(this).val('');

});


$('#re-button').click(function() {

    check = /^[\u4e00-\u9fa5]+$/;
    var pwd = $("#newpass").val();
    var repwd = $("#repass").val();
    //是否为空
    if (pwd == '' || pwd == '请输入您的新密码') {
        globalTip({'msg': '请输入您的新密码'});
        return false;
    }

    if (check.test(pwd)) {
        globalTip({'msg': '密码中不能包含全角字符'});
        $('#newpass').focus();
        return false;
    }

    if (repwd == '' || repwd == '确认密码') {
        globalTip({'msg': '请输入确认密码'});
        return false;
    }

    if (check.test(repwd)) {
        globalTip({'msg': '密码中不能包含全角字符'});
        $('#repass').focus();
        return false;
    }
    if (pwd != repwd) {
        globalTip({'msg': '两次输入的密码不一致'});
        $('#repass').focus();
        return false;
    }

    var url = $("#ajax-hook").attr("data-url");
    
    $.post(url + "Pwd/set_post", {
        email: $("#ajax-hook").attr("data-email"),
        pwd: pwd,
        rand: $("#ajax-hook").attr("data-rand"),//随机数
        code: $("#code").val(),
    }, function(data) {
        if(data == 'code'){
            errorTip('验证码错误', 3)
        }else if(data == '-1'){
            errorTip('密码设置失败', 3)
        }else{
           redirectTip('密码设置成功!', true, url + "login", 0);
        }
    })
});






