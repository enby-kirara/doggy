## InventoryObserver
methods

```js
register( entity:id -> string, data -> json);//register an item to be checked
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