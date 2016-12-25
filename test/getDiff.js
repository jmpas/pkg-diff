import test from 'ava'
import getDiff from '../src/getDiff'

test.before(t => getDiff.__Rewire__('diffChars', () => 'fakeRes'))
test.after(t => getDiff.__ResetDependency__('diffChars'))

test('returns array with diffs', t => {
  const actual = getDiff(
    { test: '1.0.0', test2: '2.0.0' },
    { test: '^1.1.0', test3: '3.0.0' }
  )
  const expected = [
    { name: 'test', diff: 'fakeRes', left: '1.0.0', right: '^1.1.0' },
    { name: 'test2', diff: 'fakeRes', left: '2.0.0', right: undefined },
    { name: 'test3', diff: 'fakeRes', left: undefined, right: '3.0.0' }
  ]

  expected.forEach((item, idx) => t.deepEqual(actual[idx], item))
})
