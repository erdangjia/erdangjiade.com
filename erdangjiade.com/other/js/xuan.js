function getUrl(strs) {//获取参数
    var url = $("#SITE_URL").val() + "/" + strs;
    return url;
}
function goUrl(url) {
    if (url == -1) {
        history.go(-1);
    } else {
        document.location.href = url;
    }
}
function addNames() {
    var tr = "<tr><td class='td_left'></td>\n\
<td><input name='name[]' type='text' class='common_txt'  value=''/>\n\
<a onclick=$(this).parent().parent().remove()>删除</a></td></tr>";
    $('#tr_name').before(tr);
}
function targetDelTable(id,is_delete) {
    $("#modal_del").modal('toggle');
    $("#modal_del").attr('data-id', id);
    var table = $("#modal_del_table").attr("data-table");
    $("#modal_del").attr('data-table', table);
    $("#modal_del").attr('data-delete', is_delete);
    if(is_delete == 1){
        $("#modal_del").find(".modal-body").html("确定要恢复吗?")
    }else{
        $("#modal_del").find(".modal-body").html("确定要删除吗？")
    }
}
function targetStateTable(id,state) {
    $("#modal_state").modal('toggle');
    $("#modal_state").attr('data-id', id);
    var table = $("#modal_del_table").attr("data-table");
    $("#modal_del").attr('data-table', table);
    $("input[name=state_box][value="+state+"]").attr("checked",true);
}
function in_array(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}
function clearEmptyArr(arr) {
    var length = arr.length;
    var newArr = [];
    for (var i = 0; i < length; i++) {
        if (arr[i] != '') {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function uniQueue(array) {
    var arr = [];
    var m;
    while (array.length > 0) {
        m = array[0];
        arr.push(m);
        array = $.grep(array, function(n, i) {
            return n == m;
        }, true);
    }
    return arr;
}
function choseRadio(area_id, field, title) {
    showModal('#myModal');
    $('#myModal').data('modal', field);
    $('#myModal').attr('data-area', area_id);
    $('#modal-title').text(title);
    $.post(getUrl("Box/choseRadio"), {
        field: field
    }, function(data) {
        $("#choseRadio").html(data);
    })
}
function changeOrd(obj, table, id) {
    var val = obj.text();
    var c = obj.parent("td");
    obj.parent("td").html("<input type='text' style='width:50px;' onFocus=this.select()  onblur=changeOrdConfirm($(this),'" + table + "'," + id + ") value='" + val + "' />");
    c.children("input").focus();
}
function changeOrdConfirm(obj, table, id) {
    $.post(getUrl("Ajax/changeOrdConfirm"), {
        id: id,
        table: table,
        ord: obj.val()
    }, function(data) {
        obj.parent("td").html("<a onclick=changeOrd($(this),'" + table + "'," + id + ")>" + obj.val() + "</a>");
    })
}

function delPic(id, table, field) {
    if (confirm("确定要删除吗")) {
        $.post(getUrl("Ajax/delPic"), {
            table: table,
            id: id,
            field: field
        }, function(data) {
            $('#td_img').remove();
        })
    }
}
function yes(id, table, field) {
    $.post(getUrl("Ajax/yes"), {
        id: id,
        table: table,
        field: field
    }, function(data) {
        if (data == "是") {
            $('#' + field + '_' + id).html("<a onclick=yes(" + id + ",'" + table + "','" + field + "')>" + data + "</a>");
        } else {
            $('#' + field + '_' + id).html("<a onclick=yes(" + id + ",'" + table + "','" + field + "')><span style='color:red'>" + data + "</span></a>");
        }
    })
}
function getColumnHighcharts(id, categories, data, type) {
    if (type == 1) {
        type = "line";
    } else {
        type = "column";
    }
    $(id).highcharts({
        chart: {
            type: type
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: ''                  //指定y轴的标题
            }
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 0,
            y: -10,
            floating: false,
            borderWidth: 0
        },
        series: data
    });
}
function getPieHighcharts(id, data) {
    $(id).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
//                dataLabels: { 显示类别
//                    enabled: false
//                },
                showInLegend: true
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 0,
            y: -10,
            floating: false,
            borderWidth: 0
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        series: data
    });
}
function goOrderUrl(mtype) {
    var year = $("#year").val();
    var month = $("#month").val();
    var day = $("#day").val();
    var type = $("#type").val();
    if (year == 0) {
        month = day = 0;
    }
    var shop_id = $("#shop_id").val();
    $.post(getUrl("Ajax/goOrderUrl"), {
        year: year,
        month: month,
        day: day,
        type: type,
        mtype: mtype,
        shop_id: shop_id
    }, function(data) {
        goUrl(data);
    })
}
function statics_set(control, mod) {
    var names = '';
    var vals = '';
    $("#modal_set").find("select").each(function() {
        var name = $(this).attr("data-name");
        var val = $(this).val();
        names += name + ",";
        vals += val + ",";
    })
    $.post(getUrl("Ajax/statics_set"), {
        control: control,
        mod: mod,
        names: names,
        vals: vals
    }, function(data) {
        goUrl(data);
    })
}
function yearChange() {
    var year = $("#set_year").val();
    var month = $("#set_month").val();
    var day = $("#set_day").val();
    $.post(getUrl("Ajax/yearChange"), {
        year: year,
        month: month,
        day: day
    }, function(data) {
        $("#set_month").html(data);
        $("#set_day").html('<option value="0">请选择日</option>');
    })
}
function monthChange() {
    var year = $("#set_year").val();
    var month = $("#set_month").val();
    var day = $("#set_day").val();
    $.post(getUrl("Ajax/monthChange"), {
        year: year,
        month: month,
        day: day
    }, function(data) {
        $("#set_day").html(data);
    })
}
function more_del(obj) {
    var modal = obj.parents(".modal");
    var id = modal.attr("data-id");
    var table = modal.attr("data-table");
    var is_delete = modal.attr("data-delete");
    if (id == 0) {
        var ids = '';
        $("input[name='ids']").each(function() {
            if ($(this).prop("checked") == true) {
                ids += $(this).val() + ",";
            }
        });
        if (ids == '') {
            alert("请选择！");
            return false;
        }
    } else {
        ids = id + ","
    }
    $.post(obj.attr("data-url"), {
        ids: ids,
        table: table,
        is_delete:is_delete
    }, function(data) {
//        location.reload();
    })
}
function checkState(obj) {
    var modal = obj.parents(".modal");
    var id = modal.attr("data-id");
    var table = $("#modal_del").attr("data-table");
    var state = $("input[name=state_box]:checked").val();
    $.post(obj.attr("data-url"), {
        id: id,
        table: table,
        reason:$("#reason").val(),
        state:state
    }, function(data) {
       location.reload();
    })
}
function checkTags(obj) {
    if (obj.prop("checked") == true) {
        if ($('#modal_tags').attr('data-tags').indexOf(',' + obj.val() + ',') == '-1') {
            $('#modal_tags').attr('data-tags',',' + $('#modal_tags').attr('data-tags') + obj.val() + ',');
        }
    } else {
        if ($('#modal_tags').attr('data-tags').indexOf(',' + obj.val() + ',') != '-1') {
            $('#modal_tags').attr('data-tags',$('#modal_tags').attr('data-tags').replace(',' + obj.val() + ',', ','));
        }
    }
}
function choseTagsBoxConfirm(){
    var id =$("#modal_tags").attr('data-id');
    var tags =$("#modal_tags").attr('data-tags');
    $.get(getUrl("Box/choseTagsBoxConfirm"), {
        id: id,
        tags:tags
    }, function(data) {
      $("#modal_tags").modal('hide');
       $("#tag_"+id).text(data);
       $("#tag_"+id).attr('data-tags',tags);
    })
}
function sitemapCat(id){
    var sitemap_cat=$("#sitemap_cat").val();
    $.get(getUrl("Ajax/sitemapCat"), {
        id:id,
        sitemap_cat:sitemap_cat
    }, function(data) {
        location.reload()
    })
}
function changeLang(id,lang_id){
    $.post(getUrl("Ajax/changeLang"), {
        id:id,
        lang_id:lang_id
    }, function(data) {
     
    })
}