import { fail, type Actions } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
    create: async ({ request }) => {
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
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id) {
            return fail(400, { message: 'Missing ID' });
        }

        const { error } = await supabase.from('Captures').delete().eq('id', id);

        if (error) {
            console.error(error);
        }
    }
} satisfies Actions;
