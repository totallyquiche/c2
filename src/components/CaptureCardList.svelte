<script lang="ts">
    import type { Capture } from '$types/Capture';
    import CaptureCard from './CaptureCard.svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { v4 as uuidv4 } from 'uuid';
    import {
        handleDragTargetDragEnter,
        handleDragTargetDragOver,
        handleDragTargetDrop,
        handleDraggableDragStart,
        handleDraggableDragEnd
    } from '$lib/draggable';
    import { browser } from '$app/environment';

    if (browser) {
        // @ts-ignore - drag-drop-touch has no type definitions
        import('drag-drop-touch');
    }

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
        const newCapture = {
            id: uuidv4(),
            name: '',
            listId: list.id,
            isEditing: true,
            updatedAt: new Date().toISOString()
        } satisfies Capture;

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
</script>

<section>
    <div
        class="flex items-center justify-between rounded-t-xs bg-green-300 px-4 py-2 font-semibold text-yellow-900"
    >
        <h2>{list.name}</h2>
        <div>
            <button
                class="size-8 cursor-pointer rounded-full text-lg hover:bg-yellow-300 active:bg-yellow-400"
                onclick={handleNew}
            >
                +
            </button>
        </div>
    </div>

    <ul
        class="rounded-b-xs bg-green-200 pt-4 pb-8"
        ondragenter={handleDragTargetDragEnter}
        ondragover={handleDragTargetDragOver}
        ondrop={(event) => handleDragTargetDrop(event, captures, list.id, handleUpsert)}
    >
        {#each $captures
            .filter((capture: Capture) => capture.listId === list.id)
            .sort( (a: Capture, b: Capture) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || '') ) as capture (capture.id)}
            <li
                class="m-2 mx-4"
                draggable="true"
                ondragstart={(event) => handleDraggableDragStart(event, $captures)}
                ondragend={handleDraggableDragEnd}
                data-capture-id={capture.id}
            >
                <CaptureCard {capture} {handleDelete} {handleUpsert} />
            </li>
        {/each}
    </ul>
</section>
