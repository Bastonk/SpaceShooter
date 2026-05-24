import {
    _decorator,
    Component,
    Node,
    Vec3
} from "cc";

import { WeaponData } from "./WeaponData";
import { ProjectilePoolSystem } from "./behaviors/ProjectilePoolSystem";
import { IShotPattern } from "./patterns/IShotPattern";
import { SingleShotPattern } from "./patterns/SingleShotPattern";
import { FactionType } from "./FactionType";

const { ccclass, property } = _decorator;

@ccclass("WeaponController")
export class WeaponController extends Component {

    @property(Node)
    private muzzle: Node | null = null;

    @property(ProjectilePoolSystem)
    private projectilePool: ProjectilePoolSystem | null = null;

    @property
    private faction: FactionType = FactionType.Player;

    private _weaponData: WeaponData | null = null;

    private _cooldownTimer: number = 0;

    private _fireInterval: number = 0;

    private _shootPattern: IShotPattern | null = null;

    private _behaviors: any[] = [];


protected start(): void {

    this.initialize({
        fireRate: 8,

        projectileData: {
            speed: 900,
            lifetime: 2,
            damage: 1
        },
    },
        new SingleShotPattern()
    );
}


    public initialize(data: WeaponData, shotPattern: IShotPattern): void {

        this._weaponData = data;

        this._cooldownTimer = 0;

        this._fireInterval = 1 / data.fireRate;

        this._shootPattern = shotPattern;
    }

    protected update(deltaTime: number): void {

        this.updateCooldown(deltaTime);
    }

    private updateCooldown(deltaTime: number): void {

        if (this._cooldownTimer > 0) {

            this._cooldownTimer -= deltaTime;
        }
    }

    public tryFire(direction: Vec3): boolean {

        if (!this.canFire()) {
            return false;
        }

        this.fire(direction);

        return true;
    }

    private canFire(): boolean {

        if (!this._weaponData) {
            return false;
        }

        return this._cooldownTimer <= 0;
    }

    private fire(direction: Vec3): void {

        if (
            !this._weaponData ||
            !this.projectilePool ||
            !this.muzzle ||
            !this._shootPattern
        ) {
            return;
        }

        this._cooldownTimer =
            this._fireInterval;

        this._shootPattern.fire(this, direction);
    }

    public spawnProjectile(direction: Vec3): void {

    if (
        !this._weaponData ||
        !this.projectilePool ||
        !this.muzzle
    ) {
        return;
    }

    this.projectilePool.spawnProjectile(
        this.muzzle.worldPosition,
        direction,
        this._weaponData.projectileData,
        this._behaviors = [],
        this.faction
        );

    }
}