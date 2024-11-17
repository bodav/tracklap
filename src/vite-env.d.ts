/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GITHUB_REPOSITORY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
