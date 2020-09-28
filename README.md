# statman-gauge [![Build Status](https://travis-ci.org/jasonray/statman-gauge.svg?branch=master)](https://travis-ci.org/jasonray/statman-gauge) [![on npm](http://img.shields.io/npm/v/statman-gauge.svg?style=flat)](https://www.npmjs.org/package/statman-gauge) [![Greenkeeper badge](https://badges.greenkeeper.io/jasonray/statman-gauge.svg)](https://greenkeeper.io/)

`statman-gauge` is one of the metrics from the [`statman`](https://github.com/jasonray/statman) library.  Loosely based upon [codehale metric package](http://metrics.codahale.com/getting-started/#gauges), a gauge is an instantaneous measurement metric.  This can be use to capture things like the size of a queue, number of messages processed, or some other interesting thing within your system.

**WARNING!!** if you look at the word `gauge` long enough, it looks misspelled 

## Install it!
### Option 1: access directly
Install using npm:
``` bash
npm install statman-gauge
```

Reference in your app:
``` javascript
var Gauge = require('statman-gauge');
var gauge = Gauge('gauge-name');
```

### Option 2: access from `statman`
Install using npm:
``` bash
npm install statman
```

Reference in your app:
``` javascript
var statman = require('statman');
var gauge = statman.Gauge('gauge-name');
```

## Use it!
### Constructor
+ Gauge() => create instance of a gauge
+ Gauge(name) => create instance of a gauge with name
+ Gauge(name, f()) => create instance of a gauge with name, where f is a function that returns the value for the gauge

### Increment
+ increment() => increment value by 1
+ increment(value) => increment by value
``` javascript
gauge.increment();  //increment by 1
gauge.increment(10); //increment by 10
```

### Decrement
+ decrement() => decrement value by 1
+ decrement(value) => decrement by value
``` javascript
gauge.decrement();  //decrement by 1
gauge.decrement(10); //decrement by 10
```

### Set
+ set(value) => set value of gauge
``` javascript
gauge.set(5);
```

### Value
+ value() => get the value of the gauge
``` javascript
gauge.value();
```

### Example:
Suppose that we want to create a gauge that measures that size of a queue.  The below indicates how to register this.

#### Method 1 (use gauge directly)
``` javascript
var Gauge = require('statman-gauge');
var gauge = Gauge('queueSize');

function enqueue(message) {
	data.push(message);
	gauge.increment();
}

function dequeue() {
	data.pop(message);
	gauge.decrement();
}
```

#### Method 2 (use gauge via statman)
```
TODO
```

#### Method 3 (use custom value function)
``` javascript
var Gauge = require('statman-gauge');
var gauge = Gauge('queueSize', function() {
	return data.size();
});

function enqueue(message) {
	data.push(message);
}

function dequeue() {
	data.pop(message);
}
```

## Build it!
- Make sure that you have `node` and `npm` installed
- Clone source code to you local machine
- Setup dependencies: `npm install`
- run tests: `npm test`
