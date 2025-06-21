<script lang="ts">
    let list: string[] = $state([]);

    $effect(() => {
        fetch('/list')
            .then((response) => response.json())
            .then((data) => {
                list = data;
            });
    });
</script>

<ul class="flex flex-col gap-5">
    {#each list as item}
        <li>{item}</li>
    {/each}
</ul>
