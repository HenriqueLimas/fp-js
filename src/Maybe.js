'use strict'

function _Maybe (val) {
  this.val = val
}

_Maybe.prototype.map = function _map (fn) {
  return this.val ? Maybe(fn(this.val)) : Maybe(this.val)
}

_Maybe.prototype.toString = function _toString () {
  return `Maybe(${this.val})`
}

function Maybe (val) {
  return new _Maybe(val)
}

module.exports = Maybe
