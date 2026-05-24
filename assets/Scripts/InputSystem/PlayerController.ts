import {
    _decorator,
    Component,
    Vec3,
    Quat,
    view,
    Node,
    UITransform
} from 'cc';

import { InputManager } from './InputManager';
import { WeaponController } from "../WeaponSystem/WeaponController";


const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property
    maxSpeed = 500;
    @property
    acceleration = 2200;

    @property(WeaponController)
    private weapon: WeaponController | null = null;

    private readonly _shootDirection =
        new Vec3();

    private velocity = new Vec3();
    private targetVelocity = new Vec3();

    @property(UITransform)
    playerGraphic;

    private minX = 0;
    private maxX = 0;

    private minY = 0;
    private maxY = 0;

    start() {

        const visibleSize =
            view.getVisibleSize();

        const transform =
            this.playerGraphic;

        const halfWidth =
            transform.width / 2;

        const halfHeight =
            transform.height / 2;

        this.minX =
            -visibleSize.width / 2 + halfWidth;

        this.maxX =
            visibleSize.width / 2 - halfWidth;

        this.minY =
            -visibleSize.height / 2 + halfHeight;

        this.maxY =
            visibleSize.height / 2 - halfHeight;
    }

    update(deltaTime: number) {

        const move =
            InputManager.instance.actions.move;

        this.targetVelocity.set(
            move.x * this.maxSpeed,
            move.y * this.maxSpeed,
            0
        );

        // smooth interpolation
        Vec3.lerp(
            this.velocity,
            this.velocity,
            this.targetVelocity,
            this.acceleration * deltaTime
        );

        const position =
            this.node.position.add(this.velocity);

        position.x =
            Math.max(this.minX,
                Math.min(this.maxX, position.x));

        position.y =
            Math.max(this.minY,
                Math.min(this.maxY, position.y));

        this.node.setPosition(position);

        const aim = InputManager.instance.actions.aim;
        const angle = Math.atan2(aim.y, aim.x) * 180 / Math.PI;

        this.node.angle = angle;

        const actions = InputManager.instance.actions;

        if (actions.shoot) {
            this._shootDirection.set(aim.x, aim.y, 0);
            this.weapon.tryFire(this._shootDirection);
            console.log("Shoot!");
        };
    }
}