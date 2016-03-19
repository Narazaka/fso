// Generated by CoffeeScript 1.10.0
(function() {
  var FileSystemObject, chai, current_new_path_methods, expect, fd_methods, fs, fso, hierarchy, single_path_methods, single_path_methods_nosync, sinon,
    slice = [].slice;

  if (typeof require !== "undefined" && require !== null) {
    chai = require('chai');
  } else {
    chai = this.chai;
  }

  chai.should();

  expect = chai.expect;

  if (typeof require !== "undefined" && require !== null) {
    sinon = require('sinon');
    fs = require('fs');
    fso = require('../fso.js');
  } else {
    sinon = this.sinon;
    fs = this.fs;
    FileSystemObject = this.FileSystemObject;
    fso = new FileSystemObject(fs, process.cwd());
  }

  hierarchy = {
    'cwdfile': 'cwdfile',
    'dir': {
      'dirfile': 'dirfile',
      'dirfile2': 'dirfile2',
      'dir2': {
        'dir2file': 'dir2file',
        'dir2file2': 'dir2file2'
      },
      'dir22': {
        'dir22file': 'dir22file',
        'dir22file2': 'dir22file2'
      }
    },
    'dir1': {
      'dir1file1': 'dir1file1',
      'dir1file2': 'dir1file2'
    }
  };

  single_path_methods = ['truncate', 'chown', 'lchown', 'chmod', 'lchmod', 'stat', 'lstat', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'readdir', 'utimes', 'readFile', 'writeFile', 'appendFile', 'exists'];

  single_path_methods_nosync = ['createReadStream', 'createWriteStream'];

  current_new_path_methods = ['rename', 'link', 'symlink'];

  fd_methods = ['ftruncate', 'fchown', 'fchmod', 'fstat', 'write', 'read'];

  describe('single_path_methods', function() {
    beforeEach(function() {
      var i, len, method, results;
      results = [];
      for (i = 0, len = single_path_methods.length; i < len; i++) {
        method = single_path_methods[i];
        sinon.stub(fs, method);
        results.push(sinon.stub(fs, method + 'Sync'));
      }
      return results;
    });
    afterEach(function() {
      var i, len, method, results;
      results = [];
      for (i = 0, len = single_path_methods.length; i < len; i++) {
        method = single_path_methods[i];
        fs[method].restore();
        results.push(fs[method + 'Sync'].restore());
      }
      return results;
    });
    it('should do like fs', function() {
      var args, file, filename, i, len, method, ref, results;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1, (function() {})];
      results = [];
      for (i = 0, len = single_path_methods.length; i < len; i++) {
        method = single_path_methods[i];
        file[method].apply(file, args);
        results.push((ref = fs[method].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args))).should.be["true"]);
      }
      return results;
    });
    it('should do like fs Promise', function() {
      var args, file, filename, i, len, method, ref, results;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1];
      results = [];
      for (i = 0, len = single_path_methods.length; i < len; i++) {
        method = single_path_methods[i];
        file[method].apply(file, args);
        results.push((ref = fs[method].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args), [fs[method].firstCall.args[fs[method].firstCall.args.length - 1]])).should.be["true"]);
      }
      return results;
    });
    return it('should do like fs Sync', function() {
      var args, file, filename, i, len, method, ref, results;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1, (function() {})];
      results = [];
      for (i = 0, len = single_path_methods.length; i < len; i++) {
        method = single_path_methods[i];
        file[method + 'Sync'].apply(file, args);
        results.push((ref = fs[method + 'Sync'].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args))).should.be["true"]);
      }
      return results;
    });
  });

  describe('single_path_methods_nosync', function() {
    beforeEach(function() {
      var i, len, method, results;
      results = [];
      for (i = 0, len = single_path_methods_nosync.length; i < len; i++) {
        method = single_path_methods_nosync[i];
        results.push(sinon.stub(fs, method));
      }
      return results;
    });
    afterEach(function() {
      var i, len, method, results;
      results = [];
      for (i = 0, len = single_path_methods_nosync.length; i < len; i++) {
        method = single_path_methods_nosync[i];
        results.push(fs[method].restore());
      }
      return results;
    });
    return it('should do like fs Sync', function() {
      var args, file, filename, i, len, method, ref, results;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1, (function() {})];
      results = [];
      for (i = 0, len = single_path_methods_nosync.length; i < len; i++) {
        method = single_path_methods_nosync[i];
        file[method].apply(file, args);
        results.push((ref = fs[method].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args))).should.be["true"]);
      }
      return results;
    });
  });

  describe('current_new_path_methods', function() {
    beforeEach(function() {
      var i, len, method, results;
      results = [];
      for (i = 0, len = current_new_path_methods.length; i < len; i++) {
        method = current_new_path_methods[i];
        sinon.stub(fs, method);
        results.push(sinon.stub(fs, method + 'Sync'));
      }
      return results;
    });
    afterEach(function() {
      var i, len, method, results;
      results = [];
      for (i = 0, len = current_new_path_methods.length; i < len; i++) {
        method = current_new_path_methods[i];
        fs[method].restore();
        results.push(fs[method + 'Sync'].restore());
      }
      return results;
    });
    it('should do like fs', function() {
      var args, file, filename, i, len, method, newfile, newfilename, ref, results;
      filename = '/file';
      newfilename = '/newfile';
      file = fso["new"](filename);
      newfile = fso["new"](newfilename);
      args = [newfile.path, 'a', 'b', [], 100, -1, (function() {})];
      results = [];
      for (i = 0, len = current_new_path_methods.length; i < len; i++) {
        method = current_new_path_methods[i];
        file[method].apply(file, args);
        results.push((ref = fs[method].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args))).should.be["true"]);
      }
      return results;
    });
    it('should do like fs Promise', function() {
      var args, file, filename, i, len, method, newfile, newfilename, ref, results;
      filename = '/file';
      newfilename = '/newfile';
      file = fso["new"](filename);
      newfile = fso["new"](newfilename);
      args = [newfile.path, 'a', 'b', [], 100, -1];
      results = [];
      for (i = 0, len = current_new_path_methods.length; i < len; i++) {
        method = current_new_path_methods[i];
        file[method].apply(file, args);
        results.push((ref = fs[method].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args), [fs[method].firstCall.args[fs[method].firstCall.args.length - 1]])).should.be["true"]);
      }
      return results;
    });
    return it('should do like fs Sync', function() {
      var args, file, filename, i, len, method, newfile, newfilename, ref, results;
      filename = '/file';
      newfilename = '/newfile';
      file = fso["new"](filename);
      newfile = fso["new"](newfilename);
      args = [newfile.path, 'a', 'b', [], 100, -1, (function() {})];
      results = [];
      for (i = 0, len = current_new_path_methods.length; i < len; i++) {
        method = current_new_path_methods[i];
        file[method + 'Sync'].apply(file, args);
        results.push((ref = fs[method + 'Sync'].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args))).should.be["true"]);
      }
      return results;
    });
  });

  describe('open', function() {
    var fd, method;
    method = 'open';
    fd = 111;
    beforeEach(function() {
      sinon.stub(fs, method, function() {
        var args, callback, i;
        args = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), callback = arguments[i++];
        return callback(null, fd);
      });
      return sinon.stub(fs, method + 'Sync', function() {
        return fd;
      });
    });
    afterEach(function() {
      fs[method].restore();
      return fs[method + 'Sync'].restore();
    });
    it('should do like fs and store fd', function() {
      var args, callback, file, filename, ref;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1];
      callback = sinon.spy();
      file[method].apply(file, slice.call(args).concat([callback]));
      (ref = fs[method].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args), [fs[method].firstCall.args[fs[method].firstCall.args.length - 1]])).should.be["true"];
      callback.firstCall.calledWithExactly(null, fd).should.be["true"];
      return file.fd.should.be.equals(fd);
    });
    it('should do like fs and store fd Promise', function() {
      var args, file, filename, ref;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1];
      file[method].apply(file, args);
      (ref = fs[method].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args), [fs[method].firstCall.args[fs[method].firstCall.args.length - 1]])).should.be["true"];
      return file.fd.should.be.equals(fd);
    });
    return it('should do like fs and store fd Sync', function() {
      var args, file, filename, ref;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1];
      file[method + 'Sync'].apply(file, args);
      (ref = fs[method + 'Sync'].firstCall).calledWithExactly.apply(ref, [file.path].concat(slice.call(args))).should.be["true"];
      return file.fd.should.be.equals(fd);
    });
  });

  describe('fd_methods', function() {
    var fd;
    fd = 111;
    beforeEach(function() {
      var i, len, method;
      for (i = 0, len = fd_methods.length; i < len; i++) {
        method = fd_methods[i];
        sinon.stub(fs, method);
        sinon.stub(fs, method + 'Sync');
      }
      return sinon.stub(fs, 'openSync', function() {
        return fd;
      });
    });
    afterEach(function() {
      var i, len, method;
      for (i = 0, len = fd_methods.length; i < len; i++) {
        method = fd_methods[i];
        fs[method].restore();
        fs[method + 'Sync'].restore();
      }
      return fs['openSync'].restore();
    });
    it('should do like fs', function() {
      var args, file, filename, i, len, method, ref, results;
      filename = '/file';
      file = fso["new"](filename);
      file.openSync();
      args = ['a', 'b', [], 100, -1, (function() {})];
      results = [];
      for (i = 0, len = fd_methods.length; i < len; i++) {
        method = fd_methods[i];
        file[method].apply(file, args);
        results.push((ref = fs[method].firstCall).calledWithExactly.apply(ref, [fd].concat(slice.call(args))).should.be["true"]);
      }
      return results;
    });
    it('should do like fs Promise', function() {
      var args, file, filename, i, len, method, ref, results;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1];
      file.openSync();
      results = [];
      for (i = 0, len = fd_methods.length; i < len; i++) {
        method = fd_methods[i];
        file[method].apply(file, args);
        results.push((ref = fs[method].firstCall).calledWithExactly.apply(ref, [fd].concat(slice.call(args), [fs[method].firstCall.args[fs[method].firstCall.args.length - 1]])).should.be["true"]);
      }
      return results;
    });
    return it('should do like fs Sync', function() {
      var args, file, filename, i, len, method, ref, results;
      filename = '/file';
      file = fso["new"](filename);
      args = ['a', 'b', [], 100, -1, (function() {})];
      file.openSync();
      results = [];
      for (i = 0, len = fd_methods.length; i < len; i++) {
        method = fd_methods[i];
        file[method + 'Sync'].apply(file, args);
        results.push((ref = fs[method + 'Sync'].firstCall).calledWithExactly.apply(ref, [fd].concat(slice.call(args))).should.be["true"]);
      }
      return results;
    });
  });


  /*
  describe 'objective', ->
  	beforeEach ->
  		mock hierarchy
  	afterEach ->
  		mock.restore()
  	it 'should do like fs Sync', ->
  		filename = 'cwdfile'
   *		file = fso.new filename
  
  cwdfile = fso.new 'cwdfile'
  console.log cwdfile.readFileSync 'utf8'
  dir = fso.new 'dir'
  console.log dir.readdirSync()
  dir.readdir (err, files) -> console.log files
  dir.new('../dir1').children()
  .then (children) ->
  	for child in children
  		console.log child.path
   */

}).call(this);
