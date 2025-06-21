import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';

export const GET: RequestHandler = async () => {
    const { data, error } = await supabase
        .from('Captures')
        .select()
        .order('created_at', { ascending: false });

    if (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data ?? []));
};
