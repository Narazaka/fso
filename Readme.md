fso - FileSystemObject
==========================

Objective 'fs'

Installation
--------------------------

    npm install fso

    bower install fso

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

License
--------------------------

This is released under [MIT License](http://narazaka.net/license/MIT?2014).
