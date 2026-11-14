import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Keep the public portfolio working even when the optional Supabase
// environment variables are not available in a Vercel deployment.
const missingConfigError = new Error(
  "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the deployment environment to enable the admin/data features."
);

const createFallbackQuery = () => {
  const query = {
    select: () => query,
    order: () => query,
    eq: () => query,
    single: async () => ({
      data: null,
      error: missingConfigError,
    }),
    then: (resolve, reject) =>
      Promise.resolve({
        data: null,
        count: 0,
        error: missingConfigError,
      }).then(resolve, reject),
  };

  return query;
};

const createFallbackClient = () => ({
  from: () => createFallbackQuery(),
  auth: {
    getUser: async () => ({
      data: { user: null },
      error: missingConfigError,
    }),
    signInWithPassword: async () => ({
      data: null,
      error: missingConfigError,
    }),
    signOut: async () => ({
      error: null,
    }),
  },
});

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : createFallbackClient();

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase environment variables are missing. Public portfolio content will still load, but Supabase-powered admin/data features are disabled."
  );
}
