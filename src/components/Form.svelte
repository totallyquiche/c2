<script lang="ts">
    let input = $state('');

    function handleSubmit(event: Event) {
        event.preventDefault();
        input = input.trim();

        if (input === '') return;
    }
</script>

<!-- svelte-ignore a11y_autofocus -->
<form class="flex flex-col gap-4">
    <input
        type="text"
        placeholder="What?"
        autofocus
        class="border-light bg-light border-0.5 p-2"
        bind:value={input}
    />
    <button
        class="text-dark bg-accent focus:bg-accent cursor-pointer rounded-xl p-1 hover:brightness-95 active:scale-95"
        onclick={handleSubmit}>Submit</button
    >
</form>
