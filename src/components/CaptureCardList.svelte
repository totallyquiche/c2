<script lang="ts">
    import type { Capture } from '$types/Capture';
    import CaptureCard from './CaptureCard.svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { v4 as uuidv4 } from 'uuid';
    import { dndzone } from 'svelte-dnd-action';
    import { flip } from 'svelte/animate';

    const { list } = $props();

    const captures = getContext<Writable<Capture[]>>('captures');

    const handleDelete = async (capture: Capture) => {
        captures.update((captures: Capture[]) =>
            captures.filter((c: Capture) => c.id !== capture.id)
        );

        const response = await fetch('/api/capture', {
            method: 'DELETE',
            body: JSON.stringify({ capture })
        });

        if (!response.ok) {
            captures.update((captures: Capture[]) => [capture, ...captures]);
            throw new Error('Failed to delete capture');
        }
    };

    const handleNew = async () => {
        const newCapture = { id: uuidv4(), name: '', listId: list.id } satisfies Capture;

        captures.update((captures: Capture[]) => [newCapture, ...captures]);
    };

    const handleUpsert = async (capture: Capture) => {
        const response = await fetch('/api/capture', {
            method: 'POST',
            body: JSON.stringify(capture)
        });

        captures.update((captures: Capture[]) =>
            captures.map((c: Capture) => (c.id === capture.id ? capture : c))
        );

        if (!response.ok) {
            throw new Error('Failed to update capture');
        }
    };

    const handleConsider = (event: CustomEvent<{ items: Capture[] }>) => {
        captures.update(() => event.detail.items);
    };

    const handleFinalize = (event: CustomEvent<{ items: Capture[] }>) => {
        captures.update(() => event.detail.items);

        // TODO: update the captures in the database
    };
</script>

<section>
    <div
        class="flex items-center justify-between rounded-t-xs bg-green-300 px-4 py-2 font-semibold text-yellow-900"
    >
        <h2>{list.name}</h2>
        <div>
            <button
                class="size-8 rounded-full text-lg hover:bg-yellow-300 active:bg-yellow-400"
                onclick={handleNew}
            >
                +
            </button>
        </div>
    </div>

    <ul
        class="rounded-b-xs bg-green-200 pt-4 pb-8"
        use:dndzone={{ items: $captures }}
        onconsider={handleConsider}
        onfinalize={handleFinalize}
    >
        {#each $captures.filter((capture: Capture) => capture.listId === list.id) as capture (capture.id)}
            <li class="m-2 mx-4" animate:flip={{ duration: 200 }}>
                <CaptureCard {capture} {handleDelete} {handleUpsert} />
            </li>
        {/each}
    </ul>
</section>
