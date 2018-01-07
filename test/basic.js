import sinon from "sinon";
import assert from "power-assert";
import fs from "fs";
import fso from "../src/lib/fso";

const singlePathMethods = [
  "access",
  "appendFile",
  "chmod",
  "chown",
  "exists",
  // "lchmod", // only Mac
  // "lchown", // only Mac
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
const fdMethodsAndfdMultiReturnMethods = fdMethods.concat(fdMultiReturnMethods);

/* const statsMethods = [
  "isFile",
  "isDirectory",
  "isBlockDevice",
  "isCharacterDevice",
  "isSymbolicLink",
  "isFIFO",
  "isSocket",
]; */

const helper = {
  stubEach(methods, sync = true) {
    for (const method of methods) {
      sinon.stub(fs, method);
      if (sync) sinon.stub(fs, `${method}Sync`);
    }
  },
  restoreEach(methods, sync = true) {
    for (const method of methods) {
      fs[method].restore();
      if (sync) fs[`${method}Sync`].restore();
    }
  },
  asyncMethodsTest(methods) {
    const filename = "/file";
    const file = fso.new(filename);
    const args = ["a", "b", [], 100, -1, () => ""];
    for (const method of methods) {
      file[method](...args);
      assert(fs[method].firstCall.calledWithExactly(file.path, ...args));
    }
  },
  promiseMethodsTest(methods) {
    const filename = "/file";
    const file = fso.new(filename);
    const args = ["a", "b", [], 100, -1];
    for (const method of methods) {
      file[method](...args);
      const firstCall = fs[method].firstCall;
      assert(firstCall.calledWithExactly(file.path, ...args, firstCall.args[firstCall.args.length - 1]));
    }
  },
  syncMethodsTest(methods) {
    const filename = "/file";
    const file = fso.new(filename);
    const args = ["a", "b", [], 100, -1, () => ""];
    for (const method of methods) {
      file[`${method}Sync`](...args);
      assert(fs[`${method}Sync`].firstCall.calledWithExactly(file.path, ...args));
    }
  },
};

describe("singlePathMethods", () => {
  beforeEach(() => helper.stubEach(singlePathMethods));
  afterEach(() => helper.restoreEach(singlePathMethods));
  it("should do like fs", () => helper.asyncMethodsTest(singlePathMethods));
  it("should do like fs Promise", () => helper.promiseMethodsTest(singlePathMethods));
  it("should do like fs Sync", () => helper.syncMethodsTest(singlePathMethods));
});

describe("singlePathSyncMethods", () => {
  beforeEach(() => helper.stubEach(singlePathSyncMethods, false));
  afterEach(() => helper.restoreEach(singlePathSyncMethods, false));
  it("should do like fs Sync", () => helper.asyncMethodsTest(singlePathSyncMethods));
});

describe("current_new_path_methods", () => {
  beforeEach(() => helper.stubEach(currentNewPathMethods));
  afterEach(() => helper.restoreEach(currentNewPathMethods));
  it("should do like fs", () => {
    const filename = "/file";
    const newfilename = "/newfile";
    const file = fso.new(filename);
    const newfile = fso.new(newfilename);
    const args = [newfile.path, "a", "b", [], 100, -1, () => ""];
    for (const method of currentNewPathMethods) {
      file[method](...args);
      assert(fs[method].firstCall.calledWithExactly(file.path, ...args));
    }
  });
  it("should do like fs Promise", () => {
    const filename = "/file";
    const newfilename = "/newfile";
    const file = fso.new(filename);
    const newfile = fso.new(newfilename);
    const args = [newfile.path, "a", "b", [], 100, -1];
    for (const method of currentNewPathMethods) {
      file[method](...args);
      const firstCall = fs[method].firstCall;
      assert(firstCall.calledWithExactly(file.path, ...args, firstCall.args[firstCall.args.length - 1]));
    }
  });
  it("should do like fs Sync", () => {
    const filename = "/file";
    const newfilename = "/newfile";
    const file = fso.new(filename);
    const newfile = fso.new(newfilename);
    const args = [newfile.path, "a", "b", [], 100, -1, () => ""];
    for (const method of currentNewPathMethods) {
      file[`${method}Sync`](...args);
      assert(fs[`${method}Sync`].firstCall.calledWithExactly(file.path, ...args));
    }
  });
});

describe("fdMethods + fdMultiReturnMethods", () => {
  const fd = 111;
  beforeEach(() => {
    helper.stubEach(fdMethodsAndfdMultiReturnMethods);
    sinon.stub(fs, "openSync").callsFake(() => fd);
  });
  afterEach(() => {
    helper.restoreEach(fdMethodsAndfdMultiReturnMethods);
    fs.openSync.restore();
  });
  it("should do like fs", () => {
    const filename = "/file";
    const file = fso.new(filename);
    file.openSync();
    const args = ["a", "b", [], 100, -1, () => ""];
    for (const method of fdMethodsAndfdMultiReturnMethods) {
      file[method](...args);
      assert(fs[method].firstCall.calledWithExactly(fd, ...args));
    }
  });
  it("should do like fs Promise", () => {
    const filename = "/file";
    const file = fso.new(filename);
    file.openSync();
    const args = ["a", "b", [], 100, -1];
    for (const method of fdMethodsAndfdMultiReturnMethods) {
      file[method](...args);
      const firstCall = fs[method].firstCall;
      assert(firstCall.calledWithExactly(fd, ...args, firstCall.args[firstCall.args.length - 1]));
    }
  });
  it("should do like fs Sync", () => {
    const filename = "/file";
    const file = fso.new(filename);
    file.openSync();
    const args = ["a", "b", [], 100, -1, () => ""];
    for (const method of fdMethodsAndfdMultiReturnMethods) {
      file[`${method}Sync`](...args);
      assert(fs[`${method}Sync`].firstCall.calledWithExactly(fd, ...args));
    }
  });
});

describe("open", () => {
  const method = "open";
  const fd = 111;
  beforeEach(() => {
    sinon.stub(fs, method).callsFake((...args) => args[args.length - 1](undefined, fd));
    sinon.stub(fs, `${method}Sync`).callsFake(() => fd);
  });
  afterEach(() => {
    fs[method].restore();
    return fs[`${method}Sync`].restore();
  });
  it("should do like fs and store fd", () => {
    const filename = "/file";
    const file = fso.new(filename);
    const args = ["a", "b", [], 100, -1];
    const callback = sinon.spy();
    file[method](...args, callback);
    const firstCall = fs[method].firstCall;
    assert(firstCall.calledWithExactly(file.path, ...args, firstCall.args[firstCall.args.length - 1]));
    assert(callback.firstCall.calledWithExactly(undefined, fd));
    assert(file.fd === fd);
  });
  it("should do like fs and store fd Promise", () => {
    const filename = "/file";
    const file = fso.new(filename);
    const args = ["a", "b", [], 100, -1];
    file[method](...args);
    const firstCall = fs[method].firstCall;
    assert(firstCall.calledWithExactly(file.path, ...args, firstCall.args[firstCall.args.length - 1]));
    assert(file.fd === fd);
  });
  return it("should do like fs and store fd Sync", () => {
    const filename = "/file";
    const file = fso.new(filename);
    const args = ["a", "b", [], 100, -1];
    file[`${method}Sync`](...args);
    assert(fs[`${method}Sync`].firstCall.calledWithExactly(file.path, ...args));
    assert(file.fd === fd);
  });
});
