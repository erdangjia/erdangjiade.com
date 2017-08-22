$(function() {
    $("#regInputSubmit").click(function() {
        var username = $("input[name=username]").val();
        if (username == '') {
            alert("请输入用户名！");
            return false;
        }
        var password = $("input[name=password]").val();
        if (password == '') {
            alert("请输入密码！");
            return false;
        }
    })
})