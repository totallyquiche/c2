/// <reference types="svelte-clerk/env" />

declare global {
    namespace App {
        interface Locals {
            auth: () => import('@clerk/backend').AuthObject;
            currentUser: () => Promise<import('@clerk/backend').User | null>;
        }
    }
}

export {};
