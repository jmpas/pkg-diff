import { diffChars } from 'diff'

function diff (value1 = '', value2 = '') {
  return diffChars(value1, value2)
}

export default function getDiff (obj1, obj2) {
  const allProps = [...Object.keys(obj1), ...Object.keys(obj2)]
  return allProps
    .reduce((props, prop) => {
      return props.includes(prop) ? props : [...props, prop]
    }, [])
    .map(prop => {
      return {
        name: prop,
        diff: diff(obj1[prop], obj2[prop]),
        left: obj1[prop],
        right: obj2[prop]
      }
    })
}
