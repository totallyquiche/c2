<script lang="ts">
    import { setContext } from 'svelte';

    const { captures, children } = $props();

    setContext('captures', captures);
</script>

{@render children()}
