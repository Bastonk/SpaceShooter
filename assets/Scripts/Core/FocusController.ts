import {
    _decorator,
    Component,
    director
} from 'cc';

const { ccclass } = _decorator;

@ccclass('FocusController')
export class FocusController extends Component {

    private canvas: HTMLCanvasElement | null = null;

    start() {

        this.canvas =
            document.getElementById(
                'GameCanvas'
            ) as HTMLCanvasElement;

        if (!this.canvas) {
            return;
        }

        // allow focus
        this.canvas.tabIndex = 1;

        this.canvas.addEventListener(
            'focus',
            this.onFocus
        );

        this.canvas.addEventListener(
            'blur',
            this.onBlur
        );
    }

    onDestroy() {

        if (!this.canvas) {
            return;
        }

        this.canvas.removeEventListener(
            'focus',
            this.onFocus
        );

        this.canvas.removeEventListener(
            'blur',
            this.onBlur
        );
    }

    private onFocus = () => {

        director.resume();
    };

    private onBlur = () => {

        director.pause();
    };
}