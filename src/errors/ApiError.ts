class ApiError extends Error {
  code: number;

  constructor(code: number, message: string = 'An unexpected error occurred', stack: string = '') {
    super(message);
    this.code = code;
    
    // If no stack is provided, capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
