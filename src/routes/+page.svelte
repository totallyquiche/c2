<script lang="ts">
    import Form from '$components/Form.svelte';
    import List from '$components/List.svelte';
    import type { Capture } from '$types/Capture';
    import { onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { SignedIn, SignedOut, SignInButton } from 'svelte-clerk/client';

    const captures = writable<Capture[]>([]);

    setContext('captures', captures);

    onMount(() => {
        fetch('/captures')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                captures.set(data as Capture[]);
            })
            .catch((error) => {
                console.error('Error fetching captures:', error);
            });
    });
</script>

<div class="flex flex-col items-center gap-8 overflow-y-auto p-4 pt-16">
    <SignedOut>
        <SignInButton />
    </SignedOut>
    <SignedIn>
        <Form />
        <List />
    </SignedIn>
</div>
