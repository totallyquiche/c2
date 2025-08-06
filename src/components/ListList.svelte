<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    import CaptureCardList from './CaptureCardList.svelte';
    import type { List } from '$types/List';
    import { onMount } from 'svelte';
    import type { Capture } from '$types/Capture';

    const lists = getContext<Writable<List[]>>('lists');
    const captures = getContext<Writable<Capture[]>>('captures');

    onMount(() => {
        fetch('/api/list')
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                lists.set(data);
            })
            .catch((error) => {
                console.error('Error fetching lists:', error);
            });
    });

    onMount(() => {
        fetch('/api/capture')
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                captures.set(data);
            })
            .catch((error) => {
                console.error('Error fetching captures:', error);
            });
    });
</script>

<ul class="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
    {#each $lists as list}
        <li>
            <CaptureCardList {list} />
        </li>
    {/each}
</ul>
