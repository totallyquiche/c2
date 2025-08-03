import type { RequestHandler, RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';

export const POST: RequestHandler = async (event: RequestEvent) => {
    const auth = event.locals.auth();

    if (!auth.isAuthenticated) {
        return new Response('Unauthorized', {
            status: 401
        });
    }

    try {
        const list = await event.request.json();
        const { data, error } = await supabase.from('Lists').insert(list);

        if (error) {
            return new Response('Failed to create list', {
                status: Number.parseInt(error.code)
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (error: unknown) {
        return new Response(error as string, {
            status: 500
        });
    }
};

export const GET: RequestHandler = async (event: RequestEvent) => {
    const auth = event.locals.auth();

    if (!auth.isAuthenticated) {
        return new Response('Unauthorized', {
            status: 401
        });
    }

    try {
        const { data, error } = await supabase
            .from('Lists')
            .select()
            .order('created_at', { ascending: false });

        if (error) {
            return new Response('Failed to read lists', {
                status: Number.parseInt(error.code)
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (error: unknown) {
        return new Response(error as string, {
            status: 500
        });
    }
};

export const PUT: RequestHandler = async (event: RequestEvent) => {
    const auth = event.locals.auth();

    if (!auth.isAuthenticated) {
        return new Response('Unauthorized', {
            status: 401
        });
    }

    try {
        const list = await event.request.json();
        const { data, error } = await supabase.from('Lists').update(list).eq('id', list.id);

        if (error) {
            return new Response('Failed to update list', {
                status: Number.parseInt(error.code)
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (error: unknown) {
        return new Response(error as string, {
            status: 500
        });
    }
};

export const DELETE: RequestHandler = async (event: RequestEvent) => {
    const auth = event.locals.auth();

    if (!auth.isAuthenticated) {
        return new Response('Unauthorized', {
            status: 401
        });
    }

    const { list } = await event.request.json();

    if (!list.id) {
        return new Response('Missing ID', {
            status: 400
        });
    }

    try {
        const { error } = await supabase.from('Lists').delete().eq('id', list.id);

        if (error) {
            return new Response('Failed to delete list', {
                status: Number.parseInt(error.code)
            });
        }

        return new Response('List deleted', {
            status: 200
        });
    } catch (error: unknown) {
        return new Response(error as string, {
            status: 500
        });
    }
};
