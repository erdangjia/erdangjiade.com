function do_js_beautify() {
    document.getElementById('beautify').disabled = true;
    js_source = document.getElementById('content').value.replace(/^\s+/, '');
    tabsize = document.getElementById('tabsize').value;
    tabchar = ' ';
    if (tabsize == 1) {
        tabchar = '\t';
    }
    if (js_source && js_source.charAt(0) === '<') {
        document.getElementById('content').value = style_html(js_source, tabsize, tabchar, 80);
    } else {
        document.getElementById('content').value = js_beautify(js_source, tabsize, tabchar);
    }
    document.getElementById('beautify').disabled = false;
    return false;
}
function pack_js(base64) {
    var input = document.getElementById('content').value;
    var packer = new Packer;
    if (base64) {
        var output = packer.pack(input, 1, 0);
    } else {
        var output = packer.pack(input, 0, 0);
    }
    document.getElementById('content').value = output;
}
function Empty() {
    document.getElementById('content').value = '';
    document.getElementById('content').select();
}
function GetFocus() {
    document.getElementById('content').focus();
}
function CSSencode(code) {
    code = code.replace(/\r\n/ig, '');
    code = code.replace(/(\s){2,}/ig, '$1');
    code = code.replace(/\t/ig, '');
    code = code.replace(/\n\}/ig, '\}');
    code = code.replace(/\n\{\s*/ig, '\{');
    code = code.replace(/(\S)\s*\}/ig, '$1\}');
    code = code.replace(/(\S)\s*\{/ig, '$1\{');
    code = code.replace(/\{\s*(\S)/ig, '\{$1');
    return code;
}
function CSSdecode(code) {
    code = code.replace(/(\s){2,}/ig, '$1');
    code = code.replace(/(\S)\s*\{/ig, '$1 {');
    code = code.replace(/\*\/(.[^\}\{]*)}/ig, '\*\/\n$1}');
    code = code.replace(/\/\*/ig, '\n\/\*');
    code = code.replace(/;\s*(\S)/ig, ';\n\t$1');
    code = code.replace(/\}\s*(\S)/ig, '\}\n$1');
    code = code.replace(/\n\s*\}/ig, '\n\}');
    code = code.replace(/\{\s*(\S)/ig, '\{\n\t$1');
    code = code.replace(/(\S)\s*\*\//ig, '$1\*\/');
    code = code.replace(/\*\/\s*([^\}\{]\S)/ig, '\*\/\n\t$1');
    code = code.replace(/(\S)\}/ig, '$1\n\}');
    code = code.replace(/(\n){2,}/ig, '\n');
    code = code.replace(/:/ig, ':');
    code = code.replace(/  /ig, ' ');
    return code;
}
function rechange() {
    document.getElementById('re').value = document.getElementById('oresult').value.replace(/document.writeln\("/g, "").replace(/"\);/g, "").replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\")
}
function change() {
    document.getElementById('oresult2').value = "document.writeln(\"" + document.getElementById('osource').value.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\");\ndocument.writeln(\"") + "\");"
}
function ConvUtf(obj, btn) {
    document.getElementById("result").value = obj.value.replace(/[^\u0000-\u00FF]/g, function($0) {
        return escape($0).replace(/(%u)(\w { 4 })/gi, "&#x$2; ")
    });
}
function ResChinese(obj, btn) {
    document.getElementById("contents").value = unescape(obj.value.replace(/&#x/g, '%u').replace(/; /g, ''));
}
