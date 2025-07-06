<script lang="ts">
    import Form from '$components/Form.svelte';
    import List from '$components/List.svelte';
    import type { Capture } from '$types/Capture';
    import { writable } from 'svelte/store';
    import { SignedIn, SignedOut, SignInButton } from 'svelte-clerk/client';
    import CapturesContext from '../contexts/CapturesContext.svelte';

    const captures = writable<Capture[]>([]);
</script>

<CapturesContext {captures}>
    <div class="flex flex-col gap-4">
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <Form />
            <List />
        </SignedIn>
    </div>
</CapturesContext>
