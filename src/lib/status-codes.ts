interface StatusCodeInfo {
  name: string
  description: string
}

// Simplified map of HTTP status codes to their information
const STATUS_CODES: Record<number, StatusCodeInfo> = {
  // 2xx - Success
  200: {
    name: "OK",
    description:
      "The request has succeeded. The information returned with the response depends on the method used in the request.",
  },
  201: {
    name: "Created",
    description: "The request has been fulfilled and has resulted in one or more new resources being created.",
  },
  204: {
    name: "No Content",
    description:
      "The server has successfully fulfilled the request and there is no additional content to send in the response payload body.",
  },

  // 3xx - Redirection
  301: {
    name: "Moved Permanently",
    description: "The requested resource has been assigned a new permanent URI.",
  },
  307: {
    name: "Temporary Redirect",
    description:
      "The server sends this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request.",
  },

  // 4xx - Client Error
  400: {
    name: "Bad Request",
    description:
      "The server cannot or will not process the request due to something that is perceived to be a client error.",
  },
  401: {
    name: "Unauthorized",
    description: "Authentication is required and has failed or has not yet been provided.",
  },
  
  404: {
    name: "Not Found",
    description: "The server can not find the requested resource.",
  },
  
  // 5xx - Server Error
  500: {
    name: "Internal Server Error",
    description: "The server has encountered a situation it does not know how to handle.",
  },
}

/**
 * Get information about a specific HTTP status code
 */
export function getStatusCodeInfo(code: number): StatusCodeInfo | undefined {
  return STATUS_CODES[code]
}

/**
 * Get all available status codes
 */
export function getAllStatusCodes(): Record<number, StatusCodeInfo> {
  return STATUS_CODES
}

