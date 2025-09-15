export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: string;
}

export class AuthManager {
  private tokens: Map<string, AuthTokens> = new Map();

  // DrChrono OAuth2 Authentication
  async authenticateDrChrono(
    clientId: string,
    clientSecret: string
  ): Promise<AuthTokens> {
    const response = await fetch("https://drchrono.com/o/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`DrChrono authentication failed: ${response.statusText}`);
    }

    const data = await response.json();
    const tokens: AuthTokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
      tokenType: data.token_type || "Bearer",
    };

    this.tokens.set("drchrono", tokens);
    return tokens;
  }

  // Epic FHIR Authentication (Basic Auth for sandbox)
  async authenticateEpic(
    username: string,
    password: string
  ): Promise<AuthTokens> {
    const credentials = btoa(`${username}:${password}`);
    const tokens: AuthTokens = {
      accessToken: credentials,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      tokenType: "Basic",
    };

    this.tokens.set("epic", tokens);
    return tokens;
  }

  // Get stored tokens
  getTokens(provider: string): AuthTokens | null {
    return this.tokens.get(provider) || null;
  }

  // Check if tokens are valid
  isTokenValid(provider: string): boolean {
    const tokens = this.tokens.get(provider);
    return tokens ? tokens.expiresAt > Date.now() : false;
  }

  // Refresh DrChrono tokens
  async refreshDrChronoToken(
    refreshToken: string,
    clientId: string,
    clientSecret: string
  ): Promise<AuthTokens> {
    const response = await fetch("https://drchrono.com/o/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data = await response.json();
    const tokens: AuthTokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken,
      expiresAt: Date.now() + data.expires_in * 1000,
      tokenType: data.token_type || "Bearer",
    };

    this.tokens.set("drchrono", tokens);
    return tokens;
  }
}

export const authManager = new AuthManager();
