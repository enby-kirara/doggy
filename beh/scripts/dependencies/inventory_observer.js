import { world } from "mojang-minecraft";

class InventoryObserver {
	constructor(){
		this.delay = 1000/10;
		
		this.list = {};
		this.timers = {};
	};
	
	register( id, matcher){
		this.list[id] = matcher;
	};
	
	hasMatch( item ){
		if(item && this.list[item.id]){
			let matcher = this.list[item.id];

			[ "data", "amount"].forEach( m => {
				if(matcher["max_"+m] && matcher["max_"+m] < item[m])
					matcher = false;
				if(matcher["min_"+m] && matcher["min_"+m] > item[m])
					matcher = false;
				if(matcher[m] && matcher[m] != item[m])
					matcher = false;
			});
			
			return (matcher!=false);
		};
		
		return false;
	};
	
	getItem( container, index){
		var out_slot = container.getItem(index);
		
		return (out_slot != null)?out_slot:{ id: "minecraft:air", amount: 0, data: 0};
	};

	tryMatch( target, container, index){
		let item = this.getItem( container, index);
		
		if(this .hasMatch( item )){
			let range = (this.list[item.id].range) ?? [ 0, 36];
			
			if(index >= range[0] || index <= range[1])
				this.list[item.id].on_matching( target, item, container, index);
		}
	};
	
	delayed( id, ms, fun){
		let time = Date.now();
		if(!this.timers[id]) this.timers[id] = time;
		
		if(time > this.timers[id]+ms){
			fun(time);
			this.timers[id] = time;
		}
	}
};

const observer = new InventoryObserver();

world.events.tick.subscribe(() => {
	observer.delayed( "makima:iot", observer.delay, time => {
		world.getPlayers().forEach( player => {
			let container = player.getComponent("inventory").container;
			for(var index = 0; index < 36; index++){
				observer.tryMatch( player, container, index);
			}
		});
	});
});

export default observer;