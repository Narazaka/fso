/// <reference types="node" />

import * as fs from "fs";
import * as path from "path";

/** fs operation with the path, like Pathname(Ruby) */
export class FileSystemObject {
  /**
   * @param paths `path.resolve(...paths)`
   */
  constructor(...paths: string[]);

  readonly path: string;
  readonly fd: number | undefined;
  toString(): string;

  rename(newPath: string, callback: (err?: NodeJS.ErrnoException) => void): void;
  rename(newPath: string): Promise<void>;
  renameSync(newPath: string): void;
  truncate(callback: (err?: NodeJS.ErrnoException) => void): void;
  truncate(len: number, callback: (err?: NodeJS.ErrnoException) => void): void;
  truncate(len?: number): Promise<void>;
  truncateSync(len?: number): void;
  ftruncate(callback: (err?: NodeJS.ErrnoException) => void): void;
  ftruncate(len: number, callback: (err?: NodeJS.ErrnoException) => void): void;
  ftruncate(len?: number): Promise<void>;
  ftruncateSync(len?: number): void;
  chown(uid: number, gid: number, callback: (err?: NodeJS.ErrnoException) => void): void;
  chown(uid: number, gid: number): Promise<void>;
  chownSync(uid: number, gid: number): void;
  fchown(uid: number, gid: number, callback: (err?: NodeJS.ErrnoException) => void): void;
  fchown(uid: number, gid: number): Promise<void>;
  fchownSync(uid: number, gid: number): void;
  lchown(uid: number, gid: number, callback: (err?: NodeJS.ErrnoException) => void): void;
  lchown(uid: number, gid: number): Promise<void>;
  lchownSync(uid: number, gid: number): void;
  chmod(mode: number | string, callback: (err?: NodeJS.ErrnoException) => void): void;
  chmod(mode: number | string): Promise<void>;
  chmodSync(mode: number | string): void;
  fchmod(mode: number | string, callback: (err?: NodeJS.ErrnoException) => void): void;
  fchmod(mode: number | string): Promise<void>;
  fchmodSync(mode: number | string): void;
  lchmod(mode: number | string, callback: (err?: NodeJS.ErrnoException) => void): void;
  lchmod(mode: number | string): Promise<void>;
  lchmodSync(mode: number | string): void;
  stat(callback: (err: NodeJS.ErrnoException, stats: fs.Stats) => any): void;
  stat(): Promise<fs.Stats>;
  lstat(callback: (err: NodeJS.ErrnoException, stats: fs.Stats) => any): void;
  lstat(): Promise<fs.Stats>;
  fstat(callback: (err: NodeJS.ErrnoException, stats: fs.Stats) => any): void;
  fstat(): Promise<fs.Stats>;
  statSync(): fs.Stats;
  lstatSync(): fs.Stats;
  fstatSync(): fs.Stats;
  link(dstpath: string, callback: (err?: NodeJS.ErrnoException) => void): void;
  link(dstpath: string): Promise<void>;
  linkSync(dstpath: string): void;
  symlink(dstpath: string, type: string, callback: (err?: NodeJS.ErrnoException) => void): void;
  symlink(dstpath: string, callback: (err?: NodeJS.ErrnoException) => void): void;
  symlink(dstpath: string, type?: string): Promise<void>;
  symlinkSync(dstpath: string, type?: string): void;
  readlink(callback: (err: NodeJS.ErrnoException, linkString: string) => any): void;
  readlink(): Promise<string>;
  readlinkSync(): string;
  realpath(callback: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
  realpath(): Promise<string>;
  realpath(cache: { [path: string]: string }, callback: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
  realpath(cache: { [path: string]: string }): Promise<string>;
  realpathSync(cache?: { [path: string]: string }): string;
  unlink(callback: (err?: NodeJS.ErrnoException) => void): void;
  unlink(): Promise<void>;
  unlinkSync(): void;
  rmdir(callback: (err?: NodeJS.ErrnoException) => void): void;
  rmdir(): Promise<void>;
  rmdirSync(): void;
  mkdir(callback: (err?: NodeJS.ErrnoException) => void): void;
  mkdir(mode: number | string, callback: (err?: NodeJS.ErrnoException) => void): void;
  mkdir(mode?: number | string): Promise<void>;
  mkdirSync(mode?: number | string): void;
  readdir(callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
  readdir(): Promise<string[]>;
  readdirSync(): string[];
  close(callback: (err?: NodeJS.ErrnoException) => void): void;
  close(): Promise<void>;
  closeSync(): void;
  open(flags: string | number, callback: (err: NodeJS.ErrnoException, fd: number) => void): void;
  open(flags: string | number, mode: number, callback: (err: NodeJS.ErrnoException, fd: number) => void): void;
  open(flags: string | number, mode?: number): Promise<number>;
  openSync(flags: string | number, mode?: number): number;
  utimes(atime: number, mtime: number, callback: (err?: NodeJS.ErrnoException) => void): void;
  utimes(atime: Date, mtime: Date, callback: (err?: NodeJS.ErrnoException) => void): void;
  utimes(atime: number, mtime: number): Promise<void>;
  utimes(atime: Date, mtime: Date): Promise<void>;
  utimesSync(atime: number, mtime: number): void;
  utimesSync(atime: Date, mtime: Date): void;
  futimes(atime: number, mtime: number, callback: (err?: NodeJS.ErrnoException) => void): void;
  futimes(atime: Date, mtime: Date, callback: (err?: NodeJS.ErrnoException) => void): void;
  futimes(atime: number, mtime: number): Promise<void>;
  futimes(atime: Date, mtime: Date): Promise<void>;
  futimesSync(atime: number, mtime: number): void;
  futimesSync(atime: Date, mtime: Date): void;
  fsync(callback: (err?: NodeJS.ErrnoException) => void): void;
  fsync(): Promise<void>;
  fsyncSync(): void;
  write(buffer: Buffer, offset: number, length: number, position: number, callback: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
  write(buffer: Buffer, offset: number, length: number, callback: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
  write(data: any, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
  write(data: any, offset: number, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
  write(data: any, offset: number, encoding: string, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
  write(buffer: Buffer, offset: number, length: number, position?: number): Promise<number>;
  write(data: any, position?: number, enconding?: string): Promise<number>;
  writeSync(buffer: Buffer, offset: number, length: number, position?: number): number;
  writeSync(data: any, position?: number, enconding?: string): number;
  read(buffer: Buffer, offset: number, length: number, position: number, callback: (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => void): void;
  read(buffer: Buffer, offset: number, length: number, position: number): Promise<number>;
  readSync(buffer: Buffer, offset: number, length: number, position: number): number;
  readFile(encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
  readFile(options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
  readFile(options: { flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
  readFile(callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
  readFile(encoding: string): Promise<string>;
  readFile(options: { encoding: string; flag?: string; }): Promise<string>;
  readFile(options?: { flag?: string; }): Promise<Buffer>;
  readFileSync(encoding: string): string;
  readFileSync(options: { encoding: string; flag?: string; }): string;
  readFileSync(options?: { flag?: string; }): Buffer;
  writeFile(data: any, callback: (err: NodeJS.ErrnoException) => void): void;
  writeFile(data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback: (err: NodeJS.ErrnoException) => void): void;
  writeFile(data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback: (err: NodeJS.ErrnoException) => void): void;
  writeFile(data: any, options?: { encoding?: string; mode?: number; flag?: string; }): Promise<void>;
  writeFile(data: any, options?: { encoding?: string; mode?: string; flag?: string; }): Promise<void>;
  writeFileSync(data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
  writeFileSync(data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
  appendFile(data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback: (err: NodeJS.ErrnoException) => void): void;
  appendFile(data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback: (err: NodeJS.ErrnoException) => void): void;
  appendFile(data: any, callback: (err: NodeJS.ErrnoException) => void): void;
  appendFile(data: any, options?: { encoding?: string; mode?: number; flag?: string; }): Promise<void>;
  appendFile(data: any, options?: { encoding?: string; mode?: string; flag?: string; }): Promise<void>;
  appendFileSync(data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
  appendFileSync(data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
  watchFile(listener: (curr: fs.Stats, prev: fs.Stats) => void): void;
  watchFile(options: { persistent?: boolean; interval?: number; }, listener: (curr: fs.Stats, prev: fs.Stats) => void): void;
  unwatchFile(listener?: (curr: fs.Stats, prev: fs.Stats) => void): void;
  watch(listener?: (event: string, filename: string) => any): fs.FSWatcher;
  watch(encoding: string, listener?: (event: string, filename: string | Buffer) => any): fs.FSWatcher;
  watch(options: { persistent?: boolean; recursive?: boolean; encoding?: string }, listener?: (event: string, filename: string | Buffer) => any): fs.FSWatcher;
  exists(callback: (exists: boolean) => void): void;
  exists(): Promise<boolean>;
  existsSync(): boolean;
  access(callback: (err: NodeJS.ErrnoException) => void): void;
  access(mode: number, callback: (err: NodeJS.ErrnoException) => void): void;
  access(mode?: number): Promise<void>;
  accessSync(mode?: number): void;
  createReadStream(options?: {
    flags?: string;
    encoding?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    start?: number;
    end?: number;
  }): fs.ReadStream;
  createWriteStream(options?: {
    flags?: string;
    encoding?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    start?: number;
  }): fs.WriteStream;
  fdatasync(callback: Function): void;
  fdatasync(): Promise<void>;
  fdatasyncSync(): void;

  /** call stats' same name method */
  isFile(): Promise<boolean>;
  /** call stats' same name method */
  isFileSync(): boolean;
  /** call stats' same name method */
  isDirectory(): Promise<boolean>;
  /** call stats' same name method */
  isDirectorySync(): boolean;
  /** call stats' same name method */
  isBlockDevice(): Promise<boolean>;
  /** call stats' same name method */
  isBlockDeviceSync(): boolean;
  /** call stats' same name method */
  isCharacterDevice(): Promise<boolean>;
  /** call stats' same name method */
  isCharacterDeviceSync(): boolean;
  /** call stats' same name method */
  isSymbolicLink(): Promise<boolean>;
  /** call stats' same name method */
  isSymbolicLinkSync(): boolean;
  /** call stats' same name method */
  isFIFO(): Promise<boolean>;
  /** call stats' same name method */
  isFIFOSync(): boolean;
  /** call stats' same name method */
  isSocket(): Promise<boolean>;
  /** call stats' same name method */
  isSocketSync(): boolean;

  /** like mkdir -p */
  mkdirAll(callback: (err?: NodeJS.ErrnoException) => void): void;
  /** like mkdir -p */
  mkdirAll(mode: number | string, callback: (err?: NodeJS.ErrnoException) => void): void;
  /** like mkdir -p */
  mkdirAll(mode?: number | string): Promise<void>;
  /** like mkdir -p */
  mkdirAllSync(mode?: number | string): void;
  /** like mkdir -p */
  mkdirp(callback: (err?: NodeJS.ErrnoException) => void): void;
  /** like mkdir -p */
  mkdirp(mode: number | string, callback: (err?: NodeJS.ErrnoException) => void): void;
  /** like mkdir -p */
  mkdirp(mode?: number | string): Promise<void>;
  /** like mkdir -p */
  mkdirpSync(mode?: number | string): void;
  /** like mkdir -p */
  mkpath(callback: (err?: NodeJS.ErrnoException) => void): void;
  /** like mkdir -p */
  mkpath(mode: number | string, callback: (err?: NodeJS.ErrnoException) => void): void;
  /** like mkdir -p */
  mkpath(mode?: number | string): Promise<void>;
  /** like mkdir -p */
  mkpathSync(mode?: number | string): void;
  /** like rm -rf */
  rmAll(callback: (err?: NodeJS.ErrnoException) => void): void;
  /** like rm -rf */
  rmAll(): Promise<void>;
  /** like rm -rf */
  rmAllSync(): void;
  /** like ls -R */
  readdirAll(callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
  /** like ls -R */
  readdirAll(): Promise<string[]>;
  /** like ls -R */
  readdirAllSync(): string[];
  mergeDirectory(source: FileSystemObject, callback: (err?: NodeJS.ErrnoException) => void): void;
  mergeDirectory(source: FileSystemObject): Promise<void>;
  mergeDirectorySync(source: FileSystemObject): void;
  filteredMergeDirectory(source: FileSystemObject, excepts: string[] | ((path: FileSystemObject, callback: (err: Error | undefined | null, condition: boolean) => void) => void) | undefined, callback: (err?: NodeJS.ErrnoException) => void): void;
  filteredMergeDirectory(source: FileSystemObject, excepts?: string[] | ((path: FileSystemObject) => Promise<boolean>)): Promise<void>;
  filteredMergeDirectorySync(source: FileSystemObject, excepts?: string[] | ((path: FileSystemObject) => boolean)): void;
  isChildOf(to: string | FileSystemObject): boolean;
  isParentOf(to: string | FileSystemObject): boolean;

  delimiter: string;
  sep: string;
  static format(pathObject: path.ParsedPath): FileSystemObject;
  parse(): path.ParsedPath;
  normalize(): FileSystemObject;
  basename(ext?: string): FileSystemObject;
  dirname(): FileSystemObject;
  extname(): string;
  isAbsolute(): boolean;
  relative(to: string | FileSystemObject): FileSystemObject;
  resolve(...paths: (string | FileSystemObject)[]): FileSystemObject;

  new(...paths: string[]): FileSystemObject;
  join(...paths: string[]): FileSystemObject;
  parent(): FileSystemObject;
  children(callback: (err: NodeJS.ErrnoException, children: FileSystemObject[]) => void): void;
  children(): Promise<FileSystemObject[]>;
  childrenSync(): FileSystemObject[];
  filteredChildren(excepts: string[] | ((path: FileSystemObject, callback: (err: Error | undefined | null, condition: boolean) => void) => void) | undefined, callback: (err: NodeJS.ErrnoException, children: FileSystemObject[]) => void): void;
  filteredChildren(excepts?: string[] | ((path: FileSystemObject) => Promise<boolean>)): Promise<FileSystemObject[]>;
  filteredChildrenSync(excepts?: string[] | ((path: FileSystemObject) => boolean)): FileSystemObject[];
  childrenAll(callback: (err: NodeJS.ErrnoException, children: FileSystemObject[]) => void): void;
  childrenAll(): Promise<FileSystemObject[]>;
  childrenAllSync(): FileSystemObject[];
  filteredChildrenAll(excepts: string[] | ((path: FileSystemObject, callback: (err: Error | undefined | null, condition: boolean) => void) => void) | undefined, callback: (err: NodeJS.ErrnoException, children: FileSystemObject[]) => void): void;
  filteredChildrenAll(excepts?: string[] | ((path: FileSystemObject) => Promise<boolean>)): Promise<FileSystemObject[]>;
  filteredChildrenAllSync(excepts?: string[] | ((path: FileSystemObject) => boolean)): FileSystemObject[];
}

export const FSO: typeof FileSystemObject;

declare const fso: FileSystemObject;

/** fso - fs operation with the path, like Pathname(Ruby) */
export default fso;
