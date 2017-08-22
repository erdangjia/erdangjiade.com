$(function() {
    $("#signed_edit").click(function() {

        $("#signed_textarea").show().css("border-color", "#e6e8e9").removeAttr("disabled");
        $("#signed_textarea").focus().select();
    })
    $("#signed_textarea").blur(function() {
        var content = $("#signed_textarea").val();
        var len = content.length;
        if (len > 128) {
            $("#signed_error").html("个性签名不能超过128个字符~")
            return false;
        } else {
            $("#signed_error").empty();

            if (len <= 0) {
                content = "这位童鞋很懒，什么也没有留下～～！";
            }
            $.post(getUrl("Ajax/signature"), {content: content}, function(data) {
                $("#signed_textarea").val(content.replace(/</g, "&lt;").replace(/>/g, "&gt;")).css("border-color", "transparent").attr("disabled", "disabled");
                $(".textarea_signature").val(content.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
            })
        }
    })
})
function getUrl(strs) {//获取参数
    var url = $("#footer").attr("data-url") + strs;
    return url;
}
function goUrl(url) {
    if (url == -1) {
        history.go(-1);
    } else {
        document.location.href = url;
    }
}


function checkInputBlur(obj) {
    var default_words = obj.attr("data-default");
    if (obj.val() == "") {
        obj.val(default_words);
        obj.css({"color": "#a9a9a9"})
    }
}
function checkInputFocus(obj) {
    var default_words = obj.attr("data-default");
    if (obj.val() == default_words) {
        obj.val("").css({"color": "#333333"})
    }
}
function blurInputLoginBox(obj) {
    var v = obj.val();
    if (v == "") {
        obj.removeClass("form_input-focus");
        obj.prev("div").removeClass("item_tip_focus")
    } else {
        obj.addClass("form_input-focus");
        obj.prev("div").addClass("item_tip_focus")
    }
}
function checkBefore(btn) {

    var val_default = $(btn).attr("data-default");
    if (val_default == '') {
        var val = $(btn).val();
        $(btn).attr("data-default", val);
    }
    $(btn).addClass("disabled").val('loading');

}
function checkAfter(btn) {

    var val_default = $(btn).attr("data-default");
    $(btn).removeClass("disabled").val(val_default);
}
function hideMsgBox() {
    $("#msg-box").fadeOut();
}
function showSuccessTip(data) {
    $("#msg-box").show();
    $("#msg-box-content").html(data);
    setTimeout("hideMsgBox()", 2000);
}
function getCollect(obj, id, mtype) {
    $.get(getUrl("Ajax/getCollect"), {mtype: mtype, id: id}, function(data) {
        location.reload();
    })
}
function signDay(obj) {
    $.post(getUrl("Ajax/signDay"), {}, function(data) {
        var num = obj.find("span").text();
        var td = "<td  style='background-color:navajowhite;navajowhite ;'>\n\
<div align='right' valign='top'><span style='position:relative;right:20px;'>" + num + "</span></div>\n\
<div align='left'><img width='35px' height='35px' src='" + getUrl('Public') + "/images/other/cart_3.gif' alt='已签到' style='position:relative;left:10px;'>\n\
  已签到</div></td>";
        obj.before(td);
        obj.remove();
        if(data>0){
            showSuccessTip("签到成功获取 "+data+" 积分");
        }else{
            alert("今天您已签到！");
        }
        
    })
}