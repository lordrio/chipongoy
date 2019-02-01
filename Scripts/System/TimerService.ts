// declare module "rx.all" {
//     export = Rx;
// }
namespace game {
    declare class TimerData {

    }
    /** New System */
    export class TimerService extends ut.ComponentSystem {
        private static timerContainer: {[uuid:string]: TimerData} = {};
        
        OnUpdate():void {
            let deltaTime = this.scheduler.deltaTime();
        }


    }
}
