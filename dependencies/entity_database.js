import { MinecraftEffectTypes, BlockLocation, world } from "mojang-minecraft";

class EntityDB {
	constructor(lite){
		this.list = {};
		this.lite = lite;
	};
	
	register( id ){
		this.list[id] = 1;
	};
	
	has( table ){
		return (this.list[table.id]!=false);
	};
	
	write( table, data){
		table.nameTag = (this.lite)?JSON.stringify(data):this.invisibleText(JSON.stringify(data));
	};
	
	read( table ){
		let tag = table.nameTag
		
		try {
			return JSON.parse((this.lite)?tag:tag.replaceAll("§",""));
		} catch(e){};
		
		return {};
	};
	
	invisibleText( text ){
		var newtext ="";
		
		(""+text).split("").forEach( c => {
			newtext += `§${c}`;
		});
		
		return newtext;
	};
	
	delete( table ){
		table.triggerEvent("delete");
	};
	
	createTable( id, uuid, callback, emitter){
		let dimension = (!emitter)?(world.getDimension("overworld")):(emitter.dimension);
		let exists = false;
		
		try{ dimension.runCommand("tickingarea add -1 -1 -1 1 1 1 doggy"); } catch(e){};
		
		dimension.getEntitiesAtBlockLocation( new BlockLocation( 0, 0, 0))
		.forEach( entity => {
			if(entity.hasTag(`uuid${uuid}`)){
				entity.addEffect( MinecraftEffectTypes.invisibility, 999999, 1);
				
				exists = true;
				callback( entity );
			}
		});
		
		if(!exists){
			dimension.runCommand(`summon ${id} 0 0 0`);
			
			dimension.getEntitiesAtBlockLocation( new BlockLocation( 0, 0, 0))
			.forEach( entity => {
				if(!entity.hasTag(`setup`) && entity.id == id){
					entity.addEffect( MinecraftEffectTypes.invisibility, 999999, 1);
					
					entity.addTag(`setup`);
					entity.addTag(`uuid${uuid}`);
					
					callback( entity );
				}
			})
		};
		
		try { dimension.runCommand("tickingarea remove doggy"); } catch(e){};
	};
	
	loadTable( id, uuid, callback, emitter){
		let dimension = (!emitter)?(world.getDimension("overworld")):(emitter.dimension);
		
		try{ dimension.runCommand("tickingarea add -1 -1 -1 1 1 1 doggy"); } catch(e){};
		
		dimension.getEntitiesAtBlockLocation( new BlockLocation( 0, 0, 0))
		.forEach( entity => {
			if(entity.hasTag(`uuid${uuid}`)){
				entity.addEffect( MinecraftEffectTypes.invisibility, 999999, 1);
				callback( entity );
			}
		});
		
		try { dimension.runCommand("tickingarea remove doggy"); } catch(e){};
	};
};

export default new EntityDB();