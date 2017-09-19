// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}
//判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
function isPlain(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";

}
var arr1 = [1,2];
console.log(isArray(arr1));
var fn = function(){};
console.log(isArray(fn));
console.log(isFunction(fn));
var obj1 = {};
var t1 = Object.prototype.toString.call(obj1);
console.log(t1);

var obj = new Object("Some text");
console.log(obj instanceof String);

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject (source) {
    var result = source, i, j;//var result = source; var i; var j;声明了i和j,但是没有赋值
    if (!source //如果source是空字符串，0，null， NaN， undefined，则返回true；如果source是对象，非空字符串,非零数值（包括Infinity）
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (isArray(source)) {
        result = [];
        for (i in source) { // i 返回数组下标的字符串：“0”， “1”等等
            result[i] = arguments.callee(source[i]); //是否可以换成arguments.callee
        }
    } else if (isPlain(source)) {
        result = {};
        for (j in source) { //j 返回对象属性名的字符串
            if (source.hasOwnProperty(j)) { //判断属性是否在实例中存在
                result[j] = arguments.callee(source[j]);
            }
        }
    }
    return result;
}

// function cloneObject (source) {
//     var result = source, i, len;
//     if (!source
//         || source instanceof Number
//         || source instanceof String
//         || source instanceof Boolean) {
//         return result;
//     } else if (isArray(source)) {
//         result = [];
//         var resultLen = 0;
//         for (i = 0, len = source.length; i < len; i++) {
//             result[resultLen++] = cloneObject(source[i]);
//         }
//     } else if (isPlain(source)) {
//         result = {};
//         for (i in source) {
//             if (source.hasOwnProperty(i)) {
//                 result[i] = cloneObject(source[i]);
//             }
//         }
//     }
//     return result;
// }

var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);
console.log(tarObj.b.b1[0]);
console.log(tarObj.b.b2);

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray0(arr) {
    var newarr = [],i,j;
    var k = 0;
    for(i in arr) { //用for in 为遍历数组扩展的属性，比如在原型Array上定义的属性
        var j = newarr.every(function(item,index,array){
            return (item !== arr[i]);
        })
        if(j) {
            newarr[k++] = arr[i];
        }
    }
    return newarr;
}




function uniqArray(source) {
    var len = source.length,
        result = source.slice(0),
        i, datum;


    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (datum === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
}

// hash
function uniqArray1(arr) {
    var obj1 = {};
    var obj2 = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var key = arr[i];
        if (!obj1[key] && typeof(key) === "string") { //判断key属性是否已经存在且key为字符串，因为 1 和 ‘1’标识相同的属性名。
            result.push(key);
            obj1[key] = true;
        }
        else if (!obj2[key]) {
            result.push(key);
            obj2[key] = true;
        }
    }
    return result;
}


// hash + es5
function uniqArray2(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
            obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

var al = 10000;
var a = [];
while (al--){
    a.push(al%2);
}

console.time('uniqArray0')
console.log(uniqArray0(a).length);
console.timeEnd('uniqArray0')

console.time('uniqArray')
console.log(uniqArray(a).length);
console.timeEnd('uniqArray')

console.time('uniqArray1')
console.log(uniqArray1(a).length);
console.timeEnd('uniqArray1')

console.time('uniqArray2')
console.log(uniqArray2(a).length);
console.timeEnd('uniqArray2')


var b = [1, '1', '2', 2];
console.log(typeof(b[1]));
console.log(uniqArray0(b));
console.log(uniqArray(b));
console.log(uniqArray1(b));
console.log(uniqArray2(b));

//实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var patten = /\s/;
    var str_len = str.length;
    for( var i = 0; i < str_len; i ++) {
        if(!patten.test(str.charAt(i))) {
            break;
        }
    }
    for(var j = str_len; j > 0; j --){
        if(!patten.test(str.charAt(j-1))) {
            break;
        }
    }
    if(i >= j) {
        return "";
    }
        return str.substring(i,j);
}

var str1 = simpleTrim(' \t trimed   ');
console.log(str1);


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    var i, j=arr.length;
    for(i = 0; i < j; i++) {
        fn(arr[i], i);
    }
}
var arr1 = ['java', 'c', 'php', 'html'];
function output1(item) {
    console.log(item)
}
each(arr1, output1);  // java, c, php, html

var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html


// 获取一个对象里面第一层元素的数量，返回一个整数
// function getObjectLength(obj) {
//     var firstlevel =  [], i,j = 0;
//     for (i in obj) {  //枚举实例与原型链中所有的可枚举属性
//         if(obj.hasOwnProperty(i))
//
//     }
//     console.log(firstlevel);
//
//     return j;
// }

// 使用示例
function Obj() {
    this.a = 1;
    this.b = 2;
    this.c = {c1: 3, c2: 4} ;
    if(typeof this.d != "number") {
        Obj.prototype.d = 5;
    }
}

var getObjectLength = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
            toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [  //不考虑自己修改属性的enumerable特性
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {    //   函数声明只能创建局部函数,这里用函数表达式可以创建全局函数；
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('getObjectLength called on non-object');
        }

        var result = [],
            prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result.length;
    };
})(); //?为什么去了最后的括号，会导致return 后面的函数被当成字符串返回呢。

var obj1 = new Obj();
console.log(obj1);
console.log(getObjectLength(obj1));


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var elementclasses = element.className.split(/\s+/);
    var j = 1;
    for(var i in elementclasses) {
        if(elementclasses[i] === newClassName) {
            j = 0;
            break;
        }
    }
    if(j) {
        elementclasses.push(newClassName);
        element.className = elementclasses.join(" ");
    }
}
var p = document.getElementById("par");
console.log(p.className);
addClass(p,"second");
console.log(p.className);
addClass(p,"third");
console.log(p.className);

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var elementclasses = element.className.split(/\s+/);
    var pos = -1;//splice(-1,1)不删除任何项
    for (var i in elementclasses) {
        if(elementclasses[i] === oldClassName) {
            pos = i;
            break;
        }
    }
    elementclasses.splice(pos,1);//splice会给改变原始数组，返回的使删除的项！
    element.className = elementclasses.join(" ");
}
removeClass(p,"third");
console.log(p.className);
removeClass(p,"second");

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current != null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return {actualLeft:actualLeft, actualTop:actualTop}
}
p = document.getElementById("par");
console.log(getPosition(p));

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var pattern = /^([\w\.\+\-])+@([\w\-]+\.)+\w{2,10}$/;
    return pattern.test(emailStr);
}
 console.log(isEmail('lj.meng@s.baidu.com'));

 // 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^1\d{10}$/;
    return pattern.test(phone);
}




function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
      }
    else {
        window.onload = function(){
            oldonload();
            func();
        }
      }
    }

//获得一个元素下所有的节点（不仅仅是子节点）
function getNodes0(node) {
    var node_arr=[];
    var i_arr = [];

    function f(node) {
        console.log(node);
        var count = node.childNodes.length;
        for (var i = 0; i < count; i ++) {
            if(node.childNodes[i].nodeType == 1) {
                node_arr.push(node.childNodes[i]);
                if(node.childNodes[i].hasChildNodes()){
                    //  i_arr.push(i);
                    f(node.childNodes[i]);
                }
            }
        }
        //  i = i_arr.pop();
    }
    f(node);
    return node_arr;
}
function getNodes(node) {
    var arr = node.getElementsByTagName("*");
    return arr;
}
var b = document.getElementsByTagName("html")
console.log(getNodes0(b[0]));
console.log(getNodes(b[0]));
// 实现一个简单的Query
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


console.log($("[data-log=456] #321"));


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


function listener1() {
    console.log("clicked");
}
// var element1 = document.getElementById("addbtn2");
// addClickEvent(element1,listener1);
// var element2 = document.getElementById("123");
// addEnterEvent(element2, listener1)
$.click("#addbtn2", listener1)
