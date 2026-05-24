import {
    _decorator,
    Component,
    input,
    Input,
    EventMouse,
    Vec2,
    Camera,
    Node,
    Vec3,
    UITransform
} from 'cc';

import { InputManager } from './InputManager';
import { PlayerController } from './PlayerController';

const { ccclass, property } = _decorator;

@ccclass('PlayerAimController')
export class PlayerAimController extends Component {

    @property(Camera)
    MainCamera: Camera = null!;
    @property(UITransform) canvasTransform: UITransform = null!;   
    private screenMouse = new Vec3();

    private localPos = new Vec3();

    @property(PlayerController) player;
    @property(UITransform) targetGraphic;

    start() {

        input.on(
            Input.EventType.MOUSE_MOVE,
            this.onMouseMove,
            this
        );
    }

    onDestroy() {

        input.off(
            Input.EventType.MOUSE_MOVE,
            this.onMouseMove,
            this
        );
    }

    onMouseMove(event: EventMouse) {

        if (!this.MainCamera) return;

        if (!this.player) return;

        const mousePos =
            event.getUILocation();


        this.screenMouse.set(mousePos.x, mousePos.y,0);

        this.localPos =
            this.canvasTransform
                .convertToNodeSpaceAR(
                    this.screenMouse
                );

        this.targetGraphic.node.setPosition(this.localPos);


    }

    update(deltaTime: number) {
        const direction = new Vec2(
           this.localPos.x - this.player.node.position.x,
            this.localPos.y - this.player.node.position.y
        );

        direction.normalize();

        InputManager.instance.actions.aim.set(direction.x,direction.y);
    }
}