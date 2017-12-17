'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* globals Vue */
var trackId = null;
Vue.directive('gtag', {
  bind: function bind(el, binding, vnode) {
    init();

    // collect arguments
    var vattrs = vnode.data.attrs || {};
    var act = binding.arg,
        val;
    if (act === 'event') {
      val = vnode.data.attrs['event-name'];
    } else if (act == 'config') {
      attr = 'track-id';
      val = trackId || vnode.data.attrs['track-id'];
      if (!val) throw new Error('Please set track id first!');
    } else {
      return;
    }

    var triggerEvent = vattrs['trigger-event'] || 'click';
    var beforeSend = vattrs['before-send'] || noop;
    var afterSend = vattrs['after-send'] || noop;

    // add event listener
    el.addEventListener(triggerEvent, function (e) {
      var ret = beforeSend(e, el, binding, vnode);
      if (ret === false) {
        // cancel calling gtag if beforeSend return false
        return;
      } else if (ret && typeof ret.then === 'function') {
        // beforeSend returns a promise
        ret.then(function (_) {
          gtag(act, val, binding.value, _);
          afterSend(e, el, binding, vnode);
        }).catch(function (_) {
          return _;
        });
      } else {
        // otherwise, call gtag right away
        gtag(act, val, binding.value);
        afterSend(e, el, binding, vnode);
      }
    });
  }
});

function noop() {}

/**
 * create stub if gtag.js is not loaded
 */
function init() {
  var w = window;
  if (w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer.push(arguments);
  };
}

exports.default = {
  setTrackId: function setTrackId(id) {
    trackId = id;
  },
  getTrackId: function getTrackId() {
    return trackId;
  }
};
