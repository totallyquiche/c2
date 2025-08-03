<script lang="ts">
    import type { Capture } from '$types/Capture';
    import { getContext, onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { v4 as uuidv4 } from 'uuid';

    let form: HTMLFormElement;
    let input: HTMLInputElement;

    const captures = getContext<Writable<Capture[]>>('captures');

    onMount(() => {
        input.focus();

        form.onsubmit = async (event: SubmitEvent) => {
            event.preventDefault();

            const trimmedValue = input.value.trim();

            if (!trimmedValue) {
                return;
            }

            const capture = {
                id: uuidv4(),
                name: trimmedValue
            } satisfies Capture;

            const body = JSON.stringify(capture);

            input.value = '';

            try {
                const response = await fetch('/api/capture', { method: 'POST', body });

                if (response.ok) {
                    $captures = [capture, ...$captures];
                } else {
                    throw new Error('Failed to create capture');
                }
            } catch (error) {
                console.error('Error creating capture:', error);
            } finally {
                input.focus();
            }
        };
    });
</script>

<form method="POST" bind:this={form}>
    <input
        name="capture"
        type="text"
        placeholder="What?"
        bind:this={input}
        class="w-full border-0 bg-gray-800 ring-0"
    />
</form>
