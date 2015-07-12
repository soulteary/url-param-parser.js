/**
 * Test spec for jasmine
 */
describe('URL参数解析', function() {

    it('解析参数和Hash', function() {
        expect(JSON.stringify(getParams('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&#a=b'))).toBe('{"uri":{"abc":"1","a":["","1","1","1"]},"hash":{"a":"b"}}');
    });

    it('Hash为空', function() {
        expect(JSON.stringify(getParams('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&#'))).toBe('{"uri":{"abc":"1","a":["","1","1","1"]},"hash":null}');
    });

    it('Hash为空(多个#)', function() {
        expect(JSON.stringify(getParams('http://demo.com/?abc=1&a=&=&=abc&a=1&a=1&a=1&abcd&###'))).toBe('{"uri":{"abc":"1","a":["","1","1","1"]},"hash":null}');
    });

});
