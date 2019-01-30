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
        private static singletonHash: string = "chipodoy";
        
        private currentSceneId:SceneId = SceneId.SceneMgr;
        private nextSceneId:SceneId = null;
        private prevSceneId:SceneId = null;
        private isInTransition:boolean = false;
        private data: SceneMgrBehaviourFilter = null;

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
            if (d.hash.hash != SceneMgr.singletonHash) {
                // do nothing since its a different hash
                console.log("Warning: more then one entity for SceneMgr");
                return;
            }
            console.log(this.currentSceneId);
            this.data = d;
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