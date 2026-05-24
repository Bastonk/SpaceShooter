import {
    _decorator,
    Component
} from 'cc';

const { ccclass } = _decorator;

@ccclass('CursorController')
export class CursorController extends Component {

    onLoad() {

        const canvas =
            document.getElementById(
                'GameCanvas'
            );

        if (!canvas) {
            return;
        }

        canvas.style.cursor = 'none';
    }

    onDestroy() {

        const canvas =
            document.getElementById(
                'GameCanvas'
            );

        if (!canvas) {
            return;
        }

        canvas.style.cursor = 'default';
    }
}