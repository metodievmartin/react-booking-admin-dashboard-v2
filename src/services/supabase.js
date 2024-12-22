import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kyinodprqcyaolulourj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5aW5vZHBycWN5YW9sdWxvdXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NjYxMTYsImV4cCI6MjA1MDQ0MjExNn0.Wa1JITTGw2Z-f6HE4criuj4du3llFVOJEsISkXdvrW4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
