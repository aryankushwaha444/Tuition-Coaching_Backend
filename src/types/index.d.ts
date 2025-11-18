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

  type APIError = string | ErrorType;
}

export {};
