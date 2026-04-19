const { createClient } = require('@supabase/supabase-js');

// Ensure these are provided in .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env. API functionality will be limited.");
}

// We use the Service Role key in the backend to bypass RLS for administrative tasks
// Note: Never expose the Service Role key to the frontend
const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = { supabase };
