fso - FileSystemObject
==========================

Objective 'fs'

Installation
--------------------------

    npm install fso

    bower install fso

If you want to use Promise in a environment not having build-in Promise, 'bluebird' required.

Usage
--------------------------

    var fso = require('fso');
    var hoge = fso.new('../hoge.txt');
    var contents = hoge.readFileSync({encoding: 'utf8'});
    var parent = fso.new('../');
    parent.childrenAll().then(function(children){
    	children.forEach(function(child){child.unlinkSync();});
    });

or use this on the browsers ...

    <script src="browserfs.min.js"></script>
    <script src="fso.js"></script>
    ...
    var fs = reauire('fs');
    var root = FileSystemObject(fs, '/');

API
--------------------------

### 'fs' API

Supports almost all the node.js 'fs' APIs excepts watch*.

`method(callback)`, `methodSync()` and `promise = method()`

#### one file args

    fs.truncateSync('/path/to/file', 0);
    // is
    file = new FileSystemObject('/path/to/file');
    file.truncateSync(0);

#### two file args

    fs.rename('/path/to/file', 'newfile', callback);
    // is
    file = new FileSystemObject('/path/to/file');
    file.remane('newfile', callback);

#### fd args

    fd = fs.openSync('/path/to/file');
    fs.ftruncateSync(fd, 0);
    fs.close(fd);
    // is
    file = new FileSystemObject('/path/to/file');
    file.openSync();
    file.ftruncateSync(0);
    file.close();

### convenient additional

#### mkdirp

    dir.mkdirp('long/deep/path/to');

#### mkpath (= mkdirp)

#### readdirAll

    dir.readdirAllSync()
    // results
    ['a.txt', 'aa', 'aa/a.txt', 'aa/b', 'aa/b/c.txt']

### objective

#### new

    dir = fso.new('dir');
    a = dir.new('a.txt');
    a.writeFileSync('aaaaaa');

#### parent

    dir = fso.new('dir');
    p = dir.parent();
    dir = p.new('dir');

#### children, childrenSync

    dir = fso.new('dir');
    files = dir.childrenSync();

#### childrenAll, childrenAllSync

    dir = fso.new('dir');
    files = dir.childrenAllSync();

### Promised methods

    dir.readdir().then(function(results){
    	var children = results[0]; // important! : promise method results is wraped by array.
    });

License
--------------------------

This is released under [MIT License](http://narazaka.net/license/MIT?2014).
