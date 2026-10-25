declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ASSETS: Fetcher;
    ADMIN_EMAIL: string;
    ACCESS_TEAM_DOMAIN: string;
    ACCESS_AUD: string;
    BUCKET?: R2Bucket;
  }
}
