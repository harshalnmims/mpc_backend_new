export enum HTTP_STATUS {
   OK = 200,
   NO_CONTENT = 204,
   REDIRECT = 302,
   NOT_MODIFIED = 304,
   BAD_REQUEST = 400,
   UNAUTHORIZED = 401,
   FORBIDDEN = 403,
   NOT_FOUND = 404,
   NOT_ACCEPTABLE = 406,
   REQUEST_TIMEOUT = 408,
   CONFLICT = 409,
   UNSUPPORTED_MEDIA_TYPE = 415,
   TOO_MANY_REQUESTS = 429,
   INTERNAL_SERVER_ERROR = 500,
   DATABASE_ERROR = 501,
}

export type HTTPStatusValue = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
