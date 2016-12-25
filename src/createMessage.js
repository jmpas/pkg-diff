import chalk from 'chalk'

export default function createMessage (dep) {
  let name = `${dep.name}`
  let diff = dep.diff.reduce((init, diff) => {
    const color = diff.added ? 'green' : (diff.removed ? 'red' : 'white')
    return `${init}${chalk.bold[color](diff.value)}`
  }, '')
  let versions = `${dep.left || 'N/D'} / ${dep.right || 'N/D'}`

  return `${name}: diff = ${diff} | versions = ${versions}`
}
