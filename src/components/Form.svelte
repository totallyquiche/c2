<script lang="ts">
    import { onMount } from 'svelte';

    let form: HTMLFormElement;
    let input: HTMLInputElement;

    onMount(() => {
        input.focus();

        form.onsubmit = (event: SubmitEvent) => {
            event.preventDefault();

            const value = input.value.trim();

            input.value = '';

            fetch('/', {
                method: 'POST',
                body: new FormData(form)
            }).catch(() => {
                input.value = value;
            });

            input.focus();
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
        class="text-dark bg-accent focus:bg-accent cursor-pointer rounded-xl p-1 hover:brightness-95 active:scale-95"
        >Submit</button
    >
</form>
