#!/usr/bin/env node --harmony
import getDependencies from './getDependencies'
import getDiff from './getDiff'
import createMessage from './createMessage'

const deps = getDiff(
  getDependencies(process.argv[2]),
  getDependencies(process.argv[3])
)

deps.map(createMessage).forEach(msg => console.log(msg))
