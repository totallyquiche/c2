<script lang="ts">
    import type { Capture } from '$types/Capture';
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

<ul class="mx-2">
    {#each $captures.filter((c: Capture) => c.listId === list.id) as capture}
        <li class="flex items-center gap-2">
            <form method="post" action="/api/capture">
                <input type="hidden" name="id" value={capture.id} />
                <button
                    type="submit"
                    aria-label="Delete this capture"
                    onclick={(event: MouseEvent) => {
                        event.preventDefault();
                        handleDelete(capture);
                    }}
                    class="text-gray-400 hover:text-gray-300 focus:text-gray-200 focus:outline-none active:text-gray-200"
                >
                    [X]
                </button>
            </form>
            <input
                name="capture"
                type="text"
                readonly
                value={capture.name}
                class="grow-1 border-0 bg-transparent focus:ring-0 focus:outline-none"
            />
        </li>
    {/each}
</ul>
