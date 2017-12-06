# vue-gtag-directive

Vue directive for Google gtag.js

Install
====
> yarn add vue-gtagjs-directive

Usage
====

First, include gtag.js in you page or use [vue-gtagjs](https://github.com/lingobus/vue-gtagjs)

```js
import gtagHelper from 'vue-gtagjs-directive'
gtagHelper.setTrackId('UA-XXXXXXXX-1')
```

## gtag('config',GA_TRACK_ID, {page_path:'/path'})
```pug
//- if you have setTrackId, track-id attribute can be omitted
button(v-gtag.config="{page_path:'/path'}", trigger-event="mouseup", :before-send="beforeSend", :after-send="afterSend") test
//- otherwise, track-id is mandatory
button(v-gtag:config="{page_path:'/path'}", track-id="UA-XXXXXXXX-1", trigger-event="mouseup") test
```

## gtag('event',EVENT_NAME, {event_category:'CATA','event_label':'Label'})
```pug
button(v-gtag:event="{event_category:'CATA','event_label':'Label'}", event-name="EVENT-NAME") test
```
