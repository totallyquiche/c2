import type { Capture } from '$types/Capture';
import { writable } from 'svelte/store';

export const captures = writable<Capture[]>([]);
