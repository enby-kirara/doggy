
 ================================<br>
    tt [@evil_makima](https://twitter.com/evil_makima) - 2021<br>
 ================================<br>

<br>

- this api is for gametest(mcbe) process automation
- gametest is still a very new feature. therefore, it has its limitations.
- current mcbe version: 1.18.10.20
- on [manifest.json](./beh/manifest.json)(beh) you can find how to configure your gametest project

<br>


> dictionary:
> - uiid <br>
> unique indefector
> <br>
>
> - entity:id <br>
> entity type identifier text
> <br>
>
> - table <br>
> gametest [class](https://github.com/MicrosoftDocs/minecraft-creator/blob/main/creator/ScriptAPI/mojang-minecraft/Entity.md) entity
> <br>
>
> - callback <br>
> callback function with fetched object as parameter
> <br>
>
> - data <br>
> object containing information (usually json)
> <br>
>
> - key <br>
> key value correlation with an object. at x = -201, we say x is the key and -201 the stored value.
> <br>
>

<br>

> index:
>> [InventoryObserver](./mds/InventoryObserver.md)
>>> this class allows you to observe the players'inventory <br>
>>> and perform actions when finding certain items. <br>
>> </br>
>
>> [EntityDB](./mds/EntityDB.md)
>>> this class allows storing json information in entities <br>
>>> (it is also possible to load the same and its components) <br>
>>> a customized [entity](./beh/entities/database.json) is needed for better functioning
>> <br>
>
>> [EntityPortable](./mds/EntityPortable.md) <br>
>>> links entities to items (like a backpack) <br>
>>> a customized [entity](./beh/entities/inventory.json) is needed for better functioning <br>
>>> a custom [item](./beh/items/woof.json) with durability is required (the durability will be managed by the system so it doesn't work with tools)
>> <br>
>
>> [EntityBench](./mds/EntityBench.md)
>>> creates custom benches through entities (workbench, furnace, potions support, etc.).
>
