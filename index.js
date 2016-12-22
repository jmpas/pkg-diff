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

function eachDependency (pkg, types, file = 'left', cb) {
  for (let type of types) {
    for (let dep in pkg[type]) {
      cb(dep, pkg[type][dep], file)
    }
  }
}

function processDep (name, version, file) {
  if (file === 'left') {
    results[name] ? results[name].push(version) : results[name] = [version]
  } else {
    results[name] && results[name].length > 0 ? results[name].push(version) : results[name] = ['', version]
  }
}

function processDiff (diff) {
  let color = diff.added ? 'green' : diff.removed ? 'red' : 'white'
  return chalk.bold[color](diff.value)
}

let dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']

eachDependency(package1, dependencyTypes, 'left' , processDep)
eachDependency(package2, dependencyTypes, 'right', processDep)

for (let result in results) {
  process.stdout.write(chalk.bold(`${result}: `))

  const versions = results[result]
  if (versions.length === 1) versions.push(' ')

  if (versions[0] === versions[1]) {
    console.log(chalk.white(versions[0]))
    continue
  }

	let diffs = jsdiff.diffChars(versions[0], versions[1])

  diffs
    .map(processDiff)
    .forEach(diff => process.stdout.write(diff))

  let version1 = versions[0] ? versions[0] : 'N/D'
  let version2 = versions[1] ? versions[1] : 'N/D'

  process.stdout.write(` | ${chalk.red(version1)} / ${chalk.green(version2)}`)

  console.log()
}
