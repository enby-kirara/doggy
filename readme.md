
 ================================<br>
    tt [@evil_makima](https://twitter.com/evil_makima) - 2021<br>
 ================================<br>

<br>

- this api is for gametest(mcbe) process automation
- gametest is still a very new feature. therefore, it has its limitations.
- current mcbe version: 1.18.10.20

<br>

> index:
>> [InventoryObserver](#inventoryobserver)
>>> #### this class allows you to observe the players'inventory
>>> #### and perform actions when finding certain items.
>> <br>
>
>> [EntityDB](#entitydb) <br>
>>> #### this class allows storing json information in entities 
>>> #### (it is also possible to load the same and its components)
>>> ##### <span style="color: #f51">a customized [entity](./beh/entities/database.json) is needed for better functioning</span>
>> <br>
>
>> [EntityBench](#entitybench) <br>
>> [EntityPortable](#entityportable) <br>

<br>

## InventoryObserver
methods

```js
register( string, json)
```

variables

```js
delay -> int //sets the milliseconds for each check, default is 1000/10
```

example
```js
import { InventoryObserver } from './dependencies/doggy.js';

InventoryObserver.register( "minecraft:diamond", {
   range: [ 0, 36],//valid in slots 0 to 36
   /*
   range, data, max_data, min_data, amount, max_amount, min_amount
   are optional filter parameters.
   */
   on_matching: function( target, item, container, index){//if found, it will execute a command on the player.
      target.runCommand(`say ${(item.id)}`);
   }
});
```

<br>

## EntityDB 
methods

```js
register( string ) //useless
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

<br>

## EntityBench 
under development
## EntityPortable
under development