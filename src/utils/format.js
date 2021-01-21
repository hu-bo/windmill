import { isArray } from './types'
/*
* 数组格式转换
* [a:1] ->[b:1]
* options {Array <string, bject>}
* @return {Array}
* options = {
     data:res.websiteList,
     format:['id','text'],
     originaFormat:['site','site_cn_name']
  }
*/
var array2Array = function (options) {
    var arr = options.data;
    var format = options.format;
    var originaFormat = options.originaFormat;
    if (!isArray(format) || typeof format[0] !== "string") {
        throw ('TypeError: format must Array--->["key","valueKey"]')
        return false
    }
    if (!isArray(originaFormat) || typeof originaFormat[0] !== "string") {
        throw ('TypeError: originaFormat must Array--->["key","valueKey"]')
        return false
    }
    if (isArray(arr)) {
        return arr.map(function (item) {
            var itemTemp = {}
            format.map(function (formatName,index) {
                itemTemp[formatName] = item[originaFormat[index]] || item[originaFormat[index - 1]];
            })
            return itemTemp
        })
    } else {
        return []
    }
}
export{
  array2Array
}
