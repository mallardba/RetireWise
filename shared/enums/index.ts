export enum ContributionType {
  PERCENTAGE = 'PERCENTAGE',
  DOLLAR = 'DOLLAR'
}

export enum AccountType {
  TRADITIONAL = 'TRADITIONAL',
  ROTH = 'ROTH'
}

export enum PayFrequency {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  SEMIMONTHLY = 'SEMIMONTHLY',
  MONTHLY = 'MONTHLY'
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export enum ApiErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}
