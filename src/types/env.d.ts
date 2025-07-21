/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_USER_API_URL: string;
  readonly VITE_JUDGE_API_URL: string;
  readonly VITE_LEARNING_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 