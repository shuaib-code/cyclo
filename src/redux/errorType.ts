/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorData {
  success: boolean;
  message: string;
  statusCode: number;
  error: Array<{ path: string; message: string }>;
  stack: string;
}

export const handleApiError = (error: any) => {
  if (error && "data" in error) {
    const data = (error as { data: ErrorData }).data;
    return data?.message || "Something went wrong";
  }
  return "Something went wrong";
};
