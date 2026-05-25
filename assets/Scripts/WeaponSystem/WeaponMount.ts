import {
    _decorator,
    Component,
    Node,
    Prefab,
    instantiate,
    Vec3
} from "cc";

import { WeaponController }
from "./WeaponController";

import { ProjectilePoolSystem }
from "./behaviors/ProjectilePoolSystem";

const { ccclass, property }
    = _decorator;

@ccclass("WeaponMount")
export class WeaponMount
extends Component {

    @property(Prefab)
    private weaponPrefab:
        Prefab | null = null;

    @property(Node)
    private weaponSocket:
        Node | null = null;

    @property(ProjectilePoolSystem)
    private projectilePool:
        ProjectilePoolSystem
        | null = null;

    private _currentWeapon:
        WeaponController
        | null = null;

    protected start(): void {

        this.spawnWeapon();
    }

    private spawnWeapon(): void {

        if (
            !this.weaponPrefab ||
            !this.weaponSocket
        ) {
            return;
        }

        const weaponNode =
            instantiate(
                this.weaponPrefab
            );

        this.weaponSocket.addChild(
            weaponNode
        );

        weaponNode.setPosition(
            Vec3.ZERO
        );

        this._currentWeapon =
            weaponNode.getComponent(
                WeaponController
            );

        if (
            this._currentWeapon &&
            this.projectilePool
        ) {

            this._currentWeapon
                .setProjectilePool(
                    this.projectilePool
                );
        }
    }

    public setProjectilePool(
    pool: ProjectilePoolSystem
    ): void {

    this.projectilePool = pool;

    this._currentWeapon
        ?.setProjectilePool(pool);
}
    public tryFire(
        direction: Vec3
    ): boolean {

        if (
            !this._currentWeapon
        ) {
            return false;
        }

        return this._currentWeapon
            .tryFire(direction);
    }

    public getWeapon():
        WeaponController | null {

        return this._currentWeapon;
    }
}