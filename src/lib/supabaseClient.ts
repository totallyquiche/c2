import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SECRET_KEY } from '$env/static/private';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PRIVATE_SUPABASE_SECRET_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
