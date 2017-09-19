function $(selector) {
    var regid = /^#[\w\.\-]+$/;
    var regclass = /^\.[\w\.\-]+.$/;
    var regname = /^[a-zA-z]+$/;
    var regattr = /^([a-zA-z]+)?\[([\w\.\-]+)(?:=(['"])?(\w+)\3)?\]$/;
    var selectors = [];
    var element = document;
    selectors = selector.split(/\s+/);
    for(var i in selectors){
        if(selectors[i]) {
            if(regid.test(selectors[i])) {
                console.log("1");
                selectors[i] = selectors[i].slice(1);
                byId(selectors[i]);
            }
            else if(regclass.test(selectors[i])) {
                console.log("2");
                selectors[i] = selectors[i].slice(1);
                byClass(selectors[i]);
            }
            else if(regname.test(selectors[i])) {
                console.log("3");
                byName(selectors[i]);
            }
            else if(regattr.exec(selectors[i])) {
                console.log("4");
                match = regattr.exec(selectors[i]);
                byAttr(selector[i]);
            }
        }
    }
    if(element == document){
        element = null;
    }
    return element;

    function byId(id) {
        if(i == 0){
            element = document.getElementById(id);
        }
        else {
            var elements = element.getElementsByTagName("*");
            var count = elements.length;
            for(var j = 0; j < count; j ++) {
               if(elements[j].id ===  id && elements[j].nodeType == 1) {
                   element = elements[j]
                   break;
               }
            }
        }
    }
    function byName(tagname) {
        tagname == tagname.toLowerCase();
        if(i == 0){
            var elements =  document.getElementsByTagName(tagname);
            element = elements[0];
        }
        else {
            var elements = element.getElementsByTagName("*");
            var count = elements.length;
            for(var j = 0; j < count; j ++) {
               if(elements[j].nodeName.toLowerCase() === tagname) {
                   element = elements[j]
                   break;
                }
            }
        }
    }
    function byClass(classname) {
        var elements = element.getElementsByTagName("*");
        var count = elements.length;
        for(var j = 0; j < count; j ++) {
           if(elements[j].className ===  classname && elements[j].nodeType == 1) {
               element = elements[j]
               break;
           }
        }
    }
    function byAttr(attr) {
        if(match[1]) {
            byName(match[1]);
        }
        if(match[4]) {
            console.log("1");
            var elements = element.getElementsByTagName("*");
            var count = elements.length;
            for(var j = 0; j < count; j ++) {
               if(elements[j].getAttribute(match[2]) === match[4] && elements[j].nodeType == 1) {
                   element = elements[j]
                   break;
               }
            }
        }
        else {
            var elements = element.getElementsByTagName("*");
            var count = elements.length;
            for(var j = 0; j < count; j ++) {
                if(elements[j].nodeType == 1) {
                    if(elements[j].getAttribute(match[2])) {
                        element = elements[j]
                        break;
                    }
                }
            }
        }
    }
}

// // 可以通过id获取DOM对象，通过#标示，例如
// $("#adom"); // 返回id为adom的DOM对象
//
// // 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象
//
// // 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象
//
// // 可以通过attribute匹配获取DOM对象，例如
// $("[data-log]"); // 返回第一个包含属性data-log的对象
//
// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
//
// // 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象




// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, type, listener) {
    if(element.addEventListener) {
        element.addEventListener(type, listener, false);
    } else if(element.attachEvent) {
        element.attachEvent("on" + type, listener);
    } else {
        element["on" + type] = listener;
    }
}


// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, type, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(type, listener, false);
    } else if(element.detachEvent) {
        element.detachEvent("on" + type, listener);
    } else {
        element["on" + type] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(e){
        event = e || window.event;
        if(event.keyCode === 13) {
            listener.call(element, event); // 在element上调用listener函数并传入参数event（事件对象）
        }
    });
}

//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法

$.on = function (selector, type, listener) {
    return addEvent($(selector), type, listener);
};

$.un = function (selector, type, listener) {
    return removeEvent($(selector), type, listener);
};

$.click = function (selector, listener) {
    return addClickEvent($(selector), listener);
};

$.enter = function (selector, listener) {
    return addEnterEvent($(selector), listener);
};



function clickListener(event) {
    console.log(event);
}
//针对每一个item去绑定事件
// $.click("#item1", clickListener);

function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}
$.click("#btn", renderList);




//事件代理
// $.click("#list", clickListener);
function delegateEvent(element, tag, eventName, listener) {
    $.on(element, eventName, function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target && target.tagName === tag.toUpperCase()) {  //tagName 属性返回元素的标签名。在 HTML 中，tagName 属性的返回值始终是大写的
            listener.call(target, event);
        }
    });
}
// delegateEvent("#list", "li", "click", clickListener);
$.delegate = delegateEvent;
$.delegate("#list", "li", "click", clickListener);


//Ajax
//创建XHR对象
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], //适用于IE7之前的版本
                i, len;
            for (i = 0, len = versions.length; i < len; i ++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}

function ajax(url, options) {
    var str, param = [];
    var xhr = createXHR();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                if(typeof options.onsuccess === "function") {
                    options.onsuccess(); //是否需要传入参数xhr和xhr.responseText
                }
            }else {
                if(typeof options.onfail === "function") {
                    options.onfail();
                }
            }
        }
    }
    if(typeof options.data === "object") {
        for(var key in options.data) {
            if(options.data.hasOwnProperty(key)){
                param.push(encodeURIComponent(key) + "=" + encodeURIComponent(options.data[key]));
            }
        }
        str = param.join("&");
    } else if(typeof options.data === "string" && typeof options.data.match(/^(?:\w+=\w+&)*\w+=\w+$/)[0] === "string" ) {
        str = options.data;
    }
    url += (url.indexOf("?") >= 0 ? "" : "?") + str;
    if(options.type == "post") {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(str);
    }else {
        xhr.open("get", url, true);
        xhr.send(null);
    }
}

ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);





function ajax1(url, options) {
    var options = options || {};
    var data = stringifyData(options.data || {});
    var type = (options.type || 'GET').toUpperCase();
    var xhr;
    var eventHandlers = {
        onsuccess: options.onsuccess,
        onfail: options.onfail
    };

    try {
        if (type === 'GET' && data) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
            data = null;
        }

        xhr = getXHR();
        xhr.open(type, url, true);
        xhr.onreadystatechange = stateChangeHandler; //为什么放在open之后

        // 在open之后再进行http请求头设定
        if (type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    }
    catch (ex) {
        fire('fail');
    }

    return xhr;//为什么要return xhr

    function stringifyData(data) {
        // 此方法只是简单示意性实现，并未考虑数组等情况。
        var param = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                param.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        return param.join('&');
    }

    function stateChangeHandler() {
        var stat;
        if (xhr.readyState === 4) {
            try {
                stat = xhr.status;
            }
            catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('fail');
                return;
            }

            fire(stat);

            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable

            // IE error sometimes returns 1223 when it
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat === 304
                || stat === 1223) {
                fire('success');
            }
            else {
                fire('fail');
            }

            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             *
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             *
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    xhr.onreadystatechange = new Function();
                    xhr = null;
                },
                0
            );
        }
    }

    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type];

        if (!handler) {
            return;
        }
        if (type !== 'onsuccess') {
            handler(xhr);
        }
        else {
            //处理获取xhr.responseText导致出错的情况,比如请求图片地址.
            try {
                xhr.responseText;
            }
            catch(error) {
                return handler(xhr);
            }
            handler(xhr, xhr.responseText);
        }
    }
}
