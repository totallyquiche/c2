import type { List } from '$types/List';
import { writable } from 'svelte/store';

export const lists = writable<List[]>([]);
