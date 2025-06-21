<script lang="ts">
    import type { Capture } from '$types/Capture';
    import { getContext, onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';

    const captures = getContext<Writable<Capture[]>>('captures');

    let deleteQueue = writable(new Set<string>());

    const handleDelete = async (capture: Capture) => {
        if (!capture.id) return;

        deleteQueue.update((queue) => {
            queue.add(capture.id);
            return queue;
        });

        const response = await fetch('?/delete', {
            method: 'POST',
            body: JSON.stringify({ capture })
        });

        if (response.ok) {
            setTimeout(() => {
                $captures = $captures.filter((c) => c.id !== capture.id);
                deleteQueue.update((queue) => {
                    queue.delete(capture.id);
                    return queue;
                });
            }, 1000);
        } else {
            throw new Error('Failed to delete capture');
        }
    };

    onMount(() => {
        fetch('/captures')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                captures.set(data as Capture[]);
            })
            .catch((error) => {
                console.error('Error fetching captures:', error);
            });
    });
</script>

<ul class="flex min-w-1/2 flex-col">
    {#each $captures as capture, index (capture.id)}
        <li
            class="text-light flex w-full items-center justify-between gap-4 self-center py-2 {$deleteQueue.has(
                capture.id
            )
                ? 'fade-out-item'
                : 'fade-in-item'}"
            style="animation-delay: {$deleteQueue.has(capture.id) ? '0ms' : index * 150 + 'ms'};"
        >
            <span>{capture.name}</span>
            <form method="post" action="?/delete">
                <input type="hidden" name="id" value={capture.id} />
                <button
                    type="submit"
                    class="text-accent hover:text-dark focus:text-dark cursor-pointer {$deleteQueue.has(
                        capture.id
                    )
                        ? 'hidden'
                        : ''}"
                    aria-label="Delete this capture"
                    onclick={(event: MouseEvent) => {
                        event.preventDefault();
                        capture.id && handleDelete(capture);
                    }}
                >
                    Release
                </button>
            </form>
        </li>
    {/each}
</ul>

<style>
    .fade-in-item {
        opacity: 0;
        animation: fadeIn 0.6s ease-out forwards;
    }

    .fade-out-item {
        opacity: 1;
        max-height: 0;
        padding: 0;
        animation: fadeOut 0.6s ease-out forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
</style>
