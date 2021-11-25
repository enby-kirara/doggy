
 ================================<br>
    tt [@evil_makima](https://twitter.com/evil_makima) - 2021<br>
 ================================<br>

<br>

- this api is for gametest(mcbe) process automation
- gametest is still a very new feature. therefore, it has its limitations.
- current mcbe version: 1.18.10.20

<br>

> index:
>- [InventoryObserver](#inventoryobserver) <br>
>- [EntityDB](#entitydb) <br>
>- [EntityBench](#entitybench) <br>
>- [EntityPortable](#entityportable) <br>

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

## EntityDB 
under development
## EntityBench 
under development
## EntityPortable
under development