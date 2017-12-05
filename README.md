# vue-gtag-directive

# NOT TESTED, DO NOT USE!

Vue directive for Google gtag.js

Install
====
> yarn add vue-gtagjs-directive

Usage
====

First, include gtag.js in you page or use [vue-gtagjs](https://github.com/lingobus/vue-gtagjs)


## gtags('config',GA_TRACK_ID, {page_path:'/path'})
```pug
button(v-gtag.config="{page_path:'/path'}", track-id="UA-XXXXXXXX-1", trigger-event="mouseup") test
```

## gtags('event',EVENT_NAME, {event_category:'CATA','event_label':'Label'})
```pug
button(v-gtag.event="{event_category:'CATA','event_label':'Label'}", event-name="EVENT-NAME") test
```
