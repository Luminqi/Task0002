function inDate() {
    var sec, min, hour, day;
    var intervalId = null; //要作为全局变量
    var txt = $("[type=text]");
    var pattern = /^\d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}-\d{1,2}$|^\d{4}-\d{2}-$|^\d{4}-\d{1,2}$|^\d{4}-$|^\d{1,4}$/;
    addEvent(txt, "keypress", function(e) {
        event = e ? e : window.event;
        target = event.target || event.srcElement;
        code = typeof event.charCode == "number" ? event.charCode : event.keyCode;
        // console.log(target.value + String.fromCharCode(code));
        if (!pattern.test(target.value + String.fromCharCode(code))) {
            if(event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    });
    addEvent($("[type=button]"), "click", listener);
    function listener() {
        if(/^\d{4}-\d{2}-\d{2}$/.test(txt.value)) {
            var curdate = Date.now();  //取得当前日期毫秒数
            var dates = new Date(txt.value + " 00:00:00");
            var setdate = dates.getTime(); //取得设置日期毫秒数
            var differ = setdate - curdate;
            var est_time = Math.round(differ / 1000);
            clearInterval(intervalId);
            calculate(est_time);
            dispaly(dates);
            function output() {
                est_time --;
                if (est_time == 0) {
                    clearInterval(intervalId);
                }
                calculate(est_time);
                dispaly(dates);
            }
            intervalId = setInterval(output, 1000);
        } else {
            $("div").innerHTML = "输入日期格式错误"
        }
    }
    function calculate(time) {
        sec = time % 60;
        min = ((time - sec) / 60) % 60;
        hour = ((time - sec - min * 60) / 3600) % 24;
        day = Math.floor((time - sec - min * 60 - hour * 3600) / 86400);
    }
    function dispaly(date) {
        var setyear = date.getFullYear();
        var setmonth = date.getMonth();
        var setday = date.getDate();
        $("div").innerHTML = "距离" + setyear + "年" + (setmonth + 1) + "月" + setday + "日还有" + day + "天" + hour + "小时" + min + "分钟" + sec + "秒";
    }
}

inDate();
