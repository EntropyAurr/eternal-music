import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://szcsnshqncrvraufzcwt.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Y3Nuc2hxbmNydnJhdWZ6Y3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MzI0NTUsImV4cCI6MjA2NDUwODQ1NX0.cpdbfJxMCkWZYJY5xexMia_4qUquVlrn58y_ZuVp0KQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
