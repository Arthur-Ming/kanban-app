class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthorizationError extends AppError {
  status: number;
  constructor(message?: string) {
    super(message || 'UNAUTHORIZED');
    this.status = 401;
  }
}
