import {
    _decorator,
    Component
} from "cc";

import { DamageReceiver } from "../WeaponSystem/behaviors/DamageReceiver";
import { FactionMember } from "../WeaponSystem/FactionMember";
import { EnemyStats } from "./EnemyStats";

const { ccclass } = _decorator;

@ccclass("EnemyController")
export class EnemyController extends Component {

    private _damageReceiver: DamageReceiver | null = null;

    protected onEnable(): void
    {
        this._damageReceiver = this.getComponent(DamageReceiver);
        const stats = this.getComponent(EnemyStats);
        if (!stats) return;

        this._damageReceiver?.initialize(stats.maxHealth);
    }
}