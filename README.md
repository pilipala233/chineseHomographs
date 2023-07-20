
# 项目简介
通过nodeJs进行中文形近字表匹配


## 创作目的

由于近日知乎取消了匿名功能，许多用户自发的将昵称改为形如“匿名用户”的举动有感，进而学习思考形近字的计算。其中阅读了[nlp-hanzi-similar](https://github.com/houbb/nlp-hanzi-similar/blob/master/README.md)这个仓库的代码大致实现，但由于本人学术不深且只需部分功能实现，通过使用nodeJs将该仓库下的形近字表进行一个简单的读写查询


# 快速开始 

## 需要 

Node.js


## 快速开始

### 基本用法

使用node命令执行main文件夹下的index.js

### 参数说明

```js
@param {string} filePath - txt文件的路径。
@param {string} targetChar - 要查找形近字的目标汉字。
@param {number} [numChars=10] - 指定返回的形近字数目，默认为10个。
```

# 后期计划
尝试实现全部功能的JavaScript版本
