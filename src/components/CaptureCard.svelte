<script lang="ts">
    import type { Capture } from '$types/Capture';

    const { capture, handleDelete } = $props<{
        capture: Capture;
        handleDelete: (capture: Capture) => void;
    }>();

    let newName = $state('');
    let captureName = $state(capture.name);
    let isEditing = $state(false);
    let isDeleting = $state(false);

    $effect(() => {
        captureName = capture.name;
    });

    $effect(() => {
        newName = captureName;
        isEditing = !!(captureName.trim() === '');
    });
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
        <p>{captureName}</p>
    {/if}
    <div class="flex shrink-0 gap-0">
        {#if isEditing}
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                onclick={() => {
                    newName = captureName;
                    isEditing = false;

                    if (newName.trim() === '') {
                        handleDelete(capture);
                    }
                }}
            >
                <img src="/images/thumbs-down.svg" alt="Cancel" class="size-5" />
            </button>
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400 disabled:opacity-50"
                onclick={() => {
                    captureName = newName;
                    capture.name = captureName;
                    isEditing = false;
                }}
                disabled={newName === captureName || newName.trim() === ''}
            >
                <img src="/images/thumbs-up.svg" alt="Save" class="size-5" />
            </button>
        {:else}
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                onclick={() => {
                    if (isDeleting) {
                        handleDelete(capture);
                    }

                    isDeleting = !isDeleting;
                }}
            >
                <img
                    src={!isDeleting ? '/images/bomb.svg' : '/images/exclamation-question-mark.svg'}
                    alt="Delete"
                    class="size-5 transition-transform duration-300 {isDeleting
                        ? '-rotate-25'
                        : 'rotate-0'}"
                />
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
