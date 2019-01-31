namespace scene {
    export class SceneData extends game.SceneData {
        pins: {[pinId: number]: game.SceneId};
        childs: game.SceneId[];
        path: string;
    }

    export function ParseSceneData(data:game.SceneMgrBehaviourFilter): {[id: number]: SceneData} {
        var output:{[id: number]: SceneData} = {};

        data.list.sceneList.forEach(d => {
            var item:SceneData = { ...d, pins:{}, childs:[], path:""};
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
            // output.push(item);
            output[d.sceneId] = item;
        });

        data.def.sceneList.forEach(def => {
            output[def.sceneId].path = def.scenePath;
        })
        
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
        private static StartUpScene: SceneId = SceneId.SceneMgr;
        
        private currentSceneId:SceneId = null;
        private nextSceneId:SceneId = SceneMgr.StartUpScene;
        private prevSceneId:SceneId = null;
        private isInTransition:boolean = false;
        private data: {[id: number]: scene.SceneData} = null;

        private constructor() {
            if(SceneMgr._instance){
                throw new Error("Error: Instantiation failed");
            }
            console.log("startup mgr");
        }

        public static get Instance() {
            return this._instance || (this._instance = new this());
        }
        
        Initialize(d: SceneMgrBehaviourFilter, world: ut.World):void {
            if(this.data != null) {
                return;
            }
            console.log(this.currentSceneId);

            // lets reconstruct, because fucking entity can be nested
            this.data = scene.ParseSceneData(d);
            console.log(this.data);

            this.LoadUpScene(world);
        }

        // flag :
        // return if shit is in transition mode so game system is paused
        IsInTransition() : boolean {
            return this.isInTransition;
        }
        
        private LoadUpScene(world: ut.World): void {
            if(this.nextSceneId == null) {
                return;
            }
            // load
            let loadedSceneData = this.data[this.nextSceneId];

            // update
            this.prevSceneId = this.currentSceneId;
            this.currentSceneId = this.nextSceneId;
            this.nextSceneId = null;

            // spawn parent
            if (this.nextSceneId != SceneMgr.StartUpScene) {
                ut.EntityGroup.instantiate(world, loadedSceneData.path);

                console.log("loaded parent " + loadedSceneData.path);
            }

            // spawn childs
            if(loadedSceneData != null) {
                loadedSceneData.childs.forEach(child => {
                    let d = this.data[child];

                    ut.EntityGroup.instantiate(world, d.path);
                    console.log("loaded child " + d.path);
                });
            }
        }
        
        private CleanUpScene(world: ut.World): void {
            // do not clean if its startup scene
            if(this.currentSceneId == SceneMgr.StartUpScene) {
                return;
            }
            
            // lets clean up
            let loadedSceneData = this.data[this.currentSceneId];

            // clean child
            loadedSceneData.childs.forEach(child => {
                let d = this.data[child];
                ut.EntityGroup.destroyAll(world, d.path);
            });

            // clean parent
            ut.EntityGroup.destroyAll(world, loadedSceneData.path);
        }

        // do clean up
        ChangeScene(pinId: number, world: ut.World): void {
            let loadedSceneData = this.data[this.currentSceneId];

            // check if pin exist
            if(loadedSceneData.pins[pinId] == undefined || loadedSceneData.pins[pinId] == null) {
                // no pin
                console.log("[ERROR] pin " + pinId + " does not exist for " + this.currentSceneId);
                return;
            }

            // set next scene
            this.nextSceneId = loadedSceneData.pins[pinId];

            // temp without transition
            this.CleanUpScene(world);
            this.LoadUpScene(world);
        }

        UpdateSystem(world: ut.World): void {
            // temp
            if (ut.Runtime.Input.getKeyUp(ut.Core2D.KeyCode.S)) {
                console.log("pressed S");
                this.ChangeScene(1, world);
            }
            if (ut.Runtime.Input.getKeyUp(ut.Core2D.KeyCode.D)) {
                console.log("pressed D");
                this.ChangeScene(2, world);
            }

            // for transition animation :O
        }
    }
}