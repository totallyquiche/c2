import { fail, type Actions } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const auth = locals.auth();

        if (!auth.isAuthenticated) {
            return fail(401, { message: 'Unauthorized' });
        }

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
    delete: async ({ request, locals }) => {
        const auth = locals.auth();

        if (!auth.isAuthenticated) {
            return fail(401, { message: 'Unauthorized' });
        }

        const { capture } = await request.json();

        if (!capture.id) {
            return fail(400, { message: 'Missing ID' });
        }

        const { error } = await supabase.from('Captures').delete().eq('id', capture.id);

        if (error) {
            console.error(error);
            return fail(500, { message: 'Failed to delete capture' });
        }
    }
} satisfies Actions;
