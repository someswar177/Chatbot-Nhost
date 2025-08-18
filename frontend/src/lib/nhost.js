import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
  // Or, if you prefer backendUrl instead:
  // backendUrl: import.meta.env.VITE_NHOST_BACKEND_URL,
})

export { nhost }