export class AuthError extends Error {
  constructor(message: string, public status?: number, public data?: {message: string}) {
    super(message);
    this.name = "AuthError";
  }
}


// {
//     "statusCode": 401,
//     "timestamp": "2025-11-21T11:38:56.894Z",
//     "path": "/api/v1/auth/login",
//     "message": {
//         "message": "Invalid credentials",
//         "error": "Unauthorized",
//         "statusCode": 401
//     },
//     "correlationId": "ba000388-0d12-4632-b327-07c02bed5f62"
// }