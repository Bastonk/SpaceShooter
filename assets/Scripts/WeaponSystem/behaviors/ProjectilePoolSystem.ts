import {
    _decorator,
    Component,
    Node,
    Prefab,
    Vec3
} from "cc";

import { PoolSystem }
from "../../Core/PoolSystem";

import { ProjectileController }
from "../ProjectileController";

import { ProjectileData }
from "../ProjectileData";

import { IProjectileBehavior }
from "../behaviors/IProjectileBehavior";

import { FactionType }
from "../FactionType";

const { ccclass }
    = _decorator;

@ccclass("ProjectilePoolSystem")
export class ProjectilePoolSystem
extends Component {

    private _pool =
        new PoolSystem();

    // =========================
    // Public
    // =========================

    public prewarm(
        prefab: Prefab,
        count: number
    ): void {

        this._pool.prewarm(
            prefab,
            count
        );
    }

    public spawnProjectile(

        projectilePrefab: Prefab,

        position: Vec3,

        direction: Vec3,

        data: ProjectileData,

        behaviors:
            IProjectileBehavior[] = [],

        faction: FactionType

    ): ProjectileController | null {

        const node =
            this._pool.getNode(
                projectilePrefab
            );

        node.setParent(this.node);

        node.setWorldPosition(
            position
        );

        node.active = true;

        const projectile =
            node.getComponent(
                ProjectileController
            );

        if (!projectile) {

            return null;
        }

        projectile.initialize(

            data,

            this.releaseProjectile
                .bind(this),

            direction,

            behaviors,

            faction
        );

        return projectile;
    }

    public releaseProjectile(
        projectile:
            ProjectileController
    ): void {

        this._pool.releaseNode(
            projectile.node
        );
    }
}