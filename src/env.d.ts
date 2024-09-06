interface ImportMetaEnv {
  VITE_GRAPHOPPER_API_KEY: string;
  VITE_SUPABASE_API_KEY: string;
  VITE_VERIFYEMAIL_API_KEY: string;
  VITE_APIIP_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
