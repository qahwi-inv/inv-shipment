import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eetdsqincehstfzkrbju.supabase.co'!
const supabaseAnonKey = 'sb_publishable_lIJhHRrspnze6UbBo5Ma3g_LIxRrGc4'!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)