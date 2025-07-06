import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({ out: 'build', precompress: true }),
        alias: { $components: 'src/components', $lib: 'src/lib', $types: 'src/types' }
    }
};

export default config;
