import { ProjectileController } from "../ProjectileController";

export interface IProjectileBehavior {
    onInitialize?(projectile: ProjectileController): void;

    update?(
        projectile: ProjectileController,
        deltaTime: number
    ): void;

    onDespawn?(projectile: ProjectileController): void;
}