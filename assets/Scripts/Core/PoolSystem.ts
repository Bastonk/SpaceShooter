import {
    Node,
    Prefab,
    instantiate
} from "cc";

export class PoolSystem {

    private readonly _pools =
        new Map<string, Node[]>();

    // =========================
    // Public
    // =========================

    public prewarm(
        prefab: Prefab,
        count: number
    ): void {

        const pool =
            this.getPool(prefab);

        const missingCount =
            count - pool.length;

        if (missingCount <= 0) {
            return;
        }

        for (
            let i = 0;
            i < missingCount;
            i++
        ) {

            const node =
                instantiate(prefab);

            node.active = false;

            pool.push(node);
        }
    }

    public getNode(
        prefab: Prefab
    ): Node {

        const pool =
            this.getPool(prefab);

        for (const node of pool) {

            if (!node.active) {

                return node;
            }
        }

        const newNode =
            instantiate(prefab);

        newNode.active = false;

        pool.push(newNode);

        return newNode;
    }

    public releaseNode(
        node: Node
    ): void {

        node.active = false;

        node.removeFromParent();
    }

    // =========================
    // Internal
    // =========================

    private getPool(
        prefab: Prefab
    ): Node[] {

        const key =
            prefab.name;

        let pool =
            this._pools.get(key);

        if (!pool) {

            pool = [];

            this._pools.set(
                key,
                pool
            );
        }

        return pool;
    }
}