
namespace game {

    export class SimpleDraggerFilter extends ut.EntityFilter {
        // node: ut.Core2D.TransformNode;
        pos: ut.Core2D.TransformLocalPosition;
        mouseSprite: game.MouseSpriteInteractionData;
        tag: game.SimpleDraggerTag;
    }

    export class SimpleDragger extends ut.ComponentBehaviour {

        data: SimpleDraggerFilter;

        // ComponentBehaviour lifecycle events
        // uncomment any method you need
        
        // this method is called for each entity matching the SimpleDraggerFilter signature, once when enabled
        OnEntityEnable():void { }
        
        // this method is called for each entity matching the SimpleDraggerFilter signature, every frame it's enabled
        OnEntityUpdate():void {
            if(this.data.mouseSprite.drag) {
                this.data.pos.position = InputService.getPointerWorldPosition(this.world, this.data.mouseSprite.camera);
            }
        }

        // this method is called for each entity matching the SimpleDraggerFilter signature, once when disabled
        //OnEntityDisable():void { }

    }
}
