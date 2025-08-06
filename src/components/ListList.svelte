<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { getContext } from 'svelte';
    import CaptureCardList from './CaptureCardList.svelte';
    import type { List } from '$types/List';
    import { onMount } from 'svelte';
    import type { Capture } from '$types/Capture';

    const lists = getContext<Writable<List[]>>('lists');
    const captures = getContext<Writable<Capture[]>>('captures');

    onMount(async () => {
        try {
            const [listsResponse, capturesResponse] = await Promise.all([
                fetch('/api/list'),
                fetch('/api/capture')
            ]);

            if (!listsResponse.ok) {
                throw new Error(`Lists API error: ${listsResponse.status}`);
            }
            if (!capturesResponse.ok) {
                throw new Error(`Captures API error: ${capturesResponse.status}`);
            }

            const [listsData, capturesData] = await Promise.all([
                listsResponse.json(),
                capturesResponse.json()
            ]);

            lists.set(listsData);
            captures.set(capturesData);
        } catch (error) {
            alert('Failed to fetch data');
        }
    });
</script>

<ul class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
    {#each $lists as list}
        <li>
            <CaptureCardList {list} />
        </li>
    {/each}
</ul>
