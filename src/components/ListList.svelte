<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    import CapturesList from './CapturesList.svelte';
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

<ul>
    {#each $lists as list}
        <li>
            <h2>{list.name}</h2>
            <CapturesList {list} />
        </li>
    {/each}
</ul>
