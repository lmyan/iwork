const Util = {}

Util.transformHttpBaseRoot = (base)=>{
    let regExpTemp = /\/\/(.*?):/
    let csMatch = base.match(regExpTemp)
    if (csMatch) {
        let host = csMatch[1];
        if (host === "localhost" || host === "127.0.0.1") {
            host = "//" + window.location.host.replace(/:\d+/g, "") + ":"
            base = base.replace(regExpTemp, host);
        }
    }
    return base
}

// let serverIp = '127.0.0.1'
let serverIp = '10.10.10.78'
// let serverIp = '192.1.5.3'
// let serverIp = 'demo.v-dun.com'

//传统的API接口
let base = `http://${serverIp}:8443`
//中间层的API接口
let bffApiPath = `http://${serverIp}:8666`
//AI配置的API接口
let configPath = `http://${serverIp}:8442`

Util.apiPath = Util.transformHttpBaseRoot(base)
Util.configPath = Util.transformHttpBaseRoot(configPath)
Util.bffApiPath = Util.transformHttpBaseRoot(bffApiPath)

//数组方法扩展
Array.prototype.contains = function(val){  
     for (var i = 0; i < this.length; i++)  
    {  
       if (this[i] == val)  
      {  
       return true
      }  
    }  
     return false
}
if (!Array.indexOf) {  
    Array.prototype.indexOf = function (obj) {  
        for (var i = 0; i < this.length; i++) {  
            if (this[i] == obj) {  
                return i;  
            }  
        }  
        return -1;  
    }  
}  

Date.prototype.format= function(fmt){
    var o= { "m+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "i+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt= fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt= fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.copy = function(){
    let date = new Date
    date.setTime(this.getTime())
    return date
}
/**
 * 时间按5分钟向下取整
 */
Util.getTime_round5Min = (date=new Date)=>{
    let target = date.copy()
    target.setMinutes(date.getMinutes()-date.getMinutes()%5)
    return target
}

Util.getTime_round5Min_str = (dateStr, pattern)=>{
    let target = Util.parseDate4Str(dateStr)
	target.setMinutes(target.getMinutes()-target.getMinutes()%5)
	if(pattern){
		try{
			return target.format(pattern)
		}catch(e){
			console.error(e)
		}
	}
    return target
}

/**
 * 按小时计算新的时间
 */
Util.getTime_perHour = (date=(new Date), perHour=0)=>{
    let target = date.copy()
    target.setHours(date.getHours()-perHour)
    return target
}

/**
 * 获取一段时间的数组信息
 */
Util.getTimeArr = (stime, etime)=>{
    etime = etime||Util.getTime_round5Min()
    stime = stime||Util.getTime_perHour(etime, 12)
    let stamp = [], i=stime.getTime(), end = etime.getTime()
    for(;i<=end;i+=300000){
        stamp.push(new Date(i).format('mm-dd hh:ii'))
    }
    return stamp
}
/**
 * 把字符串解析成日期
 * @param {*} str 
 */
Util.parseDate4Str = str => {
    try {
        return new Date(str.replace(/\-/g, '/'))
    } catch (e) {
        console.error(str, e)
    }
    return new Date()
}
/**
 * 格式化数据， 比如100007格式化的结果是100,007
 * @param value 要格式化的数据
 * @param lang 语言，现在只有"zh"，表示中文，比如100000，格式化之后是10万
 * @param deciNum 要保留的小数位
 * @returns
 */
function formatNumber(value, lang, deciNum){
	var str = `${value}`
	if(str.length>0&&str!=="null"){
		if(typeof(lang)!=="undefined"&&lang.match(/^zh$/i)){
			//小数位数
			if(typeof(deciNum)==="undefined"){
				var arr = str.split(".");
				if(arr.length>1){
					deciNum = arr[1].length;
				}
			}						
			//转换成浮点数
			value = parseFloat(value);
			var unitsObj = [[100000000, "亿"],[10000000, "千万"],[10000, "万"]];
			$.each(unitsObj, function(index, item){
				if(value>=item[0]){
					value = (value/item[0]).toFixed(deciNum)+item[1];
				}
			});
			
			if(typeof(value)==="string"){
				value = value.replace(/\.0+\s*([\u2E80-\u9FFF]*)/g, '$1');
			}
		}else{
			var arrTemp = str.split(".");
			var p1 = arrTemp[0].split("").reverse().join("");
			p1 = p1.replace(/(\d{3})/g, "$1,");
			p1 = p1.split("").reverse().join("");
			if(p1.indexOf(",")==0){
				p1 = p1.substring(1);
			}
			value = p1;
			if(arrTemp.length>1){
				value = `${value}.${arrTemp[1]}`
			}
		}
	}
	return value;
}
function isIntegerUnit(unit){
	var integerUnitArr = ["个","次","/分钟","%", "个/分钟", "次/分钟"];
	if(!unit&&$.inArray(unit, integerUnitArr)>=0){
		return true;
	}
	return false;
}
/**
 * 对Bps进行格式化
 * @param Bps
 * @returns {String}
 */
function format_bps(Bps){
	var ret = "0bps"
    let bps = Bps * 8
    if (bps > 0) {
        if (bps >= 1000 * 1000 * 1000) {
            ret = `${(bps / (1000 * 1000 * 1000)).toFixed(2)}Gbps`
        } else {
            if (bps >= 1000 * 1000) {
                ret = `${(bps / (1000 * 1000)).toFixed(2)}Mbps`
            } else {
                if (bps >= 1000) {
                    ret = `${(bps / (1000)).toFixed(2)}Kbps`
                } else {
                    ret = `${bps.toFixed(0)}bps`
                }
            }
        }
    }
    return ret;
}
/**
 * 格式化网络数据
 * @param cnt
 * @returns
 */
function formatFlow(cnt) {
	var ret;
	if (cnt > 1000 * 1000 * 1000 * 60 * 5) {
		ret = (cnt / (1000 * 1000 * 1000 * 60 * 5)).toFixed(2) + "GBps";
	} else if (cnt > 1000 * 1000 * 60 * 5) {
		ret = (cnt / (1000 * 1000 * 60 * 5)).toFixed(2) + "MBps";
	} else if (cnt > 1000 * 60 * 5) {
		ret = (cnt / (1000 * 60 * 5)).toFixed(2) + "KBps";
	} else {
		ret = (cnt / (60 * 5)).toFixed(2) + "Bps";
	}

	return ret;
}
/**
 * 把毫秒数转换成更容易理解的时间范围
 * @param ms
 * @returns {String}
 */
function formatTimeUnit_millisecond(ms){
	var ret = "";
	if (null!=ms && ms >= 0) {
		var hasTrans = false;
		if (ms >= 60 * 60 * 1000) {
			ret += `${parseInt((ms / (60 * 60 * 1000)))}时`
			hasTrans = true;
		}
		ms = ms % (60 * 60 * 1000);
		if (ms >= 60 * 1000) {
			ret += `${parseInt((ms / (60 * 1000)))}分`
			hasTrans = true;
		}
		ms = ms % (60 * 1000);
		if (ms >= 1000) {
			ret += `${parseInt(ms/1000)}秒`
			hasTrans = true;
		}
		ms = Math.round(ms % 1000);
		if (ms >= 0) {
			if (!hasTrans) {
				ret += `${ms}毫秒`
			}
		}
	}
	return ret;
}
/**
 * 格式化数据
 * @param value
 * @param unit
 * @returns
 */
function getFormattedValue(value, unit){
	if(unit){
		if(isIntegerUnit(unit)){//单位是否为整数
			return new Array(formatNumber(Math.round(value)), unit).join("");
		}else if(unit==='Bps'){
			return format_bps(value);
		}else if(unit==='B'){
			return formatFlow(value);
		}else if(unit==="毫秒"||unit==="ms"){
			return formatTimeUnit_millisecond(value);
		}else if(unit==="微秒"||unit==="us"){
			return formatTimeUnit_millisecond(value/1000);
		}
	}
	return formatNumber(value);
}
Util.formatNumber = formatNumber
Util.getFormattedValue = getFormattedValue

Util.getColorByApdex = function(val){
	let color = "rgb(204,32,56)"; //红色
	if (val >= 60 && val < 80) {
		//黄色
		color = "rgb(232,203,43)";
	} else if (val >= 80) {
		//绿色
		color = "rgb(32,169,9)";
	}
	return color;
}

export default Util