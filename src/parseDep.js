import chalk from 'chalk'

export default function createMessage (dep) {
  const { name, left = 'N/D', right = 'N/D' } = dep
  const diff = dep.diff.reduce((init, diff) => {
    const color = diff.added ? 'green' : (diff.removed ? 'red' : 'white')
    return `${init}${chalk.bold[color](diff.value)}`
  }, '')

  return { [name]: [left, right, diff] }
}
