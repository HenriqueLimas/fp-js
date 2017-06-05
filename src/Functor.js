'use strict'

function _Functor (val) {
  this.val = val
}

_Functor.prototype.map = function _map (fn) {
  return fn ? Functor(fn(this.val)) : Functor(this.val)
}

_Functor.prototype.toString = function _toString () {
  return `Functor(${this.val})`
}

function Functor (val) {
  return new _Functor(val)
}

module.exports = Functor
