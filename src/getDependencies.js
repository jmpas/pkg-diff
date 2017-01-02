import { resolve } from 'path'

function resolvePath (path) {
  return /package.json$/.test(path) ? resolve(path) : resolve(path, 'package.json')
}

export default function getDependencies (path, ignore = '') {
  const pkg = require(resolvePath(path))

  return {
    ...(ignore.includes('dep')      ? {} : pkg.dependencies),
    ...(ignore.includes('dev')      ? {} : pkg.devDependencies),
    ...(ignore.includes('peer')     ? {} : pkg.peerDependencies),
    ...(ignore.includes('optional') ? {} : pkg.optionalDependencies)
  }
}
