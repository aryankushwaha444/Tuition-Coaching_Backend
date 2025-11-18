// ============================================================
// 🧩 Global Type Defination —
// ============================================================

declare global {
  interface ErrrorDetails {
    field?: string;
    message?: string;
  }

  interface ErrorType {
    type?: string;
    details?: ErrrorDetails[];
  }

  type APIErrorType = string | ErrorType;
}

export {};
