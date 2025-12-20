

export interface APIError {
   status: number,
   message: {
      message: string,
      error: string,
      statusCode: number
    },
  details?: {
    statusCode: number,
    timestamp: string,
    path: string,
    message: {
      message: string,
      error: string,
      statusCode: number
    },
    correlationId: string
  }
}