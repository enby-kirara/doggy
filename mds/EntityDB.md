## EntityDB 
methods

```js
register( entity:id -> string);//useless
createTable( entity:id -> string, uuid -> string, callback -> function);//summon an entity table
loadTable( entity:id -> string, uuid -> string, callback -> function);//load an entity table
delete( table -> entity);//delete an entity table
read( table -> entity);//load the json data of an entity table
write( table -> entiry, data -> json);//write json data to an entity table
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