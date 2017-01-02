import test from 'ava'
import getDependencies from '../src/getDependencies'

const pkgPath = 'test/stubs/package.json'
const projectPath = 'test/stubs'

test('returns with all valid dependencies', t => {
  const expected = {
    dep1: '1.0.0',
    dep2: '2.0.0',
    dep3: '3.0.0',
    dep4: '4.0.0'
  }

  t.deepEqual(getDependencies(pkgPath), expected)
  t.deepEqual(getDependencies(projectPath), expected)
})

test('ignores specified dependencies', t => {
  const dep      = { dep1: '1.0.0' }
  const dev      = { dep2: '2.0.0' }
  const peer     = { dep3: '3.0.0' }
  const optional = { dep4: '4.0.0' }

  t.deepEqual(
    getDependencies(projectPath, 'dep'),
    { ...dev, ...peer, ...optional }
  )

  t.deepEqual(
    getDependencies(projectPath, 'dev'),
    { ...dep, ...peer, ...optional }
  )

  t.deepEqual(
    getDependencies(projectPath, 'peer'),
    { ...dep, ...dev, ...optional }
  )

  t.deepEqual(
    getDependencies(projectPath, 'optional'),
    { ...dep, ...dev, ...peer }
  )
})
