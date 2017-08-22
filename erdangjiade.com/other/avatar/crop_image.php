<?php
$img = "dir/temp/" . $_REQUEST['img'];
if ($img == "") {
    echo "图片没找到！";
    exit;
}

$callback = "show_head"; //artdilog callback
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" /> 
        <title>裁剪照片</title>
        <script src="Public/js/other/jquery_highlight.js" type="text/javascript"></script>
        <script src="other/avatar/avatar/jquery.Jcrop_new.js" type="text/javascript"></script>
        <link rel="stylesheet" href="http://www.erdangjiade.com/other/avatar/avatar/jquery.Jcrop.min.css" type="text/css" />
        <script type="text/javascript" src="other/avatar/avatar/artDialog4.1.6/jquery.artDialog.js?skin=default"></script>
        <script type="text/javascript" src="other/avatar/avatar/artDialog4.1.6/plugins/iframeTools.js"></script>
        <style type="text/css">
            .rel{position:relative;}.abs{position:absolute;}.fixed{position:fixed;}
            .zxx_out_box{margin:0 auto;}
            .zxx_main_con{padding:0 20px 20px;}
            .zxx_test_list{font-size:1.1em;overflow:hidden; zoom:1;}
            .jcrop-holder { float:left;}
            /*控制预览图大小*/
           
.crop_preview {
    border: 1px solid #ccc;
    height: 66px;
    overflow: hidden;
    padding: 2px;
    width: 66px;
    position: absolute;right:6px;top:6px
}
.crop_preview img{
    
}
            .clear{clear:both}
            .btn{cursor:pointer}
            .tl{text-align:left}
            .tc{text-align:center}
            .ml10 {margin-left:10px;}
            .mt10 {margin-top:10px;}

            .btn {
                background-color: #ff8400;
                border: 0 none;
                border-radius: 3px;
                color: #fff;
                cursor: pointer;
                display: inline-block;
                height: 28px;
                line-height: 28px;
                text-align: center;
                transition: background-color 0.2s linear 0s;
            }

            .btn-green {
                font-size: 14px;
                height: 40px;
                line-height: 40px;
                width: 160px;
            }
            .btn-green {
                background-color: #39b94e;
            }
        </style>
        <script type="text/javascript">
            $(document).ready(function() {
//                xsize = $(".crop_preview").width(),
//                        ysize = $(".crop_preview").height();
                xsize = 180,
                        ysize = 180;
                $("#xuwanting").Jcrop({
                    onChange: showPreview,
                    onSelect: showPreview,
                    aspectRatio: xsize / ysize,
                    setSelect: [0, 0, 180, 180],
                    boxWidth: "auto",
                    boxHeight: "auto"

                });
                //简单的事件处理程序，响应自onChange,onSelect事件，按照上面的Jcrop调用
                function showPreview(coords) {
                    if (parseInt(coords.w) > 0) {
                        //计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
                        var rx = $("#preview_box").width() / coords.w;
                        var ry = $("#preview_box").height() / coords.h;
                        //通过比例值控制图片的样式与显示
                        $("#crop_preview").css({
                            width: Math.round(rx * $("#xuwanting").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积
                            height: Math.round(rx * $("#xuwanting").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积
                            marginLeft: "-" + Math.round(rx * coords.x) + "px",
                            marginTop: "-" + Math.round(ry * coords.y) + "px"
                        });
                        $('#x').val(coords.x);
                        $('#y').val(coords.y);
                        $('#w').val(coords.w);
                        $('#h').val(coords.h);
                    }
                }
                //表单提交
                $("#confirmOk").click(function() {
                    if (parseInt($('#w').val())) {
                        var act = $("#act").val();
                        var pic_name = $("#pic_name").val();
                        var x = $("#x").val();
                        var y = $("#y").val();
                        var w = $("#w").val();
                        var h = $("#h").val();
                        $.post("crop_submit.php", {pic_name: pic_name, x: x, y: y, w: w, h: h}, function(data) {
                            
                            if (data.status == 1) {
                                var _call_back = "<?php echo $callback; ?>";
                                var win = art.dialog.open.origin;
                                if (_call_back && win[_call_back] && typeof (win[_call_back]) == 'function') {
                                    try {
                                        win[_call_back].call(this, data.file);
                                        art.dialog.close();
                                    } catch (e) {
                                        alert('确认异常');
                                    }
                                }

                            } else {
                                alert(data.error);
                            }
                        }, "json");
                    }
                });
            });
        </script>
    </head>
    <body>
        <div class="fn pt20 tc" style="height:76px;margin:10px 0 0">
            <input type="button" class="btn btn-green" id="confirmOk" value="裁剪" style="margin:5px 0 0"/>
            <div id="preview_box" class="crop_preview"><img id="crop_preview" src="<?php echo $img; ?>"/></div>
            
        </div>
        <div class="zxx_out_box">
            <div class="zxx_main_con">
                <div class="zxx_test_list">
                    <div class="rel">
                        <img id="xuwanting" src="<?php echo $img; ?>" style="display: none;"/>
                    </div>
                </div>
            </div>
            <div class="zxx_footer">
                <form>
                    <input type="hidden" id="act" name="act" value="background"/>
                    <input type="hidden" id="pic_name" name="pic_name" value="<?php echo $img; ?>"/>
                    <input type="hidden" id="x" name="x" />
                    <input type="hidden" id="y" name="y" />
                    <input type="hidden" id="w" name="w" />
                    <input type="hidden" id="h" name="h" />			
                </form>
            </div>
        </div>
        <div class="clear"></div>
    </body>
</html>
