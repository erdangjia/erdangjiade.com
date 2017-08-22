$(function() {
    isLogin();
    var site_url = $("#footer").attr("data-url");
    if ($("img.lazy").length > 0) {
        $("img.lazy").lazyload({
            effect: "fadeIn"
        })
    }
    if ($(".emotion").length > 0) {
        $(".emotion").click(function() {
            var left = $(this).offset().left;
            var top = $(this).offset().top;
            var id = $(this).attr("data-id");
            $("#smileBoxOuter").css({
                "left": left,
                "top": top + 20
            }).show().attr("data-id", id)
        });
        $("#smileBoxOuter,.emotion").hover(function() {
            $("#smileBoxOuter").attr("is-hover", 1)
        },
                function() {
                    $("#smileBoxOuter").attr("is-hover", 0)
                });
        $(".emotion,#smileBoxOuter").blur(function() {
            var is_hover = $("#smileBoxOuter").attr("is-hover");
            if (is_hover != 1) {
                $("#smileBoxOuter").hide()
            }
        });
        $(".smileBox").find("a").click(function() {
            var textarea_id = $("#smileBoxOuter").attr("data-id");
            var textarea_obj = $("#reply_" + textarea_id).find("textarea");
            var textarea_val = textarea_obj.val();
            if (textarea_val == "发布评论") {
                textarea_obj.val("")
            }
            var title = "[" + $(this).attr("title") + "]";
            textarea_obj.val(textarea_obj.val() + title).focus();
            $("#smileBoxOuter").hide()
        });
        $("#smileBoxOuter").find(".smilePage").children("a").click(function() {
            $(this).addClass("current").siblings("a").removeClass("current");
            var index = $(this).index();
            $("#smileBoxOuter").find(".smileBox").eq(index).show().siblings(".smileBox").hide()
        });
        $(".comment_blockquote").hover(function() {
            $(".comment_action_sub").css({
                "visibility": "hidden"
            });
            $(this).find(".comment_action_sub").css({
                "visibility": "visible"
            })
        },
                function() {
                    $(".comment_action_sub").css({
                        "visibility": "hidden"
                    })
                })
    }
    if ($(".index-coupon-menus").length > 0) {
        $(".index-coupon-menus").children("li").click(function() {
            $(this).addClass("current").siblings("li").removeClass("current");
            var index = $(this).index();
            var parent_id = $(this).parents(".index_recommend").attr("id");
            $("#" + parent_id).find(".per").removeClass("current");
            $("#" + parent_id).find(".per").eq(index).addClass("current")
        })
    }
    if ($("#list_main").length > 0) {
        $("#list_main").children(".per").hover(function() {
            $(".like_merge").hide();
            var obj = $(this);
            obj.children(".like_merge").show();
            if ($("#head_username").text() != "") {
                if (obj.attr("is_collect") != 1) {
                    obj.attr("is_collect", 1);
                    $.get(getUrl("Ajax/isCollect"), {
                        mtype: $(this).attr("data-mtype"),
                        id: $(this).attr("data-id")
                    },
                    function(data) {
                        if (data == 1) {
                            obj.find(".like_status").addClass("lm_liked").removeClass("lm_like")
                        } else {
                            obj.find(".like_status").addClass("lm_like").removeClass("lm_liked")
                        }
                    })
                }
            }
        },
                function() {
                    $(".like_merge").hide()
                })
    }
    if ($("#detail-page").length > 0) {
        var id = $("#detail-page").attr("data-id");
        var mtype = $("#detail-page").attr("data-mtype");
        var totalnum = $("#detail-page").attr("data-totalnum");
        $("#detail-page").children("a").click(function() {
            var page = parseInt($(this).attr("data-page"));
            $("#detail-page").children("a").removeClass("current");
            $("#detail-page").children("a").eq(page - 1).addClass("current");
            $("#comment_list").html("<div style='padding:20px 0;text-align:center;'><img src='" + site_url + "Public/images/loading.gif'></div>");
            $.get(getUrl("Box/comments"), {
                page: page,
                id: id,
                totalnum: totalnum,
                mtype: mtype
            },
            function(data) {
                $("#comment_list").html(data)
            })
        })
    }
});
function getUrl(strs) {
    var url = $("#footer").attr("data-url") + strs;
    return url
}
function goUrl(url) {
    if (url == -1) {
        history.go(-1)
    } else {
        document.location.href = url
    }
}
function toTaskObject(obj) {
    $("html,body").animate({
        scrollTop: $(obj).offset().top
    },
    800)
}
function checkInputBlur(obj) {
    var default_words = obj.attr("data-default");
    if (obj.val() == "") {
        obj.val(default_words);
        obj.css({
            "color": "#a9a9a9"
        })
    }
}
function checkInputFocus(obj) {
    var default_words = obj.attr("data-default");
    if (obj.val() == default_words) {
        obj.val("").css({
            "color": "#333333"
        })
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
function focusInputLoginBox(obj) {
    obj.addClass("form_input-focus");
    obj.prev("div").addClass("item_tip_focus")
}

function getLoginError(obj, tip) {
    obj.next(".error").text(tip).show();
}
function getLoginRight(obj) {
    obj.next(".error").hide();
    obj.nextAll(".icon-loginright").css({
        "display": "inline-block"
    });
}
function checkEmailPattern(email) {
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(email)) {
        return false;
    }
}

function sublogin() {
    var email = $("#email").val();
    if (email == "") {
        showTipLoginBox("请输入用户名/邮箱！");
        return false
    } else {
        var pwd = $("#pwd").val();
        if (pwd == "") {
            showTipLoginBox("请输入密码！");
            return false
        }
    }
    $.post(getUrl("Ajax/checkLogin"), {
        username: email,
        pwd: pwd
    },
    function(data) {
        if (data.error != '') {
            showTipLoginBox(data.error)
        } else {
            loginSuccess(data)
        }
    },
            "json")
}
function showTipLoginBox(words) {
    $("#windown_box").find(".notice_error").text(words).show();
    setTimeout("hideNoticeLoginBox()", 3000)
}
function hideNoticeLoginBox() {
    $("#windown_box").find(".notice_error").fadeOut(1000)
}
function showWindowBox() {
    $("#windown_box").modal("toggle")
}
function hideWindowBox() {
    $("#windown_box").modal("hide")
}
function animateShowTip(obj, tip) {
    obj.text(tip);
    var top = obj.attr("data-top");
    obj.animate({
        top: top,
        "height": "16px"
    },
    500)
}
function animateHideTip(obj) {
    var foot = obj.attr("data-foot");
    obj.animate({
        top: foot,
        "height": "0"
    },
    500)
}
function subcomment(id, mtype, pid, pid_sub) {
    var pid_common = pid;
    if (pid_sub > 0) {
        pid_common = pid_sub
    }
    var textarea_obj = $("#reply_" + pid_common).find("textarea");
    var comment = textarea_obj.val();
    comment = comment == "发布评论" ? "" : comment;
    if (comment == "") {
        animateShowTip($("#comment_tip_" + pid_common), "您是不是忘了说点什么？");
        setTimeout("animateHideTip($('#comment_tip_" + pid_common + "'))", 3000);
        return false
    }
//    comment = encodeURIComponent(comment);

    $.post(getUrl("Ajax/subcomment"), {
        id: id,
        mtype: mtype,
        content: comment,
        pid: pid,
        pid_sub: pid_sub
    },
    function(data) {
        var li = "";
        if (data.code == -1) {
            showWindowBox();
            $("#windown_box").attr("data-func", "subcomment('" + id + "', '" + mtype + "', '" + pid + "', '" + pid_sub + "')")
        } else {
            if (data.code == 200) {
                var username = $(".comment_avatar").find(".username").text();
                if (pid_common == 0) {
                    var num = parseInt($("#comments_num").text());
                    $("#comments_num").text(num + 1);
                    var avatar = $(".comment_avatar").find(".avatar").attr("src");
                    var lou_tip = "";
                    if (num == 0) {
                        lou_tip = "沙发"
                    } else {
                        if (num == 1) {
                            lou_tip = "椅子"
                        } else {
                            if (num == 2) {
                                lou_tip = "板凳"
                            } else {
                                lou_tip = num + "楼"
                            }
                        }
                    }
                    li = "<li class='comment_list clearfix'><div class='comment_avatar'><span class='userPic'>\n<img width='36' height='36' src='" + avatar + "'></span><span class='grey'>" + lou_tip + "</span></div>\n<div class='comment_conBox'><div class='comment_avatar_time'><div class='time'>刚刚</div>" + username + "</div>\n<div class='comment_conWrap clearfix'><div class='comment_con'>" + data.comment + "</div></div></div></li>";
                    $(".comment_listBox").prepend(li)
                } else {
                    var length_reply = parseInt($("#comment_" + pid_common).find(".comment_blockquote").length);
                    li = "<blockquote class='comment_blockquote'><div class='comment_floor'>" + (length_reply + 1) + "</div><div class='comment_conWrap'>\n<div class='comment_con'>" + username + "：<p> " + data.comment + "</p></div></div></blockquote>";
                    $("#comment_" + pid).find(".blockquote_wrap").append(li);
                    $("#reply_" + pid).hide();
                    if (pid_sub > 0) {
                        $("#reply_" + pid_sub).hide()
                    }
                }
                if (data.points > 0) {
                    showSuccessTip("评论成功，获得" + data.points + "积分！")
                } else {
                    showSuccessTip("评论成功！")
                }
                textarea_obj.val("")
            } else {
                animateShowTip($("#comment_tip_" + pid_common), data.error);
                setTimeout("animateHideTip($('#comment_tip_" + pid_common + "'))", 3000)
            }
        }
    },
            "json")
}
function subSuggest() {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    if (name == "" || name == "称呼") {
        alert("清输入称呼！");
        return false
    }
    if (email == "" || email == "邮箱地址") {
        alert("清输入邮箱地址！");
        return false
    }
    if (message == "" || message == "信息") {
        alert("清输入信息！");
        return false
    }
    $.get(getUrl("Ajax/subSuggest"), {
        name: name,
        email: email,
        message: message
    },
    function(data) {
        if (data == -1) {
            showWindowBox();
            $("#windown_box").attr("data-func", "subSuggest()")
        } else {
            if (data == 1) {
                $("#suggest").remove();
                $(".thanks").removeClass("hide")
            }
        }
    })
}
function isLogin() {
     var username = "sucaihuo";
    if (username) {
        $(".username").text(username);
        $(".avatar").attr("src", "../images/avatar.jpg");
        $(".haslogin").removeClass("hide");
        $(".nologin").addClass("hide");
        hideWindowBox();
        var func = $("#windown_box").attr("data-func");
        if (func) {
            eval(func)
        }
        $("#nav_login").remove();

    }
    $("#login_area").slideToggle();
}
function getMsgNum() {
    $.get(getUrl("Ajax/getMsgNum"), {
    },
            function(data) {
                if (data > 0) {
                    $("#msg_notify").html("<em>" + data + "</em>");
                } else {
                    $("#msg_notify").html("");
                }
            })
}
function reply_btn(id) {
    $(".reply_area").hide();
    $("#reply_" + id).slideToggle(500,
            function() {
                $("#reply_" + id).find("textarea").focus()
            })
}
function getCollect(obj, id, mtype) {
    $.get(getUrl("Ajax/getCollect"), {
        mtype: mtype,
        id: id
    },
    function(data) {
        if (data > 0) {
            obj.children(".like_status").addClass("lm_liked").removeClass("lm_like")
        } else {
            obj.children(".like_status").addClass("lm_like").removeClass("lm_liked")
        }
        obj.parents(".per").attr("is_collect", 1)
    })
}
function hideMsgBox() {
    $("#msg-box").fadeOut()
}
function showSuccessTip(data) {
    $("#msg-box").show();
    $("#msg-box-content").html(data);
    setTimeout("hideMsgBox()", 2000)
}
function downloadZip(id, mtype) {
    $.get(getUrl("Download/zip"), {
        mtype: mtype,
        id: id,
        first: 1
    },
    function(data) {
        if (data == -1) {
            showWindowBox();
            $("#windown_box").attr("data-func", "downloadZip(" + id + ",'" + mtype + "')")
        } else {
            if (data == -2) {
                alert("亲，积分不够，多去评论、签到、或找客服充值吧！")
            } else {
                location.href = "" + getUrl("Download/zip") + "/id/" + id + "/mtype/" + mtype + "/js/1.html"
            }
        }
    })
}

function focusInputLoginArea(obj) {
    obj.next(".error").hide();
    obj.addClass("form_input-focus");
    obj.prev("div").addClass("item_tip_focus");
    obj.nextAll(".grey").show();
    obj.nextAll(".icon-loginright").hide();
}

function blurInputLoginArea(obj, is_sub) {
    var val = obj.val();
    var minlength = obj.attr("data-minlength");
    var maxlength = obj.attr("data-maxlength");
    var type = obj.attr("data-type");
    var equal = obj.attr("data-equal");
    var time_error = 0;
    if (val == "") {
        obj.removeClass("form_input-focus");
        obj.prev("div").removeClass("item_tip_focus");
        getLoginError(obj, "不能为空");

    } else {
        if (minlength > 0 && val.length < minlength) {
            getLoginError(obj, "长度至少" + minlength + "位");
            time_error++;
        }
        if (maxlength > 0 && val.length > maxlength) {
            getLoginError(obj, "长度最多" + maxlength + "位");
            time_error++;
        }
        if (type == 'email' && checkEmailPattern(val) == false) {
            getLoginError(obj, "邮箱格式不正确");
            time_error++;
        }
        if (equal != undefined && val != $(equal).val()) {
            getLoginError(obj, obj.attr("data-equal-error"));
            time_error++;
        }
        if (time_error == 0 && is_sub != 1) {
            if (type == 'username') {
                $.post(getUrl('Ajax/checkUsername'), {
                    username: val
                },
                function(data) {
                    if (data == -1) {
                        getLoginError(obj, '该用户名已被注册');
                    } else {
                        getLoginRight(obj);
                    }
                })
            } else if (type == 'email') {
                $.post(getUrl('Ajax/checkEmail'), {
                    email: val
                },
                function(data) {
                    if (data == -1) {
                        getLoginError(obj, '该电子邮箱已被注册');
                    } else {
                        getLoginRight(obj);
                    }
                })
            } else {
                getLoginRight(obj);
            }
        }
        obj.addClass("form_input-focus");
        obj.prev("div").addClass("item_tip_focus");
    }
    obj.nextAll(".grey").hide();
}
function addClickFunc(obj) {
    $(obj).click();
}
function searchSub() {

    var keywords = $('#search_input').val();
    if (keywords == '请输入搜索内容' || keywords == '') {
        $('#search_input').focus();
        return false;
    }
    $("input[name=keyword]").val(encodeURIComponent(keywords));
    $("#form_search").submit();
//    $.post(getUrl("Ajax/searchSub"), {
//        keywords: keywords
//    },
//    function(data) {
//        if(data>0){
//            $("#form_search").submit();
//        }
//    })
}
