import {
    _decorator,
    Component
} from "cc";

const { ccclass } = _decorator;

@ccclass("DamageReceiver")
export class DamageReceiver
    extends Component {

    private _health = 1;

    public initialize(health: number): void {

        this._health = health;
    }

    public takeDamage(amount: number): void {

        this._health -= amount;
        console.log(`Damage taken: ${amount}, remaining health: ${this._health}`);
        if (this._health <= 0) {
            this.die();
        }
    }

    private die(): void {

        this.node.destroy();
    }
}