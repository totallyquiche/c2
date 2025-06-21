<script lang="ts">
    import type { Capture } from '$types/Capture';
    import { getContext, onMount } from 'svelte';
    import type { Writable } from 'svelte/store';

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

            const body = new FormData(form);
            input.value = '';

            try {
                const response = await fetch('/', { method: 'POST', body });

                if (response.ok) {
                    $captures = [{ name: trimmedValue }, ...$captures];
                } else {
                    throw new Error('Failed to submit capture');
                }
            } catch (error) {
                console.error('Error submitting capture:', error);
            } finally {
                input.focus();
            }
        };
    });
</script>

<form method="post" class="flex flex-col gap-4" bind:this={form}>
    <input
        name="capture"
        type="text"
        placeholder="What?"
        class="border-light bg-light border-0.5 p-2"
        bind:this={input}
    />
    <button
        type="submit"
        class="text-dark bg-accent focus:bg-accent cursor-pointer rounded-xl p-1 hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
        Capture
    </button>
</form>
