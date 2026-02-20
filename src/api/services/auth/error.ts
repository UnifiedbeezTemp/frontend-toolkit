export interface AuthErrorData {
  verified?: boolean;
  message: string;
  timestamp?: string;
}

export interface ApiError {
  status: number;
  message: string;
  details?: AuthErrorData;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: AuthErrorData,
  ) {
    super(message);
    this.name = "AuthError";
  }
}
