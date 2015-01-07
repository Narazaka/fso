if require?
	chai = require 'chai'
else
	chai = @chai
chai.should()
expect = chai.expect
if require?
	unless Promise?
		Promise = require 'bluebird'
	sinon = require 'sinon'
	fs = require 'fs'
#	mock = require 'mock-fs'
	fso = require '../fso.js'
else
	unless Promise?
		Promise = @Promise
	sinon = @sinon
	fs = @fs
	FileSystemObject = @FileSystemObject
	fso = new FileSystemObject fs, process.cwd()

hierarchy =
	'cwdfile': 'cwdfile'
	'dir':
		'dirfile': 'dirfile'
		'dirfile2': 'dirfile2'
		'dir2':
			'dir2file': 'dir2file'
			'dir2file2': 'dir2file2'
		'dir22':
			'dir22file': 'dir22file'
			'dir22file2': 'dir22file2'
	'dir1':
		'dir1file1': 'dir1file1'
		'dir1file2': 'dir1file2'

single_path_methods = ['truncate', 'chown', 'lchown', 'chmod', 'lchmod', 'stat', 'lstat', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'readdir', 'utimes', 'readFile', 'writeFile', 'appendFile', 'exists']
single_path_methods_nosync = ['createReadStream', 'createWriteStream']
current_new_path_methods = ['rename', 'link', 'symlink']
fd_methods = ['ftruncate', 'fchown', 'fchmod', 'fstat', 'write', 'read']

describe 'single_path_methods', ->
	beforeEach ->
		for method in single_path_methods
			sinon.stub fs, method
			sinon.stub fs, method + 'Sync'
	afterEach ->
		for method in single_path_methods
			fs[method].restore()
			fs[method + 'Sync'].restore()
	it 'should do like fs', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1, (->)]
		for method in single_path_methods
			file[method] args...
			fs[method].firstCall.calledWithExactly file.path, args...
			.should.be.true
	it 'should do like fs Promise', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1]
		for method in single_path_methods
			file[method] args...
			fs[method].firstCall.calledWithExactly file.path, args..., fs[method].firstCall.args[fs[method].firstCall.args.length - 1]
			.should.be.true
	it 'should do like fs Sync', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1, (->)]
		for method in single_path_methods
			file[method + 'Sync'] args...
			fs[method + 'Sync'].firstCall.calledWithExactly file.path, args...
			.should.be.true

describe 'single_path_methods_nosync', ->
	beforeEach ->
		for method in single_path_methods_nosync
			sinon.stub fs, method
	afterEach ->
		for method in single_path_methods_nosync
			fs[method].restore()
	it 'should do like fs Sync', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1, (->)]
		for method in single_path_methods_nosync
			file[method] args...
			fs[method].firstCall.calledWithExactly file.path, args...
			.should.be.true

describe 'current_new_path_methods', ->
	beforeEach ->
		for method in current_new_path_methods
			sinon.stub fs, method
			sinon.stub fs, method + 'Sync'
	afterEach ->
		for method in current_new_path_methods
			fs[method].restore()
			fs[method + 'Sync'].restore()
	it 'should do like fs', ->
		filename = '/file'
		newfilename = '/newfile'
		file = fso.new filename
		newfile = fso.new newfilename
		args = [newfile.path, 'a', 'b', [], 100, -1, (->)]
		for method in current_new_path_methods
			file[method] args...
			fs[method].firstCall.calledWithExactly file.path, args...
			.should.be.true
	it 'should do like fs Promise', ->
		filename = '/file'
		newfilename = '/newfile'
		file = fso.new filename
		newfile = fso.new newfilename
		args = [newfile.path, 'a', 'b', [], 100, -1]
		for method in current_new_path_methods
			file[method] args...
			fs[method].firstCall.calledWithExactly file.path, args..., fs[method].firstCall.args[fs[method].firstCall.args.length - 1]
			.should.be.true
	it 'should do like fs Sync', ->
		filename = '/file'
		newfilename = '/newfile'
		file = fso.new filename
		newfile = fso.new newfilename
		args = [newfile.path, 'a', 'b', [], 100, -1, (->)]
		for method in current_new_path_methods
			file[method + 'Sync'] args...
			fs[method + 'Sync'].firstCall.calledWithExactly file.path, args...
			.should.be.true

describe 'open', ->
	method = 'open'
	fd = 111
	beforeEach ->
		sinon.stub fs, method, (args..., callback) -> callback(null, fd)
		sinon.stub fs, method + 'Sync', -> fd
	afterEach ->
		fs[method].restore()
		fs[method + 'Sync'].restore()
	it 'should do like fs and store fd', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1]
		callback = sinon.spy()
		file[method] args..., callback
		fs[method].firstCall.calledWithExactly file.path, args..., fs[method].firstCall.args[fs[method].firstCall.args.length - 1]
		.should.be.true
		callback.firstCall.calledWithExactly null, fd
		.should.be.true
		file.fd.should.be.equals fd
	it 'should do like fs and store fd Promise', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1]
		file[method] args...
		fs[method].firstCall.calledWithExactly file.path, args..., fs[method].firstCall.args[fs[method].firstCall.args.length - 1]
		.should.be.true
		file.fd.should.be.equals fd
	it 'should do like fs and store fd Sync', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1]
		file[method + 'Sync'] args...
		fs[method + 'Sync'].firstCall.calledWithExactly file.path, args...
		.should.be.true
		file.fd.should.be.equals fd

describe 'fd_methods', ->
	fd = 111
	beforeEach ->
		for method in fd_methods
			sinon.stub fs, method
			sinon.stub fs, method + 'Sync'
		sinon.stub fs, 'openSync', -> fd
	afterEach ->
		for method in fd_methods
			fs[method].restore()
			fs[method + 'Sync'].restore()
		fs['openSync'].restore()
	it 'should do like fs', ->
		filename = '/file'
		file = fso.new filename
		file.openSync()
		args = ['a', 'b', [], 100, -1, (->)]
		for method in fd_methods
			file[method] args...
			fs[method].firstCall.calledWithExactly fd, args...
			.should.be.true
	it 'should do like fs Promise', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1]
		file.openSync()
		for method in fd_methods
			file[method] args...
			fs[method].firstCall.calledWithExactly fd, args..., fs[method].firstCall.args[fs[method].firstCall.args.length - 1]
			.should.be.true
	it 'should do like fs Sync', ->
		filename = '/file'
		file = fso.new filename
		args = ['a', 'b', [], 100, -1, (->)]
		file.openSync()
		for method in fd_methods
			file[method + 'Sync'] args...
			fs[method + 'Sync'].firstCall.calledWithExactly fd, args...
			.should.be.true

###
describe 'objective', ->
	beforeEach ->
		mock hierarchy
	afterEach ->
		mock.restore()
	it 'should do like fs Sync', ->
		filename = 'cwdfile'
#		file = fso.new filename

cwdfile = fso.new 'cwdfile'
console.log cwdfile.readFileSync 'utf8'
dir = fso.new 'dir'
console.log dir.readdirSync()
dir.readdir (err, files) -> console.log files
dir.new('../dir1').children()
.then (children) ->
	for child in children
		console.log child.path
###
