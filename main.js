import { InventoryObserver } from './dependencies/doggy.js';

InventoryObserver.register( "minecraft:diamond", {
	range: [ 0, 36],//valid in slots 0 to 36
	on_matching: function( target, item, container, index){//if found, it will execute a command on the player.
		target.runCommand(`say ${(item.id)}`);
	}
});

//this file contains api tests, everything here can be read in readme.md