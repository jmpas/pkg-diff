#!/usr/bin/env node --harmony
import minimist from 'minimist'
import getDependencies from './getDependencies'
import getDiff from './getDiff'
import parseDep from './parseDep'
import Table from 'cli-table'

const argv = minimist(process.argv.slice(2))
const tbl = new Table({ head: ['Dependency', argv._[0], argv._[1], 'Difference'] })

const deps = getDiff(
  getDependencies(argv._[0], argv.ignore),
  getDependencies(argv._[1], argv.ignore)
)

tbl.push(...deps.map(parseDep))
console.log(tbl.toString())
