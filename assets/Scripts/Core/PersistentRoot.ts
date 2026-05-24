import {
    _decorator,
    Component,
    director
} from 'cc';

const { ccclass } = _decorator;

@ccclass('PersistentRoot')
export class PersistentRoot extends Component {

    onLoad() {

        director.addPersistRootNode(
            this.node
        );
    }
}