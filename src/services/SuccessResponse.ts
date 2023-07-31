/* eslint-disable import/prefer-default-export */
export type SuccessResponse<T> = {
  statusCode?: number
  message?: string
  data?: T
}

export interface ErrorResponse {
  code?: number | string
  message: string
}

export const createSuccessResponse = <T>(
  statusCode: number,
  message: string,
  data: T
): SuccessResponse<T> => ({
  statusCode,
  message,
  data,
})
