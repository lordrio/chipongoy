namespace scene {
    export class SceneData extends game.SceneData {
        pins: {[pinId: number]: game.SceneId};
        childs: game.SceneId[];
    }

    export function ParseSceneData(data:game.SceneMgrBehaviourFilter): SceneData[] {
        var output:SceneData[] = [];

        data.list.sceneList.forEach(d => {
            var item:SceneData = { ...d, pins:{}, childs:[]};
            data.list.scenePinList.forEach(pin => {
                if(pin.srcSceneId == d.sceneId) {
                    item.pins[pin.pinId] = pin.destSceneId;
                }
            });
            data.list.sceneChildList.forEach(child => {
                if(child.parentSceneId == d.sceneId) {
                    item.childs.push(child.sceneIdToLoad);
                }
            });
            output.push(item);
        });
        
        return output;
    }
}

namespace game {
    /*
        notes :
            - workflow :
                - change scene
                    > IN transition start
                    > IN transition end
                - all system should be in pause state
                - clean up scene
                - load up scene
                    > OUT transition start
                    > OUT transition end
                - <<all done>>
    */

   @ut.executeAfter(ut.Shared.UserCodeEnd)
    export class SceneMgr {
        private static _instance: SceneMgr;
        
        private currentSceneId:SceneId = SceneId.SceneMgr;
        private nextSceneId:SceneId = null;
        private prevSceneId:SceneId = null;
        private isInTransition:boolean = false;
        private data: scene.SceneData[] = null;

        private constructor() {
            if(SceneMgr._instance){
                throw new Error("Error: Instantiation failed");
            }
            console.log("startup mgr");
        }

        public static get Instance() {
            return this._instance || (this._instance = new this());
        }
        
        Initialize(d: SceneMgrBehaviourFilter):void {
            if(this.data != null) {
                return;
            }
            console.log(this.currentSceneId);

            // lets reconstruct, because fucking entity can be nested
            this.data = scene.ParseSceneData(d);
            console.log(this.data);

            this.LoadUpScene();
        }

        // flag :
        // return if shit is in transition mode so game system is paused
        IsInTransition() : boolean {
            return this.isInTransition;
        }
        
        private LoadUpScene(): void {

        }
        
        private CleanUpScene(): void {

        }

        ChangeScene(id: SceneId): void {

        }

        UpdateSystem(): void {
        }
    }
}