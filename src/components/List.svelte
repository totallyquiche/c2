<script lang="ts">
    import type { Capture } from '$types/Capture';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    const captures = getContext<Writable<Capture[]>>('captures');

    function handleDelete(id: string) {
        console.log('Delete capture:', id);
    }
</script>

<ul class="flex flex-col gap-5">
    {#each $captures as capture}
        <li class="text-light flex items-center justify-between gap-4">
            <span>{capture.name}</span>
            <button
                type="button"
                class="text-accent rounded px-3 py-1 text-sm hover:bg-red-50"
                aria-label="Delete {capture.name}"
                on:click={() => capture.id && handleDelete(capture.id)}
            >
                Delete
            </button>
        </li>
    {/each}
</ul>
