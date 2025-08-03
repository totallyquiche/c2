<script lang="ts">
    import type { Capture } from '$types/Capture';

    const { capture, handleDelete } = $props<{
        capture: Capture;
        handleDelete: (capture: Capture) => void;
    }>();

    let isEditing = $state(false);
    let newName = $state(capture.name);
</script>

<section
    class="flex items-center justify-between gap-2 rounded-xs bg-orange-300 p-4 text-yellow-900"
>
    {#if isEditing}
        <textarea
            class="w-full resize-none rounded-xs bg-yellow-300 p-2 text-yellow-900"
            bind:value={newName}
        ></textarea>
    {:else}
        <p>{capture.name}</p>
    {/if}
    <div class="flex shrink-0 gap-0">
        {#if isEditing}
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                onclick={() => {
                    newName = capture.name;
                    isEditing = false;
                }}
            >
                <img src="/images/thumbs-down.svg" alt="Cancel" class="size-5" />
            </button>
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                onclick={() => {
                    capture.name = newName;
                    isEditing = false;
                }}
            >
                <img src="/images/thumbs-up.svg" alt="Save" class="size-5" />
            </button>
        {:else}
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                onclick={() => handleDelete(capture)}
            >
                <img src="/images/bomb.svg" alt="Delete" class="size-5" />
            </button>
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                onclick={() => (isEditing = true)}
            >
                <img src="/images/pencil.svg" alt="Edit" class="size-5" />
            </button>
        {/if}
    </div>
</section>
