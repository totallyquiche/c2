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
        const capture = await event.request.json();
        const { data, error } = await supabase.from('Captures').insert(capture);

        if (error) {
            return new Response('Failed to create capture', {
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
            .from('Captures')
            .select()
            .order('created_at', { ascending: false });

        if (error) {
            return new Response('Failed to read captures', {
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
        const capture = await event.request.json();
        const { data, error } = await supabase
            .from('Captures')
            .update(capture)
            .eq('id', capture.id);

        if (error) {
            return new Response('Failed to update capture', {
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

    const { capture } = await event.request.json();

    if (!capture.id) {
        return new Response('Missing ID', {
            status: 400
        });
    }

    try {
        const { error } = await supabase.from('Captures').delete().eq('id', capture.id);

        if (error) {
            return new Response('Failed to delete capture', {
                status: Number.parseInt(error.code)
            });
        }

        return new Response('Capture deleted', {
            status: 200
        });
    } catch (error: unknown) {
        return new Response(error as string, {
            status: 500
        });
    }
};
