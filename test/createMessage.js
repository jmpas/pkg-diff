import test from 'ava'
import createMessage from '../src/createMessage'
import sinon from 'sinon'

const chalkMock = {
  bold: {
    green: sinon.stub().returns('-'),
    red: sinon.stub().returns('-'),
    white: sinon.stub().returns('-')
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

test.before(t => createMessage.__Rewire__('chalk', chalkMock))
test.after(t => createMessage.__ResetDependency__('chalk'))

test('returns messages for the dependency object', t => {
  const message = createMessage(fakeDep)

  t.is(chalkMock.bold.red.calledWith('1'), true)
  t.is(chalkMock.bold.green.calledWith('2'), true)
  t.is(chalkMock.bold.white.calledWith('1.'), true)
  t.is(chalkMock.bold.white.calledWith('.0'), true)

  t.is(message, `${fakeDep.name}: diff = ---- | versions = 1.1.0 / 1.2.0`)
})

test('uses N/D when appropiate', t => {
  const fakeDep2 = Object.assign({}, fakeDep)
  delete fakeDep2.left
  delete fakeDep2.right
  const message = createMessage(fakeDep2)

  t.is(message, `${fakeDep.name}: diff = ---- | versions = N/D / N/D`)
})
