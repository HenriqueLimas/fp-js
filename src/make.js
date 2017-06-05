'use strict'

const VALUES = '@@values'
const TYPE = '@@type'

function make (functorName, fields, map) {
  fields = fields || ['val']

  if (typeof fields === 'function') {
    map = fields
    fields = ['val']
  }

  const proto = {}

  const Container = makeConstructor(fields, proto)
  Container[TYPE] = functorName
  Container.prototype = proto
  Container.toString = containerToString
  Container.is = isType

  proto.toString = objToString
  proto.constructor = Container

  proto.map = map ? map(Container) : _map(Container)

  return Container
}

function objToString () {
  return `${this.constructor[TYPE]}(${valueToString(this[VALUES])})`
}

function containerToString () {
  return this[TYPE]
}

function isType (val) {
  return this[TYPE] === val.constructor[TYPE]
}

function makeConstructor (fields, proto) {
  return Object.defineProperty(
    function () { return makeValue(fields, proto, arguments) },
    'length',
    { value: fields.length }
  );
}

function makeValue (fields, proto, arg) {
  const value  = fields.reduce((obj, key, index) => {
    obj[key] = arg[index]
    return obj
  }, {})

  const desc = {
    enumerable: false,
    writable: false,
    configurable: false,
    value
  }

  const obj = Object.create(proto)

  return Object.defineProperty(obj, VALUES, desc)
}

function valueToString (values) {
  return Object.keys(values)
    .map(key => values[key])
    .join(', ')
}

function _map (Container) {
  return function map (fn) {
    return fn ? Container(fn(this[VALUES])) : Container(this[VALUES])
  }
}

module.exports = make
