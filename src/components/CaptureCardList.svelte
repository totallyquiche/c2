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
        if (!capture.id) return;

        if (!confirm('Are you sure you want to delete this capture?')) return;

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
        <button
            class="rounded-full p-2 text-xl hover:bg-green-400 focus:bg-green-400 active:bg-green-500"
        >
            +
        </button>
    </div>

    <ul class="rounded-b-xs bg-green-200 pt-4 pb-8">
        {#each $captures.filter((c: Capture) => c.listId === list.id) as capture}
            <li class="p-2 px-4">
                <CaptureCard {capture} {handleDelete} />
            </li>
        {/each}
    </ul>
</section>
