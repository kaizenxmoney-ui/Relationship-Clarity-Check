
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prwksdzwwgxenkenjziu.supabase.co';
const supabaseAnonKey = 'sb_publishable_zByXdLb_syjD6JrwsxrLag_MkCPidbc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
