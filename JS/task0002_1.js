function hobby() {
    var arr = [];
    var pattern = /^(?:\w*\u002c?)+$/
    var btn = $(".stpe1 .ife-btn");
    var txt = $(".step1 .ife-input");
    addEvent(btn, "click", listener);
    addEvent(txt, "keypress", function(e) {
        event = e || window.event;
        var target = event.target || event.srcElement;
        if (!pattern.test(target.value)) {
            if(event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    });
    function listener() {
        text = txt.value;
        output();
    }
    function output() {
        var tem_arr = txt.value.split(/\u002c/);
        for(var i = 0, len = tem_arr.length; i < len; i ++) {
            arr.push(tem_arr[i]);
        }
        var uniqarr = uniqArray(arr);
        var result = uniqarr.toString();
        var paragraph = document.createElement("p");
        var textnode = document.createTextNode(result);
        paragraph.appendChild(textnode);
        insertAfter(paragraph, btn);
    }
}

function hobby1() {
    var arr = [];
    var pattern = /^(?:\w*[\u000a\u002c\uff0c\u0020\u3000\u3001\u003b]?)+$/
    var btn = $(".step2 .ife-btn");
    var txt = $(".step2 .ife-input");
    addEvent(btn, "click", listener);
    addEvent(txt, "keypress", function(e) {
        event = e || window.event;
        var target = event.target || event.srcElement;
        if (!pattern.test(target.value)) {
            if(event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    });
    function listener() {
        text = txt.value;
        output();
    }
    function output() {
        var tem_arr = txt.value.split(/[\u000a\u002c\uff0c\u0020\u3000\u3001\u003b]/);
        for(var i = 0, len= tem_arr.length; i < len; i ++) {
            arr.push(tem_arr[i]);
        }
        var uniqarr = uniqArray(arr);
        var result = uniqarr.toString();
        var paragraph = document.createElement("p");
        var textnode = document.createTextNode(result);
        paragraph.appendChild(textnode);
        insertAfter(paragraph, btn);
    }
}


function hobby2() {
    var arr = [];
    var pattern = /^(?:\w*[\u000a\u002c\uff0c\u0020\u3000\u3001\u003b]?)+$/
    var btn = $(".step3 .ife-btn");
    var txt = $(".step3 .ife-input");
    var div = $(".ife-err");
    err("Please input at least one hobby.");
    addEvent(btn, "click", listener);
    addEvent(txt, "keypress", function(e) { //keyup在文本框发生变化之后触发,但是该乘改成keyup之后无法取消按键默认行为。
        event = e || window.event;
        var target = event.target || event.srcElement;
        if(typeof event.charCode == "number") {
            var code = event.charCode;
        } else {
            code = event.keyCode;
        }

        if(/[\u000a\u002c\uff0c\u0020\u3000\u3001\u003b]/.test(String.fromCharCode(code))){
            var tem_arr = txt.value.split(/[\u000a\u002c\uff0c\u0020\u3000\u3001\u003b]/);
            for(var i = 0, len = tem_arr.length; i < len; i ++) {
                arr.push(tem_arr[i]);
            }
        }
        var uniqarr = uniqArray(arr);
        if (!pattern.test(target.value)) {
            if(event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        } else if (!target.value) {
            err("Please input at least one hobby."); //按字符键之后target.value不包括按下的那个键！！！！！因为keypress和keydown都是在文本框发生变化之前触发的。改成keyup
        } else if (uniqarr.length == 10) {
            err("The number of hobbies must less that 10");
            if(event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        } else {
            err();
        }
    });
    function listener() {
        text = txt.value;
        console.log(text);
        output();
    }
    function output() {
        var tem_arr = txt.value.split(/[\u000a\u002c\uff0c\u0020\u3000\u3001\u003b]/);
        for(var i = 0, len = tem_arr.length; i < len; i ++) {
            arr.push(tem_arr[i]);
        }
        var uniqarr = uniqArray(arr);
        while (btn.nextSibling && btn.nextSibling.nodeType === 1) {
            $(".step3").removeChild(btn.nextSibling);
        }
        for(var i =0, len = uniqarr.length; i < len; i ++) {
            var label = document.createElement("label");
            label.setAttribute("for", "checkbox" + i);
            var input = document.createElement("input");
            input.type = "checkbox";
            input.name = "hobby";
            input.id = "checkbox" + i;
            var hob = document.createTextNode(uniqarr[i]);
            label.appendChild(hob);
            insertAfter(label, btn);
            insertAfter(input, label);
        }

    }
    function err(message) {
        if (message) {
            div.innerHTML = message;
        } else {
            div.innerHTML = "";
        }
    }
//     function err(message) {
//         var hint = document.createElement("p");
//         var hintxt = document.createTextNode(message);
//         hint.appendChild(hintxt);
//         if (div.childNodes.length == 0) {
//             div.appendChild(hint);
//         }
//         else {
//             div.replaceChild(hint,div.lastChild);
//         }
//     }
}


hobby();
hobby1();
hobby2();
