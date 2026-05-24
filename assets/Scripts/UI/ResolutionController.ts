import {
    _decorator,
    Component
} from 'cc';

const { ccclass } = _decorator;

@ccclass('ResolutionController')
export class ResolutionController extends Component {

    private readonly aspectRatio = 16 / 9;

    private readonly browserUsage = 0.8;

    start() {

        this.updateCanvasSize();

        window.addEventListener(
            'resize',
            this.updateCanvasSize
        );
    }

    onDestroy() {

        window.removeEventListener(
            'resize',
            this.updateCanvasSize
        );
    }

    private updateCanvasSize = () => {

        const container =
            document.getElementById(
                'Cocos3dGameContainer'
            );

        if (!container) {
            return;
        }

        const browserWidth =
            window.innerWidth;

        const browserHeight =
            window.innerHeight;

        let width =
            browserWidth *
            this.browserUsage;

        let height =
            width / this.aspectRatio;

        // fit vertically if needed
        if (
            height >
            browserHeight *
            this.browserUsage
        ) {

            height =
                browserHeight *
                this.browserUsage;

            width =
                height *
                this.aspectRatio;
        }

        container.style.width =
            `${width}px`;

        container.style.height =
            `${height}px`;

        container.style.position =
            'absolute';

        container.style.left =
            `${(browserWidth - width) * 0.5}px`;

        container.style.top =
            `${(browserHeight - height) * 0.5}px`;
    };
}