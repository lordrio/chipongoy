(function HDPI_Hacks_By_abeisgreat() {
    const w = (window as any);

    // const initialize_hack = () => {
    //     console.log("Initializing HDPI hacks v6 by @abeisgreat");
    //     const fakeMouseEventFn = (ev) => {
    //         const ut_HTML = w.ut._HTML;
    //         const fakeEvent = {
    //             type: ev.type,
    //             pageX: ev.pageX * window.devicePixelRatio,
    //             pageY: ev.pageY * window.devicePixelRatio,
    //             preventDefault: () => {},
    //             stopPropagation: () => {}
    //         };
    //         ut_HTML.mouseEventFn(fakeEvent);
    //         ev.preventDefault();
    //         ev.stopPropagation();
    //     };

    //     const fakeTouchEventFn = (ev) => {
    //         const ut_HTML = w.ut._HTML;
    //         const changedTouches = [];
    //         for (var index = 0; index < ev.changedTouches.length; index++) {
    //             const touch = ev.changedTouches[index];
    //             changedTouches.push({
    //                 identifier: touch.identifier,
    //                 pageX: touch.pageX * window.devicePixelRatio,
    //                 pageY: touch.pageY * window.devicePixelRatio
    //             });
    //         }
    //         const fakeEvent = {
    //             type: ev.type,
    //             changedTouches,
    //             preventDefault: () => {},
    //             stopPropagation: () => {}
    //         };
    //         ut_HTML.touchEventFn(fakeEvent);
    //         ev.preventDefault();
    //         ev.stopPropagation();
    //     };

    //     window.addEventListener("resize", function () {
    //         const ut = w.ut;

    //         ut._HTML.onDisplayUpdated(
    //             window.innerWidth * window.devicePixelRatio,
    //             window.innerHeight * window.devicePixelRatio,
    //             window.screen.width * window.devicePixelRatio,
    //             window.screen.height * window.devicePixelRatio,
    //             -1);

    //         ut._HTML.canvasElement.style.width = `${window.innerWidth}px`;
    //         ut._HTML.canvasElement.style.height = `${window.innerHeight}px`;

    //         ut._HTML.stopResizeListening();
    //         const mouseEvents = ["down", "move", "up"];
    //         const touchEvents = ["touch", "cancel", "move", "start"];

    //         mouseEvents.forEach((type) => {
    //             const eventType = `mouse${type}`;
    //             ut._HTML.canvasElement.removeEventListener(eventType, fakeMouseEventFn);
    //             ut._HTML.canvasElement.addEventListener(eventType, fakeMouseEventFn);
    //         });

    //         touchEvents.forEach((type) => {
    //             const eventType = `touch${type}`;
    //             ut._HTML.canvasElement.removeEventListener(eventType, fakeTouchEventFn);
    //             ut._HTML.canvasElement.addEventListener(eventType, fakeTouchEventFn);
    //         });

    //         setTimeout(function () {
    //             mouseEvents.forEach((type) => {
    //                 ut._HTML.canvasElement.removeEventListener(`mouse${type}`, ut._HTML.mouseEventFn);
    //             });

    //             touchEvents.forEach((type) => {
    //                 ut._HTML.canvasElement.removeEventListener(`touch${type}`, ut._HTML.touchEventFn);
    //             });
    //         }, 100);
    //     });
    //     window.dispatchEvent(new Event("resize"));
    // }
    const ut = w.ut;
    const html = ut._HTML;
    const oldSetCanvasSie = ut._HTML.setCanvasSize;
    // ut._HTML.setCanvasSize = (function(width, height, webgl) {
    //     oldSetCanvasSie(800, 600, webgl);
    // });

    // const intervalID = setInterval(() => {
    //     const w = (window as any);
    //     const ut = w.ut;
    //     if (ut._HTML.canvasElement && w.known_ut_HTML !== ut._HTML) {
    //         w.known_ut_HTML = ut._HTML;
    //         clearInterval(intervalID);
    //         ut._HTML.setCanvasSize(800, 600, "gl");
    //     }
    // }, 0);
})();

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
