import { Vec3 } from "cc";

import { WeaponController } from "../WeaponController";

export interface IShotPattern {

    fire(
        weapon: WeaponController,
        direction: Vec3
    ): void;
}