import { resolve } from 'path'

function resolvePath (path) {
  return /package.json$/.test(path) ? resolve(path) : resolve(path, 'package.json')
}

export default function getDependencies (path) {
  const pkg = require(resolvePath(path))
  const dependencies = [
    pkg.dependencies,
    pkg.devDependencies,
    pkg.peerDependencies,
    pkg.optionalDependencies
  ]
  return Object.assign({}, ...dependencies)
}
