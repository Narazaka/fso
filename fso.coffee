### (C) 2014 Narazaka : Licensed under The MIT License - http://narazaka.net/license/MIT?2014 ###

path = @path
Promise = @Promise
if require?
	path ?= require 'path'
	Promise ?= require 'bluebird'

class FileSystemObject
	constructor: (@fs, newPath) ->
		@path = path.resolve newPath
		@_path = path.resolve newPath
	single_path_methods = ['truncate', 'chown', 'lchown', 'chmod', 'lchmod', 'stat', 'lstat', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'readdir', 'utimes', 'readFile', 'writeFile', 'appendFile', 'exists']
	single_path_methods_nosync = ['createReadStream', 'createWriteStream']
	current_new_path_methods = ['rename', 'link', 'symlink']
	fd_methods = ['ftruncate', 'fchown', 'fchmod', 'fstat', 'write', 'read']
#	listener_methods = ['watchFile', 'unwatchFile', 'watch']
	for method in single_path_methods
		@::[method] = ((method) ->
			(args..., callback) ->
				if callback?
					@fs[method] @path, args..., callback
				else
					new Promise (resolve, reject) =>
						@fs[method] @path, args..., (err, args...) ->
							if err? then reject err else resolve args
		)(method)
		@::[method + 'Sync'] = ((methodSync) ->
			(args...) ->
				@fs[methodSync] @path, args...
		)(method + 'Sync')
	for method in single_path_methods_nosync
		@::[method] = ((method) ->
			(args..., callback) ->
				if callback?
					@fs[method] @path, args..., callback
				else
					new Promise (resolve, reject) =>
						@fs[method] @path, args..., (err, args...) ->
							if err? then reject err else resolve args
		)(method)
	for method in current_new_path_methods
		@::[method] = ((method) ->
			(newPath, args..., callback) ->
				current_path = @path
				new_path = path.resolve path.dirname(@path), newPath
				if callback?
					@fs[method] current_path, new_path, args..., callback
				else
					new Promise (resolve, reject) =>
						@fs[method] current_path, new_path, args..., (err, args...) ->
							if err? then reject err else resolve args
		)(method)
		@::[method + 'Sync'] = ((methodSync) ->
			(args...) ->
				current_path = @path
				new_path = path.resolve path.dirname(@path), newPath
				@fs[methodSync] current_path, new_path, args...
		)(method + 'Sync')
	for method in fd_methods
		@::[method] = ((method) ->
			(args..., callback) ->
				if callback?
					@fs[method] @fd, args..., callback
				else
					new Promise (resolve, reject) =>
						@fs[method] @fd, args..., (err, args...) ->
							if err? then reject err else resolve args
		)(method)
		@::[method + 'Sync'] = ((methodSync) ->
			(args...) ->
				@fs[methodSync] @fd, args...
		)(method + 'Sync')
	open: (args..., callback) ->
		if callback?
			@fs.open @path, args..., (err, fd) =>
				@fd = fd
				callback err, fd
		else
			new Promise (resolve, reject) =>
				@fs.open @path, args..., (err, fd) =>
					@fd = fd
					if err? then reject err else resolve [fd]
	openSync: (args...) ->
		@fd = @fs.openSync @path, args...
	close: (callback) ->
		if callback?
			@fs.close @fd, (err) =>
				unless err? then delete @fd
				callback err
		else
			new Promise (resolve, reject) =>
				@fs.close @fd, (err) =>
					if err?
						reject err
					else
						delete @fd
						resolve []
	closeSync: () ->
		ret = @fs.closeSync @fd
		delete @fd
		ret
	# convenient addition
	mkdirp: (args..., callback) ->
		if callback?
			mkdir = (dir, callback) =>
				fs.stat dir, (err) =>
					if err?
						mkdir path.dirname(dir), (err) =>
							if err? then callback err
							else @fs.mkdir dir, args..., callback
					else callback()
			mkdir @path, callback
		else
			mkdir = (dir) =>
				new Promise (resolve, reject) =>
					fs.stat dir, (err) =>
						if err?
							mkdir path.dirname(dir)
							.then =>
								@fs.mkdir dir, args..., (err) ->
									if err? then reject err else resolve []
						else resolve []
			mkdir @path
	mkdirpSync: (args...) ->
		mkdirSync = (dir) =>
			try
				fs.statSync dir
			catch
				mkdirSync path.dirname(dir)
				@fs.mkdirSync dir, args...
		mkdirSync @path
	mkpath: @::mkdirp
	mkpathSync: @::mkdirpSync
	readdirAll: (callback) ->
		if callback?
			readdir = (dir, basedir, callback) =>
				@fs.readdir dir, (err, entries) =>
					if err? then return callback err
					entry_paths = []
					done = 0
					push_entry_paths = (a_entry_paths) ->
						entry_paths = entry_paths.concat a_entry_paths
						done++
						if done == entries.length
							callback undefined, entry_paths
					for entry in entries
						((entry_path) =>
							@fs.stat entry_path, (err, stats) =>
								if err? then return callback err
								if stats.isDirectory()
									readdir entry_path, basedir, (err, entry_paths) =>
										if err? then return callback err
										push_entry_paths entry_paths
								else
									push_entry_paths [entry_path.replace basedir, '']
						)(path.join dir, entry)
			basedir = RegExp '^' + @path.replace(/(\W)/g, '\\$1') + '[\\\\/]?', 'i'
			readdir @path, basedir, callback
		else
			readdir = (dir, basedir) =>
				new Promise (resolve, reject) =>
					@fs.readdir dir, (err, entries) =>
						if err? then return reject err
						promises = []
						for entry in entries
							promises.push ((entry_path) =>
								new Promise (resolve, reject) =>
									@fs.stat entry_path, (err, stats) =>
										if err? then return reject err
										if stats.isDirectory()
											readdir entry_path, basedir
											.then ([entry_paths]) -> resolve entry_paths
										else
											resolve [entry_path.replace basedir, '']
							)(path.join dir, entry)
						Promise.all promises
						.then (entry_paths_list) =>
							entry_paths = []
							for a_entry_paths in entry_paths_list
								entry_paths = entry_paths.concat a_entry_paths
							resolve [entry_paths]
			basedir = RegExp '^' + @path.replace(/(\W)/g, '\\$1') + '[\\\\/]?', 'i'
			readdir @path, basedir
	readdirAllSync: ->
		readdir = (dir, basedir) =>
			entries = @fs.readdirSync dir
			entry_paths = []
			for entry in entries
				entry_path = path.join dir, entry
				stats = @fs.statSync entry_path
				if stats.isDirectory()
					entry_paths = entry_paths.concat readdir entry_path, basedir
				else
					entry_paths.push entry_path.replace basedir, ''
			entry_paths
		basedir = RegExp '^' + @path.replace(/(\W)/g, '\\$1') + '[\\\\/]?', 'i'
		readdir @path, basedir
	# objective
	new: (newPath) ->
		new_path = path.resolve @path, newPath
		new FileSystemObject @fs, new_path
	_new: @::new
	parent: ->
		new_path = path.dirname(@path)
		new FileSystemObject @fs, new_path
	children: (callback) ->
		if callback?
			@readdir (err, entry_paths) =>
				if err? then callback err
				else
					entries = []
					for entry_path in entry_paths
						entries.push @new entry_path
					callback undefined, entries
		else
			@readdir()
			.then ([entry_paths]) =>
				entries = []
				for entry_path in entry_paths
					entries.push @new entry_path
				entries
	childrenSync: ->
		entry_paths = @readdirSync()
		entries = []
		for entry_path in entry_paths
			entries.push @new entry_path
		entries
	childrenAll: (callback) ->
		if callback?
			@readdirAll (err, entry_paths) =>
				if err? then callback err
				else
					entries = []
					for entry_path in entry_paths
						entries.push @new entry_path
					callback undefined, entries
		else
			@readdirAll()
			.then ([entry_paths]) =>
				entries = []
				for entry_path in entry_paths
					entries.push @new entry_path
				entries
	childrenAllSync: ->
		entry_paths = @readdirAllSync()
		entries = []
		for entry_path in entry_paths
			entries.push @new entry_path
		entries

if module?.exports?
	module.exports = new FileSystemObject require('fs'), process.cwd()
else
	@FileSystemObject = FileSystemObject
