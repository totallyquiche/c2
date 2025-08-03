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
            const { data, error } = await supabase.from('Captures').insert(capture);

            if (error) {
                console.error(error);
                return fail(Number.parseInt(error.code), { message: 'Failed to create capture' });
            }

            return data;
        } catch (error: unknown) {
            console.error(error);
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

        try {
            const { error } = await supabase.from('Captures').delete().eq('id', capture.id);

            if (error) {
                console.error(error);
                return fail(Number.parseInt(error.code), { message: 'Failed to delete capture' });
            }
        } catch (error: unknown) {
            console.error(error);
            return fail(500, { message: error as string });
        }
    },
    update: async ({ request, locals }) => {
        const auth = locals.auth();

        if (!auth.isAuthenticated) {
            return fail(401, { message: 'Unauthorized' });
        }

        try {
            const capture = await request.json();
            const { error } = await supabase.from('Captures').update(capture);

            if (error) {
                console.error(error);
                return fail(Number.parseInt(error.code), { message: 'Failed to update capture' });
            }
        } catch (error: unknown) {
            console.error(error);
            return fail(500, { message: error as string });
        }
    }
} satisfies Actions;
