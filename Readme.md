[fso - FileSystemObject](https://github.com/Narazaka/fso)
==========================

[![npm](https://img.shields.io/npm/v/fso.svg)](https://www.npmjs.com/package/fso)
[![npm license](https://img.shields.io/npm/l/fso.svg)](https://www.npmjs.com/package/fso)
[![npm download total](https://img.shields.io/npm/dt/fso.svg)](https://www.npmjs.com/package/fso)
[![npm download by month](https://img.shields.io/npm/dm/fso.svg)](https://www.npmjs.com/package/fso)

[![Dependency Status](https://david-dm.org/Narazaka/fso.svg)](https://david-dm.org/Narazaka/fso)
[![devDependency Status](https://david-dm.org/Narazaka/fso/dev-status.svg)](https://david-dm.org/Narazaka/fso#info=devDependencies)
[![Travis Build Status](https://travis-ci.org/Narazaka/fso.svg)](https://travis-ci.org/Narazaka/fso)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/Narazaka/fso?svg=true)](https://ci.appveyor.com/project/Narazaka/fso)
[![codecov.io](https://codecov.io/github/Narazaka/fso/coverage.svg?branch=master)](https://codecov.io/github/Narazaka/fso?branch=master)
[![Code Climate](https://codeclimate.com/github/Narazaka/fso/badges/gpa.svg)](https://codeclimate.com/github/Narazaka/fso)

fso - FileSystemObject is a objective fs interface like Pathname(ruby).

Installation
--------------------------

```
npm install fso
```

Usage
--------------------------

node.js:
```javascript
var fso = require('fso').default;
var FileSystemObject = require('fso').FileSystemObject;
```

ES2015:
```javascript
import fso, {FileSystemObject} from 'fso';
```

or use this on the browsers ...

```html
<script src="fso.js"></script>
<script>
/* BrowserFS init... */
var FileSystemObject = fso.FileSystemObject;
var fso = fso.default;
</script>
```

API
--------------------------

[API Documents (with type annotations)](https://narazaka.github.io/fso/index.html)

### objective methods

#### constructor

```javascript
var abc = new FileSystemObject("a", "b", "c");
abc.toString() === "a/b/c"
```

#### new / join

```javascript
dir = fso.new('dir');
a = dir.new('a.txt');
a.writeFileSync('aaaaaa');
```

#### parent

```javascript
dir = fso.new('dir');
p = dir.parent();
dir = p.new('dir');
```

#### children, childrenSync

```javascript
dir = fso.new('dir');
files = dir.childrenSync();
```

#### childrenAll, childrenAllSync

```javascript
dir = fso.new('dir');
files = dir.childrenAllSync();
```

### path

#### path / toString

```javascript
fooPath = fso.new('foo').path;
fooPath = fso.new('foo').toString();
```

### 'fs' API

Supports all the node.js 'fs' APIs that needs no first path argument.

`method(...args, callback)`, `methodSync(...args)` and `promise = method(...args)`

#### one file args

```javascript
fs.truncateSync('/path/to/file', 0);
// is
file = fso.new('/path/to/file');
file.truncateSync(0);
```

#### two file args

```javascript
fs.rename('/path/to/file', 'newfile', callback);
// is
file = fso.new('/path/to/file');
file.remane('newfile', callback);
```

#### fd args

```javascript
fd = fs.openSync('/path/to/file');
fs.ftruncateSync(fd, 0);
fs.close(fd);
// is
file = fso.new('/path/to/file');
file.openSync();
file.ftruncateSync(0);
file.close();
```

### convenient additional

#### mkdirAll
```javascript
fso.new('long/deep/path/to').mkdirAll().then(...);
```

#### mkdirp (= mkdirAll)

#### mkpath (= mkdirAll)

#### readdirAll
```javascript
dir.readdirAllSync()
// results
['a.txt', 'aa', 'aa/a.txt', 'aa/b', 'aa/b/c.txt']
```

#### rmAll

```javascript
await dir.rmAll('junk');
```

#### rmtree (= rmAll)

### path methods

#### (property) delimiter
```javascript
fso.delimiter; // ":" or ";"
```

#### (property) sep
```javascript
fso.sep; // "/" or "\\"
```

#### (static) format
```javascript
var entry = FileSystemObject.format({...});
```

#### parse
```javascript
var parsedObject = fso.new("a").parse();
```

#### normalize
```javascript
fso.new("a").normalize(); // same as fso.new("a")
```

#### basename
```javascript
fso.new("a/b/c").basename(); // same as new FileSystemObject("c")
```

#### dirname
same as parent()

#### extname
```javascript
fso.new("a/b/c.txt").extname(); // ".txt"
```

#### isAbsolute
```javascript
fso.new("a/b/c.txt").isAbsolute() === true
```

#### relative

```javascript
fso.new("a/b/c").relative(fso.new("a/d")); // same as new FileSystemObject("../d")
fso.new("/a/b/c").relative("/a/d"); // same as new FileSystemObject("../d")
```

#### resolve
```javascript
fso.new("a/b/c").resolve("/") // same as new FileSystemObject("/a/b/c")
```

License
--------------------------

This is released under [MIT License](http://narazaka.net/license/MIT?2016).
