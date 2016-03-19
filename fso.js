// Generated by CoffeeScript 1.10.0

/* (C) 2014 Narazaka : Licensed under The MIT License - http://narazaka.net/license/MIT?2014 */

(function() {
  var FileSystemObject, path,
    slice = [].slice;

  path = this.path;

  if (typeof require !== "undefined" && require !== null) {
    if (path == null) {
      path = require('path');
    }
  }

  FileSystemObject = (function() {
    var current_new_path_methods, fd_methods, i, j, k, l, len, len1, len2, len3, method, single_path_methods, single_path_methods_nosync;

    function FileSystemObject(fs, newPath) {
      this.fs = fs;
      this.path = path.resolve(newPath);
    }

    single_path_methods = ['truncate', 'chown', 'lchown', 'chmod', 'lchmod', 'stat', 'lstat', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'readdir', 'utimes', 'readFile', 'writeFile', 'appendFile', 'exists'];

    single_path_methods_nosync = ['createReadStream', 'createWriteStream'];

    current_new_path_methods = ['rename', 'link', 'symlink'];

    fd_methods = ['ftruncate', 'fchown', 'fchmod', 'fstat', 'write', 'read'];

    for (i = 0, len = single_path_methods.length; i < len; i++) {
      method = single_path_methods[i];
      FileSystemObject.prototype[method] = (function(method) {
        return function() {
          var args, ref;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (args[args.length - 1] instanceof Function) {
            return (ref = this.fs)[method].apply(ref, [this.path].concat(slice.call(args)));
          } else {
            return new Promise((function(_this) {
              return function(resolve, reject) {
                var ref1;
                return (ref1 = _this.fs)[method].apply(ref1, [_this.path].concat(slice.call(args), [function() {
                  var args, err;
                  err = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
                  if (err != null) {
                    return reject(err);
                  } else {
                    return resolve(args);
                  }
                }]));
              };
            })(this));
          }
        };
      })(method);
      FileSystemObject.prototype[method + 'Sync'] = (function(methodSync) {
        return function() {
          var args, ref;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return (ref = this.fs)[methodSync].apply(ref, [this.path].concat(slice.call(args)));
        };
      })(method + 'Sync');
    }

    for (j = 0, len1 = single_path_methods_nosync.length; j < len1; j++) {
      method = single_path_methods_nosync[j];
      FileSystemObject.prototype[method] = (function(method) {
        return function() {
          var args, ref;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (args[args.length - 1] instanceof Function) {
            return (ref = this.fs)[method].apply(ref, [this.path].concat(slice.call(args)));
          } else {
            return new Promise((function(_this) {
              return function(resolve, reject) {
                var ref1;
                return (ref1 = _this.fs)[method].apply(ref1, [_this.path].concat(slice.call(args), [function() {
                  var args, err;
                  err = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
                  if (err != null) {
                    return reject(err);
                  } else {
                    return resolve(args);
                  }
                }]));
              };
            })(this));
          }
        };
      })(method);
    }

    for (k = 0, len2 = current_new_path_methods.length; k < len2; k++) {
      method = current_new_path_methods[k];
      FileSystemObject.prototype[method] = (function(method) {
        return function() {
          var args, current_path, newPath, new_path, ref;
          newPath = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          current_path = this.path;
          new_path = path.resolve(path.dirname(this.path), newPath);
          if (args[args.length - 1] instanceof Function) {
            return (ref = this.fs)[method].apply(ref, [current_path, new_path].concat(slice.call(args)));
          } else {
            return new Promise((function(_this) {
              return function(resolve, reject) {
                var ref1;
                return (ref1 = _this.fs)[method].apply(ref1, [current_path, new_path].concat(slice.call(args), [function() {
                  var args, err;
                  err = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
                  if (err != null) {
                    return reject(err);
                  } else {
                    return resolve(args);
                  }
                }]));
              };
            })(this));
          }
        };
      })(method);
      FileSystemObject.prototype[method + 'Sync'] = (function(methodSync) {
        return function() {
          var args, current_path, newPath, new_path, ref;
          newPath = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          current_path = this.path;
          new_path = path.resolve(path.dirname(this.path), newPath);
          return (ref = this.fs)[methodSync].apply(ref, [current_path, new_path].concat(slice.call(args)));
        };
      })(method + 'Sync');
    }

    for (l = 0, len3 = fd_methods.length; l < len3; l++) {
      method = fd_methods[l];
      FileSystemObject.prototype[method] = (function(method) {
        return function() {
          var args, ref;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (args[args.length - 1] instanceof Function) {
            return (ref = this.fs)[method].apply(ref, [this.fd].concat(slice.call(args)));
          } else {
            return new Promise((function(_this) {
              return function(resolve, reject) {
                var ref1;
                return (ref1 = _this.fs)[method].apply(ref1, [_this.fd].concat(slice.call(args), [function() {
                  var args, err;
                  err = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
                  if (err != null) {
                    return reject(err);
                  } else {
                    return resolve(args);
                  }
                }]));
              };
            })(this));
          }
        };
      })(method);
      FileSystemObject.prototype[method + 'Sync'] = (function(methodSync) {
        return function() {
          var args, ref;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return (ref = this.fs)[methodSync].apply(ref, [this.fd].concat(slice.call(args)));
        };
      })(method + 'Sync');
    }

    FileSystemObject.prototype.open = function() {
      var args, ref;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (args[args.length - 1] instanceof Function) {
        return (ref = this.fs).open.apply(ref, [this.path].concat(slice.call(args.slice(0, -1)), [(function(_this) {
          return function(err, fd) {
            _this.fd = fd;
            return args[args.length - 1](err, fd);
          };
        })(this)]));
      } else {
        return new Promise((function(_this) {
          return function(resolve, reject) {
            var ref1;
            return (ref1 = _this.fs).open.apply(ref1, [_this.path].concat(slice.call(args), [function(err, fd) {
              _this.fd = fd;
              if (err != null) {
                return reject(err);
              } else {
                return resolve([fd]);
              }
            }]));
          };
        })(this));
      }
    };

    FileSystemObject.prototype.openSync = function() {
      var args, ref;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this.fd = (ref = this.fs).openSync.apply(ref, [this.path].concat(slice.call(args)));
    };

    FileSystemObject.prototype.close = function(callback) {
      if (callback != null) {
        return this.fs.close(this.fd, (function(_this) {
          return function(err) {
            if (err == null) {
              delete _this.fd;
            }
            return callback(err);
          };
        })(this));
      } else {
        return new Promise((function(_this) {
          return function(resolve, reject) {
            return _this.fs.close(_this.fd, function(err) {
              if (err != null) {
                return reject(err);
              } else {
                delete _this.fd;
                return resolve([]);
              }
            });
          };
        })(this));
      }
    };

    FileSystemObject.prototype.closeSync = function() {
      var ret;
      ret = this.fs.closeSync(this.fd);
      delete this.fd;
      return ret;
    };

    FileSystemObject.prototype.mkdirp = function() {
      var args, mkdir;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (args[args.length - 1] instanceof Function) {
        mkdir = (function(_this) {
          return function(dir, callback) {
            return _this.fs.stat(dir, function(err) {
              if (err != null) {
                return mkdir(path.dirname(dir), function(err) {
                  var ref;
                  if (err != null) {
                    return callback(err);
                  } else {
                    return (ref = _this.fs).mkdir.apply(ref, [dir].concat(slice.call(args.slice(0, -1)), [callback]));
                  }
                });
              } else {
                return callback();
              }
            });
          };
        })(this);
        return mkdir(this.path, args[args.length - 1]);
      } else {
        mkdir = (function(_this) {
          return function(dir) {
            return new Promise(function(resolve, reject) {
              return _this.fs.stat(dir, function(err) {
                if (err != null) {
                  return mkdir(path.dirname(dir)).then(function() {
                    var ref;
                    return (ref = _this.fs).mkdir.apply(ref, [dir].concat(slice.call(args), [function(err) {
                      if (err != null) {
                        return reject(err);
                      } else {
                        return resolve([]);
                      }
                    }]));
                  });
                } else {
                  return resolve([]);
                }
              });
            });
          };
        })(this);
        return mkdir(this.path);
      }
    };

    FileSystemObject.prototype.mkdirpSync = function() {
      var args, mkdirSync;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      mkdirSync = (function(_this) {
        return function(dir) {
          var error, ref;
          try {
            return _this.fs.statSync(dir);
          } catch (error) {
            mkdirSync(path.dirname(dir));
            return (ref = _this.fs).mkdirSync.apply(ref, [dir].concat(slice.call(args)));
          }
        };
      })(this);
      return mkdirSync(this.path);
    };

    FileSystemObject.prototype.mkpath = FileSystemObject.prototype.mkdirp;

    FileSystemObject.prototype.mkpathSync = FileSystemObject.prototype.mkdirpSync;

    FileSystemObject.prototype.readdirAll = function(callback) {
      var basedir, readdir;
      if (callback != null) {
        readdir = (function(_this) {
          return function(dir, basedir, callback) {
            return _this.fs.readdir(dir, function(err, entries) {
              var done, entry, entry_paths, len4, m, push_entry_paths, results;
              if (err != null) {
                return callback(err);
              }
              entry_paths = [];
              done = 0;
              push_entry_paths = function(a_entry_paths) {
                entry_paths = entry_paths.concat(a_entry_paths);
                done++;
                if (done === entries.length) {
                  return callback(void 0, entry_paths);
                }
              };
              results = [];
              for (m = 0, len4 = entries.length; m < len4; m++) {
                entry = entries[m];
                results.push((function(entry_path) {
                  return _this.fs.stat(entry_path, function(err, stats) {
                    if (err != null) {
                      return callback(err);
                    }
                    if (stats.isDirectory()) {
                      return readdir(entry_path, basedir, function(err, entry_paths) {
                        if (err != null) {
                          return callback(err);
                        }
                        return push_entry_paths([entry_path.replace(basedir, '')].concat(slice.call(entry_paths)));
                      });
                    } else {
                      return push_entry_paths([entry_path.replace(basedir, '')]);
                    }
                  });
                })(path.join(dir, entry)));
              }
              return results;
            });
          };
        })(this);
        basedir = RegExp('^' + this.path.replace(/(\W)/g, '\\$1') + '[\\\\/]?', 'i');
        return readdir(this.path, basedir, callback);
      } else {
        readdir = (function(_this) {
          return function(dir, basedir) {
            return new Promise(function(resolve, reject) {
              return _this.fs.readdir(dir, function(err, entries) {
                var entry, len4, m, promises;
                if (err != null) {
                  return reject(err);
                }
                promises = [];
                for (m = 0, len4 = entries.length; m < len4; m++) {
                  entry = entries[m];
                  promises.push((function(entry_path) {
                    return new Promise(function(resolve, reject) {
                      return _this.fs.stat(entry_path, function(err, stats) {
                        if (err != null) {
                          return reject(err);
                        }
                        if (stats.isDirectory()) {
                          return readdir(entry_path, basedir).then(function(arg) {
                            var entry_paths;
                            entry_paths = arg[0];
                            return resolve([entry_path.replace(basedir, '')].concat(slice.call(entry_paths)));
                          });
                        } else {
                          return resolve([entry_path.replace(basedir, '')]);
                        }
                      });
                    });
                  })(path.join(dir, entry)));
                }
                return Promise.all(promises).then(function(entry_paths_list) {
                  var a_entry_paths, entry_paths, len5, n;
                  entry_paths = [];
                  for (n = 0, len5 = entry_paths_list.length; n < len5; n++) {
                    a_entry_paths = entry_paths_list[n];
                    entry_paths = entry_paths.concat(a_entry_paths);
                  }
                  return resolve([entry_paths]);
                });
              });
            });
          };
        })(this);
        basedir = RegExp('^' + this.path.replace(/(\W)/g, '\\$1') + '[\\\\/]?', 'i');
        return readdir(this.path, basedir);
      }
    };

    FileSystemObject.prototype.readdirAllSync = function() {
      var basedir, readdir;
      readdir = (function(_this) {
        return function(dir, basedir) {
          var entries, entry, entry_path, entry_paths, len4, m, stats;
          entries = _this.fs.readdirSync(dir);
          entry_paths = [];
          for (m = 0, len4 = entries.length; m < len4; m++) {
            entry = entries[m];
            entry_path = path.join(dir, entry);
            stats = _this.fs.statSync(entry_path);
            if (stats.isDirectory()) {
              entry_paths.push(entry_path.replace(basedir, ''));
              entry_paths = entry_paths.concat(readdir(entry_path, basedir));
            } else {
              entry_paths.push(entry_path.replace(basedir, ''));
            }
          }
          return entry_paths;
        };
      })(this);
      basedir = RegExp('^' + this.path.replace(/(\W)/g, '\\$1') + '[\\\\/]?', 'i');
      return readdir(this.path, basedir);
    };

    FileSystemObject.prototype["new"] = function(newPath) {
      var new_path;
      new_path = path.resolve(this.path, newPath);
      return new FileSystemObject(this.fs, new_path);
    };

    FileSystemObject.prototype._new = FileSystemObject.prototype["new"];

    FileSystemObject.prototype.parent = function() {
      var new_path;
      new_path = path.dirname(this.path);
      return new FileSystemObject(this.fs, new_path);
    };

    FileSystemObject.prototype.children = function(callback) {
      if (callback != null) {
        return this.readdir((function(_this) {
          return function(err, entry_paths) {
            var entries, entry_path, len4, m;
            if (err != null) {
              return callback(err);
            } else {
              entries = [];
              for (m = 0, len4 = entry_paths.length; m < len4; m++) {
                entry_path = entry_paths[m];
                entries.push(_this["new"](entry_path));
              }
              return callback(void 0, entries);
            }
          };
        })(this));
      } else {
        return this.readdir().then((function(_this) {
          return function(arg) {
            var entries, entry_path, entry_paths, len4, m;
            entry_paths = arg[0];
            entries = [];
            for (m = 0, len4 = entry_paths.length; m < len4; m++) {
              entry_path = entry_paths[m];
              entries.push(_this["new"](entry_path));
            }
            return entries;
          };
        })(this));
      }
    };

    FileSystemObject.prototype.childrenSync = function() {
      var entries, entry_path, entry_paths, len4, m;
      entry_paths = this.readdirSync();
      entries = [];
      for (m = 0, len4 = entry_paths.length; m < len4; m++) {
        entry_path = entry_paths[m];
        entries.push(this["new"](entry_path));
      }
      return entries;
    };

    FileSystemObject.prototype.childrenAll = function(callback) {
      if (callback != null) {
        return this.readdirAll((function(_this) {
          return function(err, entry_paths) {
            var entries, entry_path, len4, m;
            if (err != null) {
              return callback(err);
            } else {
              entries = [];
              for (m = 0, len4 = entry_paths.length; m < len4; m++) {
                entry_path = entry_paths[m];
                entries.push(_this["new"](entry_path));
              }
              return callback(void 0, entries);
            }
          };
        })(this));
      } else {
        return this.readdirAll().then((function(_this) {
          return function(arg) {
            var entries, entry_path, entry_paths, len4, m;
            entry_paths = arg[0];
            entries = [];
            for (m = 0, len4 = entry_paths.length; m < len4; m++) {
              entry_path = entry_paths[m];
              entries.push(_this["new"](entry_path));
            }
            return entries;
          };
        })(this));
      }
    };

    FileSystemObject.prototype.childrenAllSync = function() {
      var entries, entry_path, entry_paths, len4, m;
      entry_paths = this.readdirAllSync();
      entries = [];
      for (m = 0, len4 = entry_paths.length; m < len4; m++) {
        entry_path = entry_paths[m];
        entries.push(this["new"](entry_path));
      }
      return entries;
    };

    return FileSystemObject;

  })();

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = new FileSystemObject(require('fs'), process.cwd());
  } else {
    this.FileSystemObject = FileSystemObject;
  }

}).call(this);
