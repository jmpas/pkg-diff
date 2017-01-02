#!/usr/bin/env node --harmony
import minimist from 'minimist'
import getDependencies from './getDependencies'
import getDiff from './getDiff'
import createMessage from './createMessage'

const argv = minimist(process.argv.slice(2))

const deps = getDiff(
  getDependencies(argv._[0], argv.ignore),
  getDependencies(argv._[1], argv.ignore)
)

deps.map(createMessage).forEach(msg => console.log(msg))
