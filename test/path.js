const assert = require("power-assert");
const path = require("path");
const {FileSystemObject} = require("../src/lib/fso");

describe("FileSystemObject", () => {
  it("#constructor", () => {
    const entry = "a/../b/./c";
    const entryFso = new FileSystemObject(entry);
    assert(entryFso.toString(), path.normalize(entry));
  });
  it("#delimiter", () => {
    assert(new FileSystemObject("a").delimiter === path.delimiter);
  });
  it("#sep", () => {
    assert(new FileSystemObject("a").sep === path.sep);
  });
  it("#parse", () => {
    const entry = "a/b.txt";
    assert.deepEqual(new FileSystemObject(entry).parse(), path.parse(entry));
  });
  it("#normalize", () => {
    const entry = "a/../b/./c.txt";
    const entryFso = new FileSystemObject(entry);
    assert(entryFso.normalize().toString() === path.normalize(entry));
  });
  for (const _method of ["basename", "dirname", "extname"]) {
    (function(method) {
      it(`#${method}`, () => {
        const entry = path.normalize("a/b/c.txt");
        const entryFso = new FileSystemObject(entry);
        assert(entryFso[method]().toString() === path[method](entry));
      });
    })(_method);
  }
  it("#isAbsolute", () => {
    const entry1 = "a/../b/./c.txt";
    const entry2 = "/a/c/d";
    assert(new FileSystemObject(entry1).isAbsolute() === path.isAbsolute(entry1));
    assert(new FileSystemObject(entry2).isAbsolute() === path.isAbsolute(entry2));
  });
  it("#relative", () => {
    const entry1 = "a/b/c.txt";
    const entry2 = "a/c/d";
    assert(new FileSystemObject(entry1).relative(entry2).toString() === path.relative(entry1, entry2));
    assert(
      new FileSystemObject(entry1).relative(new FileSystemObject(entry2)).toString() === path.relative(entry1, entry2)
    );
  });
  it("#resolve", () => {
    const entry1 = "a/b/c.txt";
    const entry2 = "a/c/d";
    assert(new FileSystemObject(entry1).resolve(entry2).toString() === path.resolve(entry2, entry1));
    assert(
      new FileSystemObject(entry1).resolve(new FileSystemObject(entry2)).toString() === path.resolve(entry2, entry1)
    );
  });
});
