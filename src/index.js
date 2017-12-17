/* globals Vue */
var trackId = null
Vue.directive('gtag', {
  bind: function(el, binding, vnode) {
    init()

    // collect arguments
    const vattrs = vnode.data.attrs || {}
    var act = binding.arg, val
    if (act === 'event') {
      val = vnode.data.attrs['event-name']
    } else if (act == 'config') {
      attr = 'track-id'
      val = trackId || vnode.data.attrs['track-id']
      if (!val) throw new Error('Please set track id first!')
    } else {
      return
    }

    const triggerEvent = vattrs['trigger-event'] || 'click'
    const beforeSend = vattrs['before-send'] || noop
    const afterSend = vattrs['after-send'] || noop

    // add event listener
    el.addEventListener(triggerEvent, e => {
      const ret = beforeSend(e, el, binding, vnode)
      if (ret === false) {
        // cancel calling gtag if beforeSend return false
        return
      } else if (ret && typeof ret.then === 'function') {
        // beforeSend returns a promise
        ret.then(_ => {
          gtag(act, val, binding.value, _)
          afterSend(e, el, binding, vnode)
        }).catch(_ => _)
      } else {
        // otherwise, call gtag right away
        gtag(act, val, binding.value)
        afterSend(e, el, binding, vnode)
      }
    })
  }
})

function noop () {}

/**
 * create stub if gtag.js is not loaded
 */
function init() {
  const w = window
  if (w.gtag) return
  w.dataLayer = w.dataLayer || []
  w.gtag = function() {
    w.dataLayer.push(arguments)
  }
}

export default {
  setTrackId (id) {
    trackId = id
  },
  getTrackId () {
    return trackId
  }
}
