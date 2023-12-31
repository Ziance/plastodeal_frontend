export const config = {
  apiVersion: process.env.REACT_APP_API_VERSION,
  databaseConnection: process.env.REACT_APP_DATABASE_CONNECTION,
  region: process.env.REACT_APP_REGION,
  sessionExpiryTime: JSON.parse(process.env.REACT_APP_SESSION_LIMIT || "900000"),
  cesApiUrl: process.env.REACT_APP_CES_API_URL,
}

export const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const defaultPageSize = 10
export const allowedPageSizes = [10, 20, 50, 100, 200]
