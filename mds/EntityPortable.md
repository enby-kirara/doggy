## EntityPortable
methods

```js
register( entity:id -> string, item:id -> string, uuid -> string);
//registers an item type to be linked with an entity type
```

variables

```js
delay -> int //sets the milliseconds for use, default is 250 ms
```

example
```js
import { EntityPortable } from './dependencies/doggy.js';

EntityPortable.register( "makima:inventory", "makima:woof", "woof");
``` 