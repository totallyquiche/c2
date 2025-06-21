<script lang="ts">
    interface Capture {
        id: string;
        created_at: string;
        name: string;
    }

    let captures: Capture[] = $state([]);

    $effect(() => {
        fetch('/captures')
            .then((response) => response.json())
            .then((data) => {
                captures = data as Capture[];
            });
    });
</script>

<ul class="flex flex-col gap-5">
    {#each captures as capture}
        <li>{capture.name}</li>
    {/each}
</ul>
