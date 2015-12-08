/**
 * Test spec for jasmine
 */
var assert = assert || {equal : expect};
var format = format || JSON.stringify;

var parser = parser || window.urlParamParser;

describe('URL参数解析', function () {

    it('解析参数和Hash', function () {
        assert.equal(
            format(parser('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&#a=b')),
            '{"hash":{"a":"b"},"search":{"abc":"1","a":["","1","1","1"]}}'
        );
    });

    it('Hash为空', function () {
        assert.equal(
            format(parser('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&#')),
            '{"hash":null,"search":{"abc":"1","a":["","1","1","1"]}}'
        );
    });

    it('Hash为空(多个#)', function () {
        assert.equal(
            format(parser('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&###')),
            '{"search":{"abc":"1","a":["","1","1","1"]}}'
        );
    });

});