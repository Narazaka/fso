import fs from "fs";
import path from "path";

const singlePathMethods = [
  "access",
  "appendFile",
  "chmod",
  "chown",
  "exists",
  "lchmod",
  "lchown",
  "lstat",
  "mkdir",
  "readdir",
  "readFile",
  "readlink",
  "realpath",
  "rmdir",
  "stat",
  "truncate",
  "unlink",
  "utimes",
  "writeFile",
];
const singlePathSyncMethods = [
  "createReadStream",
  "createWriteStream",
  "unwatchFile",
  "watch",
  "watchFile",
];
const currentNewPathMethods = [
  "link",
  "rename",
  "symlink",
];
const fdMethods = [
  "fchmod",
  "fchown",
  "fdatasync",
  "fstat",
  "fsync",
  "ftruncate",
  "futimes",
];
const fdMultiReturnMethods = [
  "read",
  "write",
];
const statsMethods = [
  "isFile",
  "isDirectory",
  "isBlockDevice",
  "isCharacterDevice",
  "isSymbolicLink",
  "isFIFO",
  "isSocket",
];

export class FileSystemObject {
  constructor(...paths) {
    this.path = path.join(...paths);
  }

  toString() {
    return this.path;
  }

  // fs methods

  open(...args) {
    if (args[args.length - 1] instanceof Function) {
      const callback = args.pop();
      fs.open(this.path, ...args, (error, fd) => {
        this.fd = fd;
        callback(error, fd);
      });
    } else {
      return new Promise((resolve, reject) => {
        fs.open(this.path, ...args, (error, fd) => {
          this.fd = fd;
          error == null ? resolve(fd) : reject(error);
        });
      });
    }
  }

  openSync(...args) {
    return (this.fd = fs.openSync(this.path, ...args));
  }

  close(callback) {
    if (callback) {
      fs.close(this.fd, (error) => {
        if (error == null) delete this.fd;
        callback(error);
      });
    } else {
      return new Promise((resolve, reject) =>
        fs.close(this.fd, (error) => {
          if (error == null) {
            delete this.fd;
            resolve();
          } else {
            reject(error);
          }
        })
      );
    }
  }

  closeSync() {
    fs.closeSync(this.fd);
    delete this.fd;
  }

  // convenient additions

  async mkdirp(...args) {
    if (args[args.length - 1] instanceof Function) {
      const callback = args.pop();
      try {
        await FileSystemObject._mkdirRecursive(this, ...args);
      } catch (error) {
        callback(error);
        return;
      }
      callback();
    } else {
      return FileSystemObject._mkdirRecursive(this, ...args);
    }
  }

  static async _mkdirRecursive(dir, ...args) {
    try {
      await dir.lstat();
    } catch (error) {
      await FileSystemObject._mkdirRecursive(dir.parent());
      await dir.mkdir(...args);
    }
  }

  mkdirpSync(...args) {
    return FileSystemObject._mkdirRecursiveSync(this, ...args);
  }

  static _mkdirRecursiveSync(dir, ...args) {
    try {
      dir.statSync();
    } catch (error) {
      FileSystemObject._mkdirRecursiveSync(dir.parent());
      dir.mkdirSync(...args);
    }
  }

  mkpath(...args) {
    return this.mkdirp(...args);
  }

  mkpathSync(...args) {
    return this.mkdirpSync(...args);
  }

  mkdirAll(...args) {
    return this.mkdirp(...args);
  }

  mkdirAllSync(...args) {
    return this.mkdirpSync(...args);
  }

  async readdirAll(callback) {
    if (callback) {
      let children;
      try {
        children = (await this.childrenAll()).map((child) => this.relative(child).toString());
      } catch (error) {
        callback(error);
        return;
      }
      callback(undefined, children);
    } else {
      return (await this.childrenAll()).map((child) => this.relative(child).toString());
    }
  }

  readdirAllSync() {
    return this.childrenAllSync().map((child) => this.relative(child).toString());
  }

  async rmAll(callback) {
    try {
      for (const child of (await this.childrenAll()).reverse()) {
        if (await child.isDirectory()) {
          await child.rmdir();
        } else {
          await child.unlink();
        }
      }
    } catch (error) {
      if (callback) {
        callback(error);
        return;
      }
      throw error;
    }
    if (callback) callback();
  }

  rmAllSync() {
    for (const child of this.childrenAllSync()) {
      if (child.isDirectorySync()) {
        child.rmdirSync();
      } else {
        child.unlinkSync();
      }
    }
  }

  rmtree(callback) {
    return this.rmAll(callback);
  }

  rmtreeSync() {
    return this.rmAllSync();
  }

  isChildOf(to) {
    return path.relative(this.path, to.toString()).startsWith("..");
  }

  // path methods

  get delimiter() {
    return path.delimiter;
  }

  get sep() {
    return path.sep;
  }

  static format(pathObject) {
    return new FileSystemObject(path.format(pathObject));
  }

  parse() {
    return path.parse(this.path);
  }

  normalize() {
    return this;
  }

  basename() {
    return new FileSystemObject(path.basename(this.path));
  }

  dirname() {
    return this.parent();
  }

  extname() {
    return path.extname(this.path);
  }

  isAbsolute() {
    return path.isAbsolute(this.path);
  }

  relative(to) {
    return new FileSystemObject(path.relative(this.path, to.toString()));
  }

  resolve(...paths) {
    return new FileSystemObject(path.resolve(...paths.map((_path) => _path.toString()).concat([this.path])));
  }

  // objective methods

  new(...paths) {
    return new FileSystemObject(path.join(this.path, ...paths));
  }

  join(...paths) {
    return this.new(...paths);
  }

  parent() {
    return new FileSystemObject(path.dirname(this.path));
  }

  async children(callback) {
    if (callback) {
      let children;
      try {
        children = (await this.readdir()).map((entryPath) => this.new(entryPath));
      } catch (error) {
        callback(error);
        return;
      }
      callback(undefined, children);
    } else {
      return (await this.readdir()).map((entryPath) => this.new(entryPath));
    }
  }

  childrenSync() {
    return this.readdirSync().map((entryPath) => this.new(entryPath));
  }

  async childrenAll(callback) {
    if (callback) {
      let children;
      try {
        children = await FileSystemObject._childrenRecursive(this);
      } catch (error) {
        callback(error);
        return;
      }
      callback(undefined, children);
    } else {
      return FileSystemObject._childrenRecursive(this);
    }
  }

  static async _childrenRecursive(dir) {
    const children = await dir.children();
    const childrenChildren = await Promise.all(children.map(async (child) =>
      await child.isDirectory() ? [child].concat(FileSystemObject._childrenRecursive(child)) : [child]
    ));
    return childrenChildren.reduce((flat, childChildren) => flat.concat(childChildren), []);
  }

  childrenAllSync() {
    return FileSystemObject._childrenRecursiveSync(this);
  }

  static _childrenRecursiveSync(dir) {
    const children = dir.childrenSync();
    const childrenChildren = children.map((child) =>
      child.isDirectorySync() ? [child].concat(FileSystemObject._childrenRecursiveSync(child)) : [child]
    );
    return childrenChildren.reduce((flat, childChildren) => flat.concat(childChildren), []);
  }
}

for (const _method of singlePathMethods) {
  FileSystemObject.prototype[_method] = (function(method) {
    return function(...args) {
      if (args[args.length - 1] instanceof Function) {
        fs[method](this.path, ...args);
      } else {
        return new Promise((resolve, reject) =>
          fs[method](this.path, ...args, (error, result) =>
            error == null ? resolve(result) : reject(error)
          )
        );
      }
    };
  })(_method);
  FileSystemObject.prototype[`${_method}Sync`] = (function(methodSync) {
    return function(...args) {
      return fs[methodSync](this.path, ...args);
    };
  })(`${_method}Sync`);
}

for (const _method of singlePathSyncMethods) {
  FileSystemObject.prototype[_method] = (function(method) {
    return function(...args) {
      return fs[method](this.path, ...args);
    };
  })(_method);
}

for (const _method of currentNewPathMethods) {
  FileSystemObject.prototype[_method] = (function(method) {
    return function(newPath, ...args) {
      const currentPath = this.path;
      const _newPath = path.resolve(path.dirname(this.path), newPath);
      if (args[args.length - 1] instanceof Function) {
        fs[method](currentPath, _newPath, ...args);
      } else {
        return new Promise((resolve, reject) =>
          fs[method](currentPath, _newPath, ...args, (error, result) =>
            error == null ? resolve(result) : reject(error)
          )
        );
      }
    };
  })(_method);
  FileSystemObject.prototype[`${_method}Sync`] = (function(methodSync) {
    return function(newPath, ...args) {
      const currentPath = this.path;
      const _newPath = path.resolve(path.dirname(this.path), newPath);
      return fs[methodSync](currentPath, _newPath, ...args);
    };
  })(`${_method}Sync`);
}

for (const _method of fdMethods) {
  FileSystemObject.prototype[_method] = (function(method) {
    return function(...args) {
      if (args[args.length - 1] instanceof Function) {
        fs[method](this.fd, ...args);
      } else {
        return new Promise((resolve, reject) =>
          fs[method](this.fd, ...args, (error, result) =>
            error == null ? resolve(result) : reject(error)
          )
        );
      }
    };
  })(_method);
  FileSystemObject.prototype[`${_method}Sync`] = (function(methodSync) {
    return function(...args) {
      return fs[methodSync](this.fd, ...args);
    };
  })(`${_method}Sync`);
}

for (const _method of fdMultiReturnMethods) {
  FileSystemObject.prototype[_method] = (function(method) {
    return function(...args) {
      if (args[args.length - 1] instanceof Function) {
        fs[method](this.fd, ...args);
      } else {
        return new Promise((resolve, reject) =>
          fs[method](this.fd, ...args, (error, length) =>
            error == null ? resolve(length) : reject(error)
          )
        );
      }
    };
  })(_method);
  FileSystemObject.prototype[`${_method}Sync`] = (function(methodSync) {
    return function(...args) {
      return fs[methodSync](this.fd, ...args);
    };
  })(`${_method}Sync`);
}

for (const _method of statsMethods) {
  FileSystemObject.prototype[_method] = (function(method) {
    return function(callback) {
      if (callback) {
        this.lstat().then(
          (stats) => callback(undefined, stats[method]()),
          (error) => callback(error)
        );
      } else {
        return this.lstat().then(
          (stats) => stats[method]()
        );
      }
    };
  })(_method);
  FileSystemObject.prototype[`${_method}Sync`] = (function(method) {
    return function() {
      return this.lstatSync()[method]();
    };
  })(_method);
}

export default new FileSystemObject(process.cwd());
