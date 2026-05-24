import {
    _decorator,
    Component,
    Node,
    Prefab,
    Vec3
} from "cc";

import { PoolSystem } from "../../Core/PoolSystem";
import { ProjectileController } from "../ProjectileController";
import { ProjectileData } from "../ProjectileData";
import { IProjectileBehavior } from "../behaviors/IProjectileBehavior";

const { ccclass, property } = _decorator;

@ccclass("ProjectilePoolSystem")
export class ProjectilePoolSystem extends Component {

    @property(Prefab)
    private projectilePrefab: Prefab | null = null;

    @property
    private initialPoolSize: number = 50;

    private _pool: PoolSystem | null = null;

    protected onLoad(): void {

        if (!this.projectilePrefab) {
            return;
        }

        this._pool = new PoolSystem(
            this.projectilePrefab,
            this.initialPoolSize
        );
    }

    public spawnProjectile(
        position: Vec3,
        direction: Vec3,
        data: ProjectileData,
        behaviors: IProjectileBehavior[] = []
    ): ProjectileController | null {

        if (!this._pool) {
            return null;
        }

        const node = this._pool.get();

        node.setParent(this.node);

        node.setWorldPosition(position);

        node.active = true;

        const projectile =
            node.getComponent(ProjectileController);

        if (!projectile) {
            return null;
        }

        projectile.initialize(
            data,
            this.releaseProjectile.bind(this),
            direction,
            behaviors
        );

        return projectile;
    }

    public releaseProjectile(
        projectile: ProjectileController
    ): void {

        if (!this._pool) {
            return;
        }

        this._pool.release(projectile.node);
    }
}