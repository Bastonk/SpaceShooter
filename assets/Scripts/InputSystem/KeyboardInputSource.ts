import {
    _decorator,
    Component,
    input,
    Input,
    EventKeyboard,
    EventMouse,
    KeyCode
} from 'cc';

import { InputManager } from './InputManager';

const { ccclass } = _decorator;

@ccclass('KeyboardInputSource')
export class KeyboardInputSource extends Component {

    private keys = new Set<KeyCode>();

    onLoad() {

        input.on(
            Input.EventType.KEY_DOWN,
            this.onKeyDown,
            this
        );

        input.on(
            Input.EventType.KEY_UP,
            this.onKeyUp,
            this
        );

        input.on(
            Input.EventType.MOUSE_DOWN,
            this.onMouseDown,
            this
        );

        input.on(
            Input.EventType.MOUSE_UP,
            this.onMouseUp,
            this
        );
    }

    onDestroy() {

        input.off(
            Input.EventType.KEY_DOWN,
            this.onKeyDown,
            this
        );

        input.off(
            Input.EventType.KEY_UP,
            this.onKeyUp,
            this
        );
    }

    onMouseDown(event: EventMouse) {

        if (event.getButton() !== EventMouse.BUTTON_LEFT) {
            return;
        }

        InputManager.instance.actions.shoot = true;
    }

    onMouseUp(event: EventMouse) {

        if (event.getButton() !== EventMouse.BUTTON_LEFT) {
            return;
        }

        InputManager.instance.actions.shoot = false;
    }

    onKeyDown(event: EventKeyboard) {
        this.keys.add(event.keyCode);
    }

    onKeyUp(event: EventKeyboard) {
        this.keys.delete(event.keyCode);
    }

    update() {

        const actions =
            InputManager.instance.actions;

        // reset values
        actions.move.set(0, 0);

        // horizontal
        if (this.keys.has(KeyCode.KEY_A)) {
            actions.move.x -= 1;
        }

        if (this.keys.has(KeyCode.KEY_D)) {
            actions.move.x += 1;
        }

        // vertical
        if (this.keys.has(KeyCode.KEY_W)) {
            actions.move.y += 1;
        }

        if (this.keys.has(KeyCode.KEY_S)) {
            actions.move.y -= 1;
        }

        // normalize diagonal movement
        actions.move.normalize();

        // dash
        actions.dash =
            this.keys.has(KeyCode.SHIFT_LEFT);
    }
}