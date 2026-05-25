import { Vec3, Quat } from "cc";

import { IShotPattern }
    from "./IShotPattern";

import { WeaponController }
    from "../WeaponController";

export class SpreadShotPattern
    implements IShotPattern {

    constructor(

        private projectileCount = 3,

        private angleStep = 15

    ) { }

    public fire(
        weapon: WeaponController,
        direction: Vec3
    ): void {

        const halfSpread =
            (this.projectileCount - 1)
            * 0.5;

        for (
            let i = 0;
            i < this.projectileCount;
            i++
        ) {

            const angle =
                (i - halfSpread)
                * this.angleStep;

            const rotatedDirection =
                this.rotateDirection(
                    direction,
                    angle
                );

            weapon.spawnProjectile(
                rotatedDirection
            );
        }
    }

    private rotateDirection(
        direction: Vec3,
        angleDegrees: number
    ): Vec3 {

        const rotation =
            new Quat();

        Quat.fromEuler(
            rotation,
            0,
            0,
            angleDegrees
        );

        const result =
            new Vec3();

        Vec3.transformQuat(
            result,
            direction,
            rotation
        );

        result.normalize();

        return result;
    }
}