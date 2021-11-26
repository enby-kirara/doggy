import { BlockLocation, world } from "mojang-minecraft";

class EntityPortable {
	constructor(){
		this.delay = 250;
		
		this.list = {};
		this.timers = {};
	};
	
	register( entity_id, item_id, name){
		this.list[item_id] = { id: entity_id, name: name };
	};
	
	toPositionByItem( source, x, y, z, id, data){
		source.runCommand(`tp @e[type=${(this.list[id].id)},tag=uuid${(data)},c=1] ${x} ${y} ${z}`);
	};
	
	toSaveByItem( source, x, y, z, id, data){
		source.runCommand(`tp @e[type=${(this.list[id].id)},tag=uuid${(data)},c=1] 0 0 0`);
	};
	
	use( event, save){
		let dimension = world.getDimension("overworld");
		let { source, item } = event;
		let { x, y, z } = source.location;
		let { data } = item;
		
		x = Math.floor(x);
		y = Math.floor(y);
		z = Math.floor(z);
		
		try{ dimension.runCommand("tickingarea add -1 -1 -1 1 1 1 doggy"); } catch(e){};
		
		try{
			if(!this.list[item.id]) return;
			
			if(data == 0){
				data = this.uniqueData(item);
				
				let ca = source.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${(item.id)} ${(item.amount)} ${(data)}`);
				let cb = source.runCommand(`summon ${(this.list[item.id].id)} ${x} ${y} ${z}`);
				
				dimension.getEntitiesAtBlockLocation( new BlockLocation( x, y, z))
				.forEach( entity => {
					if(entity.id == this.list[item.id].id && !entity.hasTag("setup")){
						entity.nameTag = this.list[item.id].name;
						
						entity.addTag(`setup`);
						entity.addTag(`uuid${(data)}`);
					}
				});
			};
			
			this[((save)?"toPositionByItem":"toSaveByItem")]( dimension, x, y, z, item.id, data);
		} catch(error){
			source.runCommand(`say ${error}`);
		};
		
		//try { dimension.runCommand("tickingarea remove doggy"); } catch(e){};
	};
	
	uniqueData( item ){
		let dimension = world.getDimension("overworld");
		let data = 9999;
		let test = false;
		
		while(!test){
			data = Math.floor(Math.random()*9999);
			
			try {
				test = true;
				dimension.runCommand(`testfor @e[type=${(this.list[item.id].id)},tag=uuid${data},c=1]`);
				test = false;
			} catch(e) {};
		};
		
		return data;
	};
	
	delayed( id, ms, fun){
		let time = Date.now();
		if(!this.timers[id]) this.timers[id] = time;
		
		if(time > this.timers[id]+ms){
			fun(time);
			this.timers[id] = time;
		}
	};
};

const entity_portable = new EntityPortable();

world.events.beforeItemUse.subscribe( data => {
	entity_portable.delayed( "makima:epd", entity_portable.delay, ( time ) => {
		entity_portable.use( data, true);
	});
});
world.events.beforeItemUseOn.subscribe( data => {
	entity_portable.delayed( "makima:epd", entity_portable.delay, ( time ) => {
		entity_portable.use( data, false);
	});
});

export default entity_portable;