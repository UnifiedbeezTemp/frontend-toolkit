export interface APIErrorMessage {
  message: string;
  error?: string;
  statusCode?: number;
}

export interface APIErrorDetails {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  message?: string | APIErrorMessage;
  correlationId?: string;
  [key: string]: unknown;
}

export interface APIError {
  status: number;
  message: string | APIErrorMessage;
  details?: APIErrorDetails | null;
}
