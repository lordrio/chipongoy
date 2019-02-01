
namespace game {

    /** New System */
    ut.executeAfter(ut.Shared.InputFence)
    ut.executeBefore(ut.Shared.UserCodeStart)
    export class MouseSpriteInteractionSystem extends ut.ComponentSystem {
        
        OnUpdate():void {
            let deltaTime = this.scheduler.deltaTime();
            this.world.forEach([ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale, game.MouseSpriteInteractionData],
                    (pos, scale, data) => {
                        if(data.isInteractable) {
                            let pointerWorldPosition = InputService.getPointerWorldPosition(this.world, data.camera);
                            let topLeft: Vector2 = new Vector2(pos.position.x - scale.scale.x/2, pos.position.y + scale.scale.y/2);
                            let bottomRight: Vector2 = new Vector2(pos.position.x + scale.scale.x/2, pos.position.y - scale.scale.y/2);

                            data.hover = false;
                            if(pointerWorldPosition.x >= topLeft.x && pointerWorldPosition.x <= bottomRight.x &&
                                pointerWorldPosition.y <= topLeft.y && pointerWorldPosition.y >= bottomRight.y) {
                                    let down = ut.Runtime.Input.getMouseButtonDown(data.mouseButtonCode);
                                    let up = ut.Runtime.Input.getMouseButtonUp(data.mouseButtonCode);
                                    let held = ut.Runtime.Input.getMouseButton(data.mouseButtonCode);

                                    data.hover = true;
                                    data.lastDown = data.down;
                                    data.down = held;

                                    let prevDrag = data.drag;
                                    if(down) {
                                        data.drag = false;
                                        data.startDrag = false;
                                        data.tresholdCounter = 0;
                                    } else if(held) {
                                        data.tresholdCounter += deltaTime;

                                        if (data.tresholdCounter > data.clickDragTreshold) {
                                            data.drag = true;
                                            if (prevDrag != data.drag) {
                                                data.startDrag = true;
                                            } else {
                                                data.startDrag = false;
                                            }
                                        }
                                    }
                                    
                                    if(up && !data.drag) {
                                        data.clicked = true;
                                    } if(up && data.drag) {
                                        data.drag = false;
                                        data.startDrag = false;
                                    } else {
                                        data.clicked = false;
                                    }
                                }
                        } else {
                            // disabled
                            data.hover = false;
                            data.clicked = false;
                            data.down = false;
                            data.lastDown = false;
                            data.drag = false;
                            data.startDrag = false;
                            data.tresholdCounter = 0;
                        }
                    });
        }
    }
}
