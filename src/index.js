#!/usr/bin/env node --harmony
import path from 'path'
import chalk from 'chalk'
import getDependencies from './getDependencies'
import getDiff from './getDiff'

const deps = getDiff(
  getDependencies(process.argv[2]),
  getDependencies(process.argv[3])
)

deps.forEach(dep => {
  process.stdout.write(`${dep.name}: diff = `)
  process.stdout.write(
    dep.diff.reduce((init, diff) => {
      const color = diff.added ? 'green' : (diff.removed ? 'red' : 'white')
      return `${init}${chalk.bold[color](diff.value)}`
    }, '')
  )
  process.stdout.write(` | versions = ${dep.left || 'N/D'} / ${dep.right || 'N/D'}`)
  console.log()
})
