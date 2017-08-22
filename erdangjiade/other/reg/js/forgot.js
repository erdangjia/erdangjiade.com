//用户框失去、得到焦点事件处理
var email_10 = '<span id="password_errtext" class="user-input-er-span iconfont"><b>邮箱错误请重新输入！</b><i></i></span>';
var password_10 = '<span id="password_errtext" class="user-input-er-span iconfont"><b>请输入注册邮箱</b><i></i></span>';
var code_10 = '<span id="password_code" class="user-input-er-span iconfont"><b>请输入验证码</b><i></i></span>';




var emaildef = $('#forgot-email').val();
var userdef = $('#forgot-user').val();
var codedelf = $('#forgot-code').val();
var userErro = null;
$('#forgot-email').blur(function() {
    if ($.trim($(this).val()).length <= 0 || $(this).val() == emaildef) {
        $(this).parent().removeClass('login-on');  //给#username的父元素添加class     
    }
}).focus(function() {
    $(this).parent().addClass('login-on');
    if ($(this).val() == emaildef)
        $(this).val('');
    $(this).next("span").remove();
});

$('#forgot-code').blur(function() {
    if ($.trim($(this).val()).length <= 0 || $('#forgot-code').val() == codedelf) {
        $(this).parent().removeClass('login-on');  //给#username的父元素添加class
        $("#password_code").remove();
        return false;

    }

}).focus(function() {
    $(this).parent().addClass('login-on');
    if ($(this).val() == codedelf)
        $(this).val('');
    $("#password_code").remove();
});


$('#forgot-button').click(function() {

    if ($.trim($('#forgot-email').val()).length <= 0 || $('#forgot-email').val() == emaildef) {
        errorTip('请填写注册邮箱', 3); //当密码不为空并且不是“请输入密码”时，弹出提示信息“密码不能为空”
        $('#forgot-email').focus();
        return false;  //如果判断为真，停止执行下面的代码，
    }
    var reg_email = /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9\-]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
 
    if (reg_email.test($('#forgot-email').val()) == false) {
        errorTip('邮箱格式无效', 3);
        $('#forgot-email').focus();
        return false;
    }
    if ($.trim($('#forgot-code').val()).length <= 0 || $('#forgot-code').val() == codedelf) {
        errorTip('请填写验证吗', 3) //当密码不为空并且不是“请输入密码”时，弹出提示信息“密码不能为空”
        $('#forgot-code').focus();
        return false;  //如果判断为真，停止执行下面的代码，
    }
    var url = $("#ajax-hook").attr("data-url");
    $.post(url + "Pwd/findPwd", {
        email: $('#forgot-email').val(),
        code: $('#forgot-code').val()
    }, function(data) {
        if(data == 'code'){
            errorTip('验证码错误', 3)
        }else if(data == 'email_no'){
            errorTip('该邮箱不存在', 3)
        }else if(data == '1'){
            errorTip('邮箱发送成功，请查收邮箱并验证!', 3);
            $("#forgot-email,#forgot-code").val('');
           //redirectTip('邮箱发送成功，请查收邮箱并验证!', true, url + "sendtip", 0);
        }
    })
});







