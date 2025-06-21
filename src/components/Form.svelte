<script lang="ts">
    import type { Capture } from '$types/Capture';
    import { getContext, onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { v4 as uuidv4 } from 'uuid';

    let form: HTMLFormElement;
    let input: HTMLInputElement;

    const captures = getContext<Writable<Capture[]>>('captures');

    let hidden = $state(true);

    onMount(() => {
        hidden = false;

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
                const response = await fetch('/', { method: 'POST', body });

                if (response.ok) {
                    $captures = [capture, ...$captures];
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

<form
    method="post"
    class="flex flex-col gap-4 {hidden
        ? 'opacity-0'
        : 'opacity-100'} transition-opacity duration-1500 ease-in-out"
    bind:this={form}
>
    <input
        name="capture"
        type="text"
        placeholder="What?"
        class="border-light bg-light border-0.5 p-2"
        bind:this={input}
    />
    <button
        type="submit"
        class="text-dark bg-accent focus:bg-accent w-full cursor-pointer rounded-2xl p-1 hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
        Capture
    </button>
</form>
