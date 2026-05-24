import {
    _decorator,
    Component
} from "cc";

const { ccclass } = _decorator;

@ccclass("EnemyMovementController")
export class EnemyMovementController
    extends Component {

    private _speed = 300;

    update(deltaTime: number): void {

    }
}