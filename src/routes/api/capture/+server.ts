import type { RequestHandler, RequestEvent } from './$types';
import { supabase } from '$lib/supabaseClient';
import { z } from 'zod';

const captureDto = z.object({
    id: z.uuidv4(),
    name: z.string(),
    listId: z.uuidv4(),
    updatedAt: z.coerce.date()
});

export const POST: RequestHandler = async (event: RequestEvent) => {
    const auth = event.locals.auth();

    if (!auth.isAuthenticated) {
        return new Response('Unauthorized', {
            status: 401
        });
    }

    try {
        const capture = await event.request.json();

        const validatedCapture = captureDto.parse(capture);

        const { data, error } = await supabase
            .from('Captures')
            .upsert(validatedCapture, {
                onConflict: 'id'
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
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
            .order('updatedAt', { ascending: false });

        if (error) {
            throw new Error(error.message);
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

    const validatedCapture = captureDto.parse(capture);

    if (!validatedCapture.id) {
        return new Response('Missing ID', {
            status: 400
        });
    }

    try {
        const { error } = await supabase.from('Captures').delete().eq('id', validatedCapture.id);

        if (error) {
            throw new Error(error.message);
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
