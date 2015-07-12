/**
 * Test spec for mocha
 */
var assert = require('assert');

/**
 * 获取URL中的参数
 *
 * @param url
 * @param skipHashParams
 * @returns {*}
 */
function getParams(url, skipHashParams) {
    if (!url) {
        return null;
    }

    var params;
    /**
     * 1 abc#1      =》  1
     * 2 abc##1     =》  skip
     * 3 abc#       =》  skip
     * 4 abc##      =》  skip
     * 5 #abc       =》  abc
     * 6 ##abc      =》  skip
     * 7 #          =》  skip
     * 8 ###        =》  skip
     */
    var hashPos = url.indexOf('#');
    var uriQuery = url.substr(0, hashPos);
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

    if (skipHashParams) {
        hashQuery = '';
    } else {
        if (hashPos !== -1 && url.lastIndexOf('#') === url.indexOf('#')) {
            hashQuery = url.substr(hashPos + 1);
        } else {
            // skip 2,4,6,8
            hashQuery = '';
        }
    }
    params = {
        uri  : uriQuery,
        hash : parse(hashQuery)
    };

    /**
     * 1 ??abc?ver=1    =>  ver=1
     * 2 ?abc           =>  abc
     * 3 ???abc         =>  abc
     *
     */
    var queryPos = params.uri.lastIndexOf('?');
    if (queryPos === -1) {
        return params;
    }

    params.uri = params.uri.substr(queryPos + 1);

    if (params.uri === -1) {
        return params;
    }

    params.uri = parse(params.uri);

    return params;
}

describe('URL参数解析', function() {

    it('解析参数和Hash', function() {
        assert.equal(JSON.stringify(getParams('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&#a=b')), '{"uri":{"abc":"1","a":["","1","1","1"]},"hash":{"a":"b"}}');
    });

    it('Hash为空', function() {
        assert.equal(JSON.stringify(getParams('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&#')), '{"uri":{"abc":"1","a":["","1","1","1"]},"hash":null}');
    });

    it('Hash为空(多个#)', function() {
        assert.equal(JSON.stringify(getParams('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&###')), '{"uri":{"abc":"1","a":["","1","1","1"]},"hash":null}');
    });

});
