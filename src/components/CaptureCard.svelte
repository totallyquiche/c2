<script lang="ts">
    import type { Capture } from '$types/Capture';

    const { capture, handleDelete } = $props<{
        capture: Capture;
        handleDelete: (capture: Capture) => void;
    }>();
</script>

<section class="flex items-center gap-2 rounded-xs bg-orange-300 p-4 text-yellow-900">
    <span>{capture.name}</span>
</section>
