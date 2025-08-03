<script lang="ts">
    import type { Capture } from '$types/Capture';

    const { capture, handleDelete } = $props<{
        capture: Capture;
        handleDelete: (capture: Capture) => void;
    }>();
</script>

<section
    class="flex items-center justify-between gap-2 rounded-xs bg-orange-300 p-4 text-yellow-900"
>
    <span>{capture.name}</span>
    <div class="shrink-0">
        <button class="rounded-full p-2 hover:bg-yellow-300 active:bg-yellow-400">
            <img src="/images/pencil.svg" alt="Edit" class="size-5" />
        </button>
    </div>
</section>
