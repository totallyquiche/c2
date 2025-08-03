<script lang="ts">
    import ListsList from '$components/ListList.svelte';
    import type { Capture } from '$types/Capture';
    import type { List } from '$types/List';
    import { writable } from 'svelte/store';
    import { SignedIn, SignedOut, SignInButton } from 'svelte-clerk/client';
    import CapturesContext from '../contexts/CapturesContext.svelte';
    import ListsContext from '../contexts/ListsContext.svelte';
    const lists = writable<List[]>([]);
    const captures = writable<Capture[]>([]);
</script>

<ListsContext {lists}>
    <CapturesContext {captures}>
        <div class="flex flex-col gap-4">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <ListsList />
            </SignedIn>
        </div>
    </CapturesContext>
</ListsContext>
