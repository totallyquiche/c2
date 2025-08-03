<script lang="ts">
    import { setContext } from 'svelte';

    const { lists, children } = $props();

    setContext('lists', lists);
</script>

{@render children()}
