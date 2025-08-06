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
                <div class="flex justify-center p-4">
                    <SignInButton
                        class="rounded-xs bg-green-300 p-2 text-green-900 hover:bg-green-400 active:bg-green-500 cursor-pointer"
                    />
                </div>
            </SignedOut>
            <SignedIn>
                <ListsList />
            </SignedIn>
        </div>
    </CapturesContext>
</ListsContext>
