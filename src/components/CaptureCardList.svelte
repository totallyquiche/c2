<script lang="ts">
    import type { Capture } from '$types/Capture';
    import CaptureCard from './CaptureCard.svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';

    const { list } = $props();

    const captures = getContext<Writable<Capture[]>>('captures');

    let deleteQueue = writable(new Set<string>());

    const handleDelete = async (capture: Capture) => {
        if (!capture.id) {
            captures.update((captures: Capture[]) =>
                captures.filter((currentCapture: Capture) => currentCapture !== capture)
            );
            return;
        }

        deleteQueue.update((queue) => {
            queue.add(capture.id);
            return queue;
        });

        const response = await fetch('/api/capture', {
            method: 'DELETE',
            body: JSON.stringify({ capture })
        });

        if (response.ok) {
            captures.update((captures: Capture[]) =>
                captures.filter((c: Capture) => c.id !== capture.id)
            );

            deleteQueue.update((queue) => {
                queue.delete(capture.id);
                return queue;
            });
        } else {
            throw new Error('Failed to delete capture');
        }
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
                onclick={() => {
                    captures.update((captures: Capture[]) => [
                        { id: '', name: '', listId: list.id } satisfies Capture,
                        ...captures
                    ]);
                }}
            >
                +
            </button>
        </div>
    </div>

    <ul class="rounded-b-xs bg-green-200 pt-4 pb-8">
        {#each $captures.filter((c: Capture) => c.listId === list.id) as capture, index (capture.id || index)}
            <li class="p-2 px-4">
                <CaptureCard {capture} {handleDelete} />
            </li>
        {/each}
    </ul>
</section>
