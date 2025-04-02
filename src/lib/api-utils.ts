export function shouldFail(): boolean {
  return Math.random() < 0.2;
}

// Different types of errors that can occur
type ApiError = {
  status: number;
  message: string;
};

const possibleErrors: ApiError[] = [
  { status: 400, message: "Bad Request: Invalid parameters" },
  { status: 401, message: "Unauthorized: Authentication required" },
  { status: 403, message: "Forbidden: Insufficient permissions" },
  { status: 404, message: "Not Found: Resource doesn't exist" },
  { status: 408, message: "Request Timeout: Operation took too long" },
  { status: 429, message: "Too Many Requests: Rate limit exceeded" },
  { status: 500, message: "Internal Server Error: Something went wrong" },
  {
    status: 502,
    message: "Bad Gateway: Invalid response from upstream server",
  },
  { status: 503, message: "Service Unavailable: Server is overloaded" },
  { status: 504, message: "Gateway Timeout: Upstream server took too long" },
];

// Get a random error from the list
export function getRandomError(): ApiError {
  const randomIndex = Math.floor(Math.random() * possibleErrors.length);
  return possibleErrors[randomIndex];
}
