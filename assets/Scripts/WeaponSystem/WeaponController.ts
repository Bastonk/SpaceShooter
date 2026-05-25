import {
    _decorator,
    Component,
    Node,
    Vec3,
    Enum,
    Prefab
} from "cc";

import { WeaponData }
    from "./WeaponData";

import { ProjectileData }
    from "./ProjectileData";

import { ProjectilePoolSystem }
    from "./behaviors/ProjectilePoolSystem";

import { IShotPattern }
    from "./patterns/IShotPattern";

import { SingleShotPattern }
    from "./patterns/SingleShotPattern";

import { SpreadShotPattern }
    from "./patterns/SpreadShotPattern";

import { FactionType }
    from "./FactionType";

import { IProjectileBehavior }
    from "./behaviors/IProjectileBehavior";

export enum ShotPatternType {

    Single = 0,

    Spread = 1,
}

const { ccclass, property } =
    _decorator;

@ccclass("WeaponController")
export class WeaponController
    extends Component {

    @property(Node)
    private muzzle:
        Node | null = null;

    @property({
        type: Enum(FactionType)
    })
    private faction:
        FactionType =
        FactionType.Player;

    // =========================
    // Pattern
    // =========================

    @property({
        type: Enum(ShotPatternType)
    })
    private patternType =
        ShotPatternType.Single;

    @property
    private spreadCount = 5;

    @property
    private spreadAngle = 15;

    // =========================
    // Weapon Stats
    // =========================

    @property
    private fireRate = 8;

    // =========================
    // Projectile Stats
    // =========================

    @property
    private projectileSpeed = 2000;

    @property
    private projectileLifetime = 2;

    @property
    private projectileDamage = 1;

    @property(Prefab)
    private projectilePrefab:
        Prefab | null = null;
    // =========================
    // Runtime
    // =========================

    private _weaponData:
        WeaponData | null = null;

    private _cooldownTimer = 0;

    private _fireInterval = 0;

    private _shotPattern:
        IShotPattern | null = null;

    private _behaviors:
        IProjectileBehavior[] = [];

        private projectilePool:
        ProjectilePoolSystem | null = null;


    // =========================
    // Lifecycle
    // =========================

    protected start(): void {

        this.buildWeaponData();

        this.buildShotPattern();
    }

    protected update(
        deltaTime: number
    ): void {

        this.updateCooldown(
            deltaTime
        );
    }

    // =========================
    // Setup
    // =========================
    public setProjectilePool(
    pool: ProjectilePoolSystem
    ): void {

        this.projectilePool = pool;
    }

    private buildWeaponData(): void {

        const projectileData:
            ProjectileData = {

            speed:
                this.projectileSpeed,

            lifetime:
                this.projectileLifetime,

            damage:
                this.projectileDamage
        };

        this._weaponData = {

            fireRate:
                this.fireRate,

            projectileData
        };

        this._fireInterval =
            1 / this.fireRate;
    }

    private buildShotPattern(): void {

        switch (
        this.patternType
        ) {

            case ShotPatternType.Single:

                this._shotPattern =
                    new SingleShotPattern();

                break;

            case ShotPatternType.Spread:

                this._shotPattern =
                    new SpreadShotPattern(
                        this.spreadCount,
                        this.spreadAngle
                    );

                break;
        }
            console.log(
        this._shotPattern);
    }

    // =========================
    // Cooldown
    // =========================

    private updateCooldown(
        deltaTime: number
    ): void {

        if (
            this._cooldownTimer > 0
        ) {

            this._cooldownTimer -=
                deltaTime;
        }
    }

    private canFire(): boolean {

        if (!this._weaponData) {
            return false;
        }

        return (
            this._cooldownTimer <= 0
        );
    }

    // =========================
    // Public API
    // =========================

    public tryFire(
        direction: Vec3
    ): boolean {

        if (!this.canFire()) {
            return false;
        }

        this.fire(direction);

        return true;
    }

    public spawnProjectile(
        direction: Vec3
    ): void {

        if (
            !this._weaponData ||
            !this.projectilePool ||
            !this.muzzle ||
            !this.projectilePrefab
        ) {
            return;
        }

        this.projectilePool
            .spawnProjectile(
                this.projectilePrefab,
                
                this.muzzle
                    .worldPosition,

                direction,

                this._weaponData
                    .projectileData,

                this._behaviors,

                this.faction
            );
    }

    // =========================
    // Internal Fire
    // =========================

    private fire(
        direction: Vec3
    ): void {

        if (
            !this._shotPattern
        ) {
            return;
        }

        this._cooldownTimer =
            this._fireInterval;

        this._shotPattern.fire(
            this,
            direction
        );
    }
}