import { Vec3 } from "cc";

import { WeaponController } from "../WeaponController";
import { IShotPattern } from "./IShotPattern";

export class SingleShotPattern
    implements IShotPattern {

    public fire(
        weapon: WeaponController,
        direction: Vec3
    ): void {

        weapon.spawnProjectile(direction);
    }
}