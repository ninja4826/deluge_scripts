fs = require 'fs'
childProcess = require 'child_process'
path = require 'path'

convertFiles = (files) ->
  for fileName, i in files
    if path.extname(fileName) is '.avi'
      if (fileName.split('.')[0] + '.mp4') in files
        console.log 'The MP4 already exists, but the AVI file has not been deleted. Deleting MP4 and converting again.'
        childProcess.execSync 'rm -rf "' + fileName.split('.')[0] + '.mp4"', {stdio: 'ignore'}
      process.stdout.write ((i/files.length)*100).toFixed(2) + '% ' + ': Converting "' + path.basename(fileName) + '" ... '
      childProcess.execSync 'avconv -i "' + fileName + '" -c:a copy "' + fileName.split('.')[0] + '.mp4"', {stdio: 'ignore'}
      process.stdout.write "Done!\n"
      childProcess.execSync 'mv "' + fileName + '" "' + fileName + '.bak"', {stdio: 'ignore'}

walk = (dir, done) ->
  results = []
  fs.readdir(dir, (err, list) ->
    return done err if err
    pending = list.length
    return done null, results if not pending
    list.forEach((file) ->
      file = path.resolve(dir, file)
      fs.stat(file, (err, stat) ->
        if stat and stat.isDirectory()
          walk(file, (err, res) ->
            results = results.concat(res)
            done null, results if not --pending
          )
        else
          results.push file if path.extname(file) is '.avi' or '.mp4'
          done null, results if not --pending
      )
    )
  )


module.exports = (obj) ->
  walk(obj.path + '/' + obj.name, (err, results) ->
    convertFiles(results)
  )
