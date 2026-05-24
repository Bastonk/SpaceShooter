import {
    Node,
    Prefab,
    instantiate
} from "cc";

export class PoolSystem {

    private readonly _prefab: Prefab;

    private readonly _pool: Node[] = [];

    constructor(
        prefab: Prefab,
        initialSize: number = 10
    ) {
        this._prefab = prefab;

        this.prewarm(initialSize);
    }

    private prewarm(count: number): void {

        for (let i = 0; i < count; i++) {

            const node = instantiate(this._prefab);

            node.active = false;

            this._pool.push(node);
        }
    }

    public get(): Node {

        if (this._pool.length > 0) {

            return this._pool.pop()!;
        }

        const node = instantiate(this._prefab);

        node.active = false;

        return node;
    }

    public release(node: Node): void {

        node.active = false;

        node.removeFromParent();

        this._pool.push(node);
    }
}