interface SessionData {
    session: {
      provider_token: string;
      provider_refresh_token: string;
      access_token: string;
      expires_in: number;
      expires_at: number;
      refresh_token: string;
      token_type: string;
      user: UserData;
    };
  }
  
  interface UserData {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: {
      provider: string;
      providers: string[];
    };
    user_metadata: {
      avatar_url: string;
      email: string;
      email_verified: boolean;
      full_name: string;
      iss: string;
      name: string;
      phone_verified: boolean;
      preferred_username: string;
      provider_id: string;
      sub: string;
      user_name: string;
    };
    identities: Identity[];
    created_at: string;
    updated_at: string;
  }
  
  interface Identity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: IdentityData;
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
  }
  
  interface IdentityData {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    phone_verified: boolean;
    preferred_username: string;
    provider_id: string;
    sub: string;
    user_name: string;
  }  