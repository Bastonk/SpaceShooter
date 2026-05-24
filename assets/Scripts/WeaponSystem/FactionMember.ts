import { _decorator, Component, Node } from 'cc';
import { FactionType } from './FactionType';
const { ccclass, property } = _decorator;

@ccclass('FactionMember')
export class FactionMember extends Component {

    @property
    public faction: FactionType = FactionType.Neutral;
}

