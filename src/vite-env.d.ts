/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_REPOSITORY: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_GIT_REF: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
