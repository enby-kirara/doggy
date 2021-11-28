## EntityDB 
methods

```js
/*============================================================================
		Int methods are slow, use them only with entities 
		whose nametag cannot be managed by the system.
============================================================================*/

delete			( table -> entity);											//delete an entity table
read			( table -> entity);											//load the json data of an entity table
register		( entity:id -> string);										//useless
write			( table -> entity, data -> json);							//write json data to an entity table
putIntList		( table -> entity, data -> json);							//set value to an entity table key list
addIntList		( table -> entity, data -> json);							//add value to an entity table key list
removeIntList	( table -> entity, data -> json);							//revome value to an entity table key list
putInt			( table -> entity, key -> string, value -> int) -> int;		//set value to an entity table key
addInt			( table -> entity, key -> string, value -> int) -> int;		//add value to an entity table key
removeInt		( table -> entity, key -> string, value -> int) -> int;		//remove value to an entity table key
createTable		( entity:id -> string, uuid -> string, callback -> function);//summon an entity table
loadTable		( entity:id -> string, uuid -> string, callback -> function);//load an entity table
```

variables

```js
lite -> boolean //true = better performace
```

example
```js
import { EntityDB } from './dependencies/doggy.js';
import { world } from "mojang-minecraft";//importing world to record chat event

EntityDB.lite = true;//enabling lite mode

world.events.beforeChat.subscribe( data => {//recording chat event
	EntityDB.createTable( "makima:database", "makima:0x000", (table) => {//summoning a database entity
		EntityDB.write( table, { woof: "woof" });//writing a json object

		EntityDB.loadTable( "makima:database", "makima:0x000", (table) => {//reloading the entity
         let data = EntityDB.read( table );//reading the entity's json object
         let woof = data.woof;

         table.runCommand(`say ${woof}`);//running a command on the entity

         EntityDB.delete(table);//deleting the entity
		});
	});	
});
``` 