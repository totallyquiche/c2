<script lang="ts">
    import type { Capture } from '$types/Capture';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    const captures = getContext<Writable<Capture[]>>('captures');
</script>

<ul class="flex flex-col gap-5">
    {#each $captures as capture, index (capture.id)}
        <li
            class="text-light fade-in-item flex items-center justify-between gap-4"
            style="animation-delay: {index * 150}ms;"
        >
            <span>{capture.name}</span>
            <button
                type="button"
                class="text-accent rounded px-3 py-1 text-sm hover:bg-red-50"
                aria-label="Delete {capture.name}"
            >
                Release
            </button>
        </li>
    {/each}
</ul>

<style>
    .fade-in-item {
        opacity: 0;
        animation: fadeIn 0.6s ease-out forwards;
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
</style>
