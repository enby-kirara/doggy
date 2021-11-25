import { InventoryObserver, EntityDB } from './dependencies/doggy.js';
import { world } from "mojang-minecraft";

InventoryObserver.register( "minecraft:diamond", {
	range: [ 0, 36],
	on_matching: function( target, item, container, index){
		target.runCommand(`say ${(item.id)}`);
	}
});

EntityDB.lite = true;

world.events.beforeChat.subscribe( data => {
	EntityDB.createTable( "makima:database", "makima:0x000", (table) => {
		EntityDB.write( table, { woof: "woof" });
		
		EntityDB.loadTable( "makima:database", "makima:0x000", (table) => {
			let data = EntityDB.read( table );
			let woof = data.woof;
			
			table.runCommand(`say ${woof}`);

        	EntityDB.delete(table);
		});
	});	
});