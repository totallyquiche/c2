import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';

export const GET: RequestHandler = async () => {
    const { data } = await supabase
        .from('Captures')
        .select()
        .order('created_at', { ascending: false });
    return new Response(JSON.stringify(data ?? []));
};
