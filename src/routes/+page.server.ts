import type { Actions } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('capture');
        const { error } = await supabase.from('Captures').insert({ name });

        if (error) {
            return {
                error: error.message
            };
        }

        return { success: true };
    }
} satisfies Actions;
