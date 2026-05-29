import axios from "axios";

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  fieldErrors: ApiFieldError[];
};

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? "Request failed";
  }

  return "Unexpected error";
}

export function getApiFieldErrors(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.fieldErrors ?? [];
  }

  return [];
}
