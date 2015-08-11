## URL-Params.js(building...)

We often need convert the string to object from URL, eg: QueryString, Hash, AJAX crawling scheme...

I hope this simple function can let you're at ease.

## Parse Rule

### URL Hash Fragment

A string which contain `#`, and only works at browser. 

#### Pure Hash Fragment

A string only contain `#`.

|No|Origin URL String|Parse Hash String|Parse Hash Object|Parse Reason|
|---|---|---|---|---|
|1|http://this.is.example.url/abc|null|```{hash: null}```|without `#`.|
|2|http://this.is.example.url/#|undefined|```{hash: undefined}```|nothing after `#`.|
|3|http://this.is.example.url/abc#|undefined|```{hash: undefined}```|nothing after `#`.|
|4|http://this.is.example.url/#1|1|```{hash: {1: undefined}}```|String `1` after `#`.|
|5|http://this.is.example.url/#a=b|a=b|```{hash: {a: "b"}}```|String `a=b` after `#`.|
|6|http://this.is.example.url/###|null|```{hash: null}```|`#` shouldn't repeat more than one time.|
|7|http://this.is.example.url/abc##|null|```{hash: null}```|`#` shouldn't repeat more than one time.|
|8|http://this.is.example.url/abc##1|null|```{hash: null}```|`#` shouldn't repeat more than one time.|

#### Hash Fragment With Browser-Only QueryString

A string contain `#?`.

|No|Origin URL String|Parse Hash String|Parse Hash Object|Parse Reason|
|---|---|---|---|---|
|1|http://this.is.example.url/abc#?|undefined|```{hash: undefined}```|nothing after `#?`.|
|2|http://this.is.example.url/#?1|1|```{hash: {1: undefined}}```|String `1` after `#?`.|
|3|http://this.is.example.url/#?a=b|a=b|```{hash: {a: "b"}}```|String `a=b` after `#?`.|

otherwise above, the `Parse Hash String` equal `null`, and `Parse Hash Object` equal `{hash: null}`.

### URL Pathname

|No|Origin URL String|Parse Hash String|Parse Hash Object|Parse Reason|
|---|---|---|---|---|
|1|http://this.is.example.url/ABC|ABC|```{path: {ABC: undefined}}```|-|
|2|http://this.is.example.url/A=B |A=B|```{path: {A: 'B'}}```|-|
|3|http://this.is.example.url/A=B== (base64)|A=B==|```{path: {A: 'B=='}}```|-|
|4|http://this.is.example.url/=B |null|```{path: null}```|-|
|5|http://this.is.example.url/= |null|```{path: null}```|-|

otherwise above, the `Parse Hash String` equal `null`, and `Parse Hash Object` equal `{path: null}`.

### QueryString

|No|Origin URL String|Parse Hash String|Parse Hash Object|Parse Reason|
|---|---|---|---|---|
|1|http://this.is.example.url/?abc|abc|```{query: {abc: undefined}}```|-|
|2|http://this.is.example.url/?abc=1|abc=1|```{query: {abc: "1"}}```|-|
|3|http://this.is.example.url/???abc|abc|```{query: {abc: undefined}}```|-|
|4|http://this.is.example.url/??abc?ver=1|ver=1|```{query: {ver: "1"}}```|-|
|5|http://this.is.example.url/??abc?ver=1??abc|null|```{query: null```|-|


###[AJAX crawling scheme](https://support.google.com/webmasters/answer/174992?hl=en)

- to be continue...

## Author

2015 - [soulteary](http://www.soulteary.com/)

## License

[MIT License](./LICENSE)。
