import { createAuthClient } from "better-auth/react";
import { usernameClient, inferAdditionalFields } from 'better-auth/client/plugins'

import type { auth } from '../../../server/src/lib/auth'

export const authClient = createAuthClient({
  baseURL:
    import.meta.env.VITE_SERVER_URL || "http://10.113.4.55",
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()]
});
