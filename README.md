# timed-map

## Why?

The timed map represents one collection of iterable itens that the basic idea is to map a value to a unique key in such a way that you can retrieve that value at any point in time by using the key and gathering one timer for preserve and manipulate the collection.

## Installation

Via npm:

	npm install timed-map
   

## Features

	* Collect map with timer for manipulate and preserve objects states
	* Passive alghoritm
	* Implemented for ECMA6

## Test on node

``` bash
$ git clone git@github.com:pflima92/timed-map.git
$ cd timed-map && npm install
```

## Example

```js

var TimedMap = require('timed-map');
var map = new TimedMap(1 * 60 * 1000); //Cache alive for one minute.

map.set('key', 'value');
map.set('obj', { "name" : "Value" });
map.set('timed', 'timed_value', 100); //Mantain alive for 100 miles

map.get('key'); // => value

map.keys(); // => key, obj, timed (only if 100 miles be respected)

map.values; // => ( key => value, obj => { "name" : "Value" }, timed => timed_value 

map.forEach((e, k, m) => {
	
	// => element, key, map - follow map of es6
}); 
```

## API

#### .constructor([timeToLive] : int, [iterable] : optional)

Create new instance of TimedMap, timeToLive define default value to element live in TimedMap.

iterable can be added for init default map.

#### .get(key)

Get value from map, all operations are passive, on each call the timestamp are validate timeToLive..

#### .set(key, value, [timeToLive] optional)

Set element on map, definig key and value, individual timeToLive are optional, and will be used only for this command.
	
#### .has(key)

Validate if key are valid and present on this map.

#### .delete(key)

Delete key from map.

#### .renewKey(key, [timeToLive] optional)

Renew element by key, can passed optional timeToLive used individually by this operation.
	
#### .clear()

Clear all elements from this map;
	
#### .values()

Return all valid values from this map.

#### .keys()

Return all valid keys from this map.

#### .forEach(element, key, map)

Execute forEach following Map directives from es6.

## License

	MIT

