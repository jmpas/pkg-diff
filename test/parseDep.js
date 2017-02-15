import test from 'ava'
import parseDep from '../src/parseDep'
import sinon from 'sinon'

const chalkMock = {
  bold: {
    green: sinon.stub().returns('g'),
    red: sinon.stub().returns('r'),
    white: sinon.stub().returns('w')
  }
}

const fakeDep = {
  name: 'test',
  diff: [
    {value: '1.'},
    {value: '1', removed: true},
    {value: '2', added: true},
    {value: '.0'}
  ],
  left: '1.1.0',
  right: '1.2.0'
}

test.before(t => parseDep.__Rewire__('chalk', chalkMock))
test.after(t => parseDep.__ResetDependency__('chalk'))

test('returns messages for the dependency object', t => {
  const message = parseDep(fakeDep)

  t.is(chalkMock.bold.red.calledWith('1'), true)
  t.is(chalkMock.bold.green.calledWith('2'), true)
  t.is(chalkMock.bold.white.calledWith('1.'), true)
  t.is(chalkMock.bold.white.calledWith('.0'), true)

  t.deepEqual(message, {[fakeDep.name]: ['1.1.0', '1.2.0', 'wrgw']})
})

test('uses N/D when appropiate', t => {
  const fakeDep2 = Object.assign({}, fakeDep)
  delete fakeDep2.left
  delete fakeDep2.right
  const message = parseDep(fakeDep2)

  t.deepEqual(message, {[fakeDep.name]: ['N/D', 'N/D', 'wrgw']})
})
