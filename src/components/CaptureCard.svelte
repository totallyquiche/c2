<script lang="ts">
    import type { Capture } from '$types/Capture';

    const { capture, handleDelete, handleUpsert } = $props<{
        capture: Capture;
        handleDelete: (capture: Capture) => void;
        handleUpsert: (capture: Capture) => void;
    }>();

    let newName = $state('');
    let captureName = $state(capture.name);
    let isEditing = $state(capture.isEditing || false);
    let isDeleting = $state(false);
    let textarea: HTMLTextAreaElement | null = $state(null);
    let saveButton: HTMLButtonElement | null = $state(null);

    $effect(() => {
        captureName = capture.name;
        isEditing = capture.isEditing || false;
    });

    $effect(() => {
        newName = captureName;
    });

    $effect(() => {
        capture.isEditing = isEditing || !!(captureName.trim() === '');
    });

    $effect(() => {
        if (textarea && isEditing) {
            textarea.focus();
        }
    });
</script>

<section
    class="flex items-center justify-between gap-2 rounded-xs bg-orange-300 p-4 text-yellow-900"
>
    {#if isEditing}
        <textarea
            class="w-full resize-none rounded-xs bg-yellow-300 p-2 text-yellow-900"
            bind:value={newName}
            bind:this={textarea}
            onkeydown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    saveButton?.click();
                }
            }}
        ></textarea>
    {:else}
        <p class="break-words hyphens-auto">{captureName}</p>
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

                    handleUpsert(capture);

                    isEditing = false;
                }}
                disabled={newName === captureName || newName.trim() === ''}
                bind:this={saveButton}
            >
                <img src="/images/thumbs-up.svg" alt="Save" class="size-5" />
            </button>
        {:else}
            <button
                class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400 {isDeleting
                    ? 'glitch'
                    : ''}"
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
                    class="size-5 transition-transform duration-300"
                />
            </button>
            {#if !isDeleting}
                <button
                    class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                    onclick={() => (isEditing = true)}
                >
                    <img src="/images/pencil.svg" alt="Edit" class="size-5" />
                </button>
            {:else}
                <button
                    class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400"
                    onclick={() => (isDeleting = false)}
                >
                    <img src="/images/cancel.svg" alt="Cancel" class="size-5" />
                </button>
            {/if}
        {/if}
    </div>
</section>

<style>
    .glitch:hover {
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    }

    @keyframes glitch {
        0% {
            transform: translate(0);
            rotate: 0deg;
            transform-origin: 50%;
        }
        20% {
            transform: translate(-1px, 1px);
            rotate: 10deg;
            transform-origin: 50%;
        }
        40% {
            transform: translate(-1px, -1px);
            rotate: -10deg;
            transform-origin: 50%;
        }
        60% {
            transform: translate(1px, 1px);
            rotate: 10deg;
            transform-origin: 50%;
        }
        80% {
            transform: translate(1px, -1px);
            rotate: -10deg;
            transform-origin: 50%;
        }
        100% {
            transform: translate(0);
            rotate: 0deg;
            transform-origin: 50%;
        }
    }
</style>
