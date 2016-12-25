import { resolve } from 'path'

export default function getDependencies (path) {
  const pkg = require(resolve(path))
  const dependencies = [
    pkg.dependencies,
    pkg.devDependencies,
    pkg.peerDependencies,
    pkg.opitionalDependencies
  ]
  return Object.assign({}, ...dependencies)
}
