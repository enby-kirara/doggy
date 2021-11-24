# ================================
#      tt @evil_makima - 2021
# ================================

- This api is for gametest(mcbe) process automation

<style>
    .box {
        border-radius: 13px;
        background: #333;
        color: #ddd;
        overflow: hidden;
        margin: 13px;
        padding-bottom: 5px;
    }

    .header {
        background-color: #111;
        color: white;
        text-align: center;
        padding: 5px;
    }
    
    .methods {
        padding: 5px;
    }
    
    .example {
        background: #555;
    }
</style>

<div class="box">
    <div class="header">InventoryObserver</div>
    
    <div class="methods">
        register( string, function)
        <pre class="example">
            <code>
                import InventoryObserver from './dependencies/doggy.js';
                
                InventoryObserver.addMatcher( "makima:my_item_id", ( target, item, container, index) => {
                    //your code here
                    target.runCommand(`say {(item.id)}`);
                });
            </code>
        </pre>
    </div>
</div>

<div class="box">
    <div class="header">EntityDB</div>
    
    <div class="methods">
        register( string )
        <pre class="example">
            <code>
                import EntityDB from './dependencies/doggy.js';
                
                EntityDB.register( "makima:my_entity_id" );
            </code>
        </pre>
        save( entity, json)
        <pre class="example">
            <code>
                import EntityDB from './dependencies/doggy.js';
                
                //"entity" tem que ser uma Classe de entidade gametest(não jogador) :)
                EntityDB.save( entity, {points:13});
            </code>
        </pre>
    </div>
</div>