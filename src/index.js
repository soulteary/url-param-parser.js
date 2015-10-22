/**
 * 获取URL中的参数
 *
 * @param url
 * @param skipHashParams
 * @returns {*}
 */
function getParams(url, skipHashParams) {
    // 如果缺少地址参数，抛出异常。
    if (!url) {
        throw 'Need URL Params.';
    }

    // 保存解析结果
    var params;

    /**
     * Hash请求可能存在的情况
     * 1 abc#1      =》  1
     * 2 abc##1     =》  skip
     * 3 abc#       =》  skip
     * 4 abc##      =》  skip
     * 5 #abc       =》  abc
     * 6 ##abc      =》  skip
     * 7 #          =》  skip
     * 8 ###        =》  skip
     */
    // 获取URL中Hash符号的位置
    var hashPos = url.indexOf('#');
    // 尝试保留URL中的QueryString的位置
    var uriQuery = url.substr(0, hashPos === -1 ? url.length: hashPos);
    // 保存解析的Hash内容
    var hashQuery;

    function parse(data) {
        if (!data) {
            return null;
        }
        var params = data.split('&');
        var result = {};
        while (params.length) {
            var item = params.shift();
            /**
             * 1 ABC              =》 ABC = undefined
             * 2 A=B              =》 A   = B
             * 3 A=B== (base64)   =>  A   = B==
             * 4 A=               =>  A   = undefined
             * 5 =B               =>  skip
             * 6 =                =>  skip
             */
            /**
             * 第一个赋值符号的位置
             */
            var separatorPos = item.indexOf('=');
            // 5,6
            if (separatorPos === 0 && item.lastIndexOf('=') === item.indexOf('=')) {
                continue;
            }

            var key;
            var val;
            if (separatorPos !== -1) {
                key = item.substr(0, separatorPos);
                val = item.substr(separatorPos + 1);
            } else {
                if (!item) {
                    continue;
                }
                key = item;
                val = undefined;
            }
            if (result.hasOwnProperty(key)) {
                if ({}.toString.call(result[key]) !== '[object Array]') {
                    result[key] = [result[key]];
                }
                result[key].push(val);
            } else {
                result[key] = val;
            }
        }
        return result;
    }

    // 如果用户指定不解析Hash参数内容
    if (skipHashParams) {
        hashQuery = '';
    } else {
        // 如果存在Hash符号，并且存在唯一Hash符号时，保存Hash内容
        if (hashPos !== -1 && url.lastIndexOf('#') === url.indexOf('#')) {
            hashQuery = url.substr(hashPos + 1);
        } else {
            // 不处理以下情况: 2,4,6,8
            hashQuery = '';
        }
    }
    // 保存处理后的Hash结果
    params = {
        uri  : uriQuery,
        hash : parse(hashQuery)
    };

    /**
     * QueryString可能存在的情况
     * 1 ??abc?ver=1    =>  ver=1
     * 2 ?abc           =>  abc
     * 3 ???abc         =>  abc
     */
    // QueryString符号位置
    var queryPos = params.uri.lastIndexOf('?');
    // 如果不存在符号
    if (queryPos === -1) {
        return params;
    }
    // 获取QueryString内容
    params.uri = params.uri.substr(queryPos + 1);

    //?
    if (params.uri === -1) {
        return params;
    }

    params.uri = parse(params.uri);

    return params;
}
