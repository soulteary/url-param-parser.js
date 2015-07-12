## url-params.js

解析URL中的参数。

Parse URL params.

## 示例

Hash

```
http://this.is.example.url/abc#1      =》  1
http://this.is.example.url/abc##1     =》  skip
http://this.is.example.url/abc#       =》  skip
http://this.is.example.url/abc##      =》  skip
http://this.is.example.url/#abc       =》  abc
http://this.is.example.url/##abc      =》  skip
http://this.is.example.url/#          =》  skip
http://this.is.example.url/###        =》  skip
```

Pathname

```
http://this.is.example.url/ABC              =》 ABC = undefined
http://this.is.example.url/A=B              =》 A   = B
http://this.is.example.url/A=B== (base64)   =>  A   = B==
http://this.is.example.url/A=               =>  A   = undefined
http://this.is.example.url/=B               =>  skip
http://this.is.example.url/=                =>  skip
```

QueryString

```
http://this.is.example.url/??abc?ver=1    =>  ver=1
http://this.is.example.url/?abc           =>  abc
http://this.is.example.url/???abc         =>  abc
```

## 项目作者

2015 - soulteary

## 项目协议

项目使用的协议为[MIT License](./LICENSE)。
