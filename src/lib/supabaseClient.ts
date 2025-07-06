import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL } from '$env/static/private';
import { SUPABASE_SECRET_KEY } from '$env/static/private';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_SECRET_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
