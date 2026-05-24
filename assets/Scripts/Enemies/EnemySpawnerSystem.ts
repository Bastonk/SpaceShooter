import {
    _decorator,
    Component,
    Prefab,
    instantiate,
    Node,
    Vec3,
    randomRange
} from "cc";

import { EnemyController }
    from "./EnemyController";

const { ccclass, property } = _decorator;

@ccclass("EnemySpawnerSystem")
export class EnemySpawnerSystem
    extends Component {

    @property(Prefab)
    private enemyPrefab:
        Prefab | null = null;

    @property(Node)
    private enemyContainer:
        Node | null = null;

    @property
    private spawnInterval = 1.5;

    @property
    private spawnY = 700;

    @property
    private minX = -400;

    @property
    private maxX = 400;

    private _spawnTimer = 0;

    update(deltaTime: number): void {

        this._spawnTimer += deltaTime;

        if (
            this._spawnTimer <
            this.spawnInterval
        ) {
            return;
        }

        this._spawnTimer = 0;

        this.spawnEnemy();
    }

    private spawnEnemy(): void {

        if (
            !this.enemyPrefab ||
            !this.enemyContainer
        ) {
            return;
        }

        const enemyNode =
            instantiate(this.enemyPrefab);

        this.enemyContainer.addChild(
            enemyNode
        );
        enemyNode.active = true;
        const spawnPosition =
            new Vec3(
                randomRange(
                    this.minX,
                    this.maxX
                ),
                this.spawnY,
                0
            );

        enemyNode.setPosition(
            spawnPosition
        );

        const enemy =
            enemyNode.getComponent(
                EnemyController
            );

        enemy?.initialize({
            maxHealth: 3,
            moveSpeed: 200
        });
    }
}