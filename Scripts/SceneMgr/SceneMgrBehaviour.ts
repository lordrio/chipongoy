
namespace game {

    export class SceneMgrBehaviourFilter extends ut.EntityFilter {
        list: game.SceneList;
        def: game.SceneDefineContainer;
    }

    // there should only be one behaviour of this type.
    // if more then one then its fucked already
    export class SceneMgrBehaviour extends ut.ComponentBehaviour {

        data: SceneMgrBehaviourFilter;

        // ComponentBehaviour lifecycle events
        // uncomment any method you need
        
        // this method is called for each entity matching the SceneMgrFilter signature, once when enabled
        OnEntityEnable():void { 
            // run the processSceneChange(?) once
            SceneMgr.Instance.Initialize(this.data, this.world);
        }
        
        // this method is called for each entity matching the SceneMgrFilter signature, every frame it's enabled
        OnEntityUpdate():void {
            SceneMgr.Instance.UpdateSystem(this.world);
        }

        // this method is called for each entity matching the SceneMgrFilter signature, once when disabled
        // OnEntityDisable():void {
        //     // should never been call?
        // }

    }
}
