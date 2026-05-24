import {
    _decorator,
    Component
} from "cc";

import { EnemyData } from "./EnemyData";
import { DamageReceiver } from "../WeaponSystem/behaviors/DamageReceiver";
import { FactionMember } from "../WeaponSystem/FactionMember";

const { ccclass } = _decorator;

@ccclass("EnemyController")
export class EnemyController extends Component {

    private _data: EnemyData | null = null;

    private _currentHealth: number = 0;

    private _damageReceiver: DamageReceiver | null = null;

    protected onLoad(): void {
        this._damageReceiver = this.getComponent(DamageReceiver);
    }

    public initialize(data: EnemyData): void {

        this._data = data;

        this._damageReceiver?.initialize(
            data.maxHealth);

        const factionMember = this.getComponent(FactionMember);
        console.log(factionMember.faction);

    }
}