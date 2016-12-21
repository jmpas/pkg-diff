#!/usr/bin/env node --harmony
const path = require('path')
const fs = require('fs')
const jsdiff = require('diff')
const chalk = require('chalk')

// Args
const package1 = require(path.resolve(process.argv[2]))
const package2 = require(path.resolve(process.argv[3]))

// Object with comparinson
let results = {}

function eachDependency (pkg, types, cb) {
  for (let type of types) {
    for (let dep in pkg[type]) {
      cb(dep, pkg[type][dep]) 
    }
  }
}

function processDep (name, version) {
  results[name] ? results[name].push(version) : results[name] = [version]
}

function processDiff (diff) {
  let color = diff.added ? ['black', 'bgGreen'] : diff.removed ? ['black', 'bgRed'] : ['white', 'bgBlack'] 
  return chalk.bold[color[0]][color[1]](diff.value)
}

let dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']

eachDependency(package1, dependencyTypes, processDep)
eachDependency(package1, dependencyTypes, processDep)

for (let result in results) {
  const versions = results[result]
	let diffs = jsdiff.diffChars(versions[0], versions[1])

  process.stderr.write(chalk.bold(`${result}: `))

  diffs
    .map(processDiff)
    .forEach( diff => process.stderr.write(diff))

  process.stderr.write(` | left/right: [${versions[0]}, ${versions[1]}]`)

  console.log()
}
