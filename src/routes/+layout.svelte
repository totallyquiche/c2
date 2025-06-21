<script lang="ts">
    import '../app.css';
    import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
    import { ClerkProvider } from 'svelte-clerk/client';

    let { children } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
    {@render children()}
</ClerkProvider>
