import {
    _decorator,
    Component,
    Vec3,
    Collider2D,
    Contact2DType,
    IPhysics2DContact
} from "cc";

import { ProjectileData } from "./ProjectileData";
import { IProjectileBehavior } from "./behaviors/IProjectileBehavior";
import { DamageReceiver } from "./behaviors/DamageReceiver";
import { FactionType } from "./FactionType";
import { FactionMember } from "./FactionMember";

const { ccclass } = _decorator;

@ccclass("ProjectileController")
export class ProjectileController extends Component {

    private _direction: Vec3 = new Vec3();

    private _velocity: Vec3 = new Vec3();

    private _lifeTimer: number = 0;

    private _isActive: boolean = false;

    private _data: ProjectileData | null = null;

    private _releaseCallback:
        ((projectile: ProjectileController) => void)
        | null = null;

    private _behaviors: IProjectileBehavior[] = [];

    private static readonly RAD_TO_DEG =
        180 / Math.PI;

    private _faction: FactionType = FactionType.Neutral;

    private _collider: Collider2D | null = null;

    private onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ): void {

        if (!this._isActive || !this._data) {
            return;
        }

        const targetFaction = otherCollider.getComponent(FactionMember);

        if (targetFaction && targetFaction.faction === this._faction) { return }

        const damageReceiver =
            otherCollider.getComponent(DamageReceiver);

        if (!damageReceiver) {
            return
        }

        damageReceiver.takeDamage(this._data.damage);

        this.scheduleOnce(() => {

            this.despawn();

        }, 0);
    }

    protected onLoad(): void {

        this._collider =
            this.getComponent(Collider2D);

        if (!this._collider) {
            return;
        }

        this._collider.on(
            Contact2DType.BEGIN_CONTACT,
            this.onBeginContact,
            this
        );
    }

    public initialize(
        data: ProjectileData,
        releaseCallback: (projectile: ProjectileController) => void,
        direction: Vec3,
        behaviors: IProjectileBehavior[] = [],
        faction
    ): void {

        this._data = data;
        this._releaseCallback = releaseCallback;

        this._faction = faction;

        this._direction.set(direction);
        this._direction.normalize();
        this.updateRotation();

        Vec3.multiplyScalar(
            this._velocity,
            this._direction,
            data.speed
        );

        this._lifeTimer = data.lifetime;

        this._behaviors = behaviors;

        this._isActive = true;

        for (const behavior of this._behaviors) {
            behavior.onInitialize?.(this);
        }
    }

    protected update(deltaTime: number): void {

        if (!this._isActive || !this._data) {
            return;
        }

        this.updateMovement(deltaTime);

        for (const behavior of this._behaviors) {
            behavior.update?.(this, deltaTime);
        }

        this.updateLifetime(deltaTime);
    }

    private updateMovement(deltaTime: number): void {

        const movement = new Vec3();

        Vec3.multiplyScalar(
            movement,
            this._velocity,
            deltaTime
        );

        this.node.setPosition(
            this.node.position.x + movement.x,
            this.node.position.y + movement.y,
            this.node.position.z + movement.z
        )
    }

    private updateLifetime(deltaTime: number): void {

        this._lifeTimer -= deltaTime;

        if (this._lifeTimer <= 0) {
            this.despawn();
        }
    }

    public despawn(): void {

        if (!this._isActive) {
            return;
        }

        this._isActive = false;

        for (const behavior of this._behaviors) {
            behavior.onDespawn?.(this);
        }

        this._releaseCallback?.(this);
    }

    public get velocity(): Vec3 {
        return this._velocity;
    }

    public get direction(): Vec3 {
        return this._direction;
    }

    public get data(): ProjectileData | null {
        return this._data;
    }

    private updateRotation(): void {

        const angle =
            Math.atan2(
                this._direction.y,
                this._direction.x
            );

        const degrees =
            angle * ProjectileController.RAD_TO_DEG;

        this.node.setRotationFromEuler(
            0,
            0,
            degrees
        );
    }
}