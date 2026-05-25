import {
    _decorator,
    Component
} from "cc";

const { ccclass, property }
    = _decorator;

@ccclass("EnemyStats")
export class EnemyStats
    extends Component {

    @property
    public maxHealth = 3;

    @property
    public moveSpeed = 200;
}