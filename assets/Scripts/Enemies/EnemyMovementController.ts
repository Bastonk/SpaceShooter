import {
    _decorator,
    Component
} from "cc";

const { ccclass } = _decorator;

import { EnemyStats } from "./EnemyStats";

@ccclass("EnemyMovementController")
export class EnemyMovementController
    extends Component {

    private _stats : EnemyStats | null = null;

    protected onLoad(): void {

        this._stats =
            this.getComponent(
                EnemyStats
            );
    }

    update(deltaTime: number): void {

    }
}