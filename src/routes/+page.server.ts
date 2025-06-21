import { fail, type Actions } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const capture = await request.json();
            const { data, error } = await supabase
                .from('Captures')
                .insert({ id: capture.id, name: capture.name });

            if (error) {
                console.error(error);

                throw new Error('Failed to create Capture');
            }

            return data;
        } catch (error: unknown) {
            return fail(500, { message: error as string });
        }
    }
} satisfies Actions;
