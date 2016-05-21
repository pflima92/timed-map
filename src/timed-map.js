'use strict';
class TimedMap {
	
	constructor(timeToLive, iterable){
		
		this.timeToLive = timeToLive || Infinity;
		
		if(!iterable){
			
			iterable = new Map();
		}
		this.map = iterable;
		this.timestamps = new Map();
		this.index();
	}
	
	index(){
		
		var toLive = new Date().getTime() + this.timeToLive;
		this.map.forEach((e, k) => {
			
			this.timestamps.set(k, toLive)
		});
	}
	
	get(key){
		
		if(!this.has(key)){
			
			return undefined;
		}
		
		return this.map.get(key);
	}
	
	set(key, value, timeToLive){
		
		if(!timeToLive){
			timeToLive = this.timeToLive;
		}
		
		this.map.set(key, value);
		this.timestamps.set(key , new Date().getTime() + timeToLive);
		return true;
	}
	
	has(key){
		
		return (this.map.has(key) && this.isValid(key));
	}
	
	renewKey(key, timeToLive){
		
		if(!timeToLive){
			timeToLive = this.timeToLive;
		}
		
		if(!this.has(key)){
			
			return false;
		}
		return this.set(key, this.get(key));
	}
	
	isValid(key){
		
		var timestamp = this.timestamps.get(key);
		if(timestamp == undefined || timestamp == null){

			return false;
		}
		var now = new Date().getTime();
		return timestamp > now;
	}
	
	delete(key){
		
		this.map.delete(key);
		this.timestamps.delete(key);
	}
	
	clear(){
		
		this.map.clear();
		this.timestamps.clear();
	}
	
	values(){
		
		var values = new Map();
		this.map.forEach((e, k) => {
			
			if(this.isValid(k)){
				
				values.set(k, e);
			}
		});
		return values;
	}
	
	keys(){
		
		return this.values().keys();
	}
	
	forEach(callback){
		
		return this.values().forEach(callback);
	}
}

module.exports = TimedMap;