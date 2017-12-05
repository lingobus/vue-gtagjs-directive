/* globals Vue */
Vue.directive('gtag', {
  bind: function(el, binding, vnode) {
    init()
    const vattrs = vnode.data.attrs || {}
    var act, attr
    if (binding.modifiers.event) {
      act = 'event'
      attr = 'event-name'
    } else if (binding.modifiers.config) {
      act = 'config'
      attr = 'track-id'
    }
    const val = vnode.data.attrs[attr]
    const triggerEvent = vattrs['trigger-event'] || 'click'
    const beforeSend = vattrs['before-send'] || noop
    const afterSend = vattrs['after-send'] || noop
    el.addEventListener(triggerEvent, e => {
      const ret = beforeSend(e, el, binding, vnode)
      if (ret === false) return
      gtag(act, val, binding.value)
      afterSend(e, el, binding, vnode)
    })
  }
})

function noop () {}

function init() {
  const w = window
  if (w.gtag) return
  w.dataLayer = w.dataLayer || []
  w.gtag = function() {
    w.dataLayer.push(arguments)
  }
}
