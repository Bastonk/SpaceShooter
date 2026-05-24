import {
    _decorator,
    Component
} from 'cc';

import { InputActions } from './InputActions';

const { ccclass } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {

    static instance: InputManager;

    actions = new InputActions();

    onLoad() {

        if (InputManager.instance) {
            this.destroy();
            return;
        }

        InputManager.instance = this;
    }
}