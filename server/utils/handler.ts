import { logger } from "@/server/utils/logger"
const config = useRuntimeConfig()

export const defineWrappedResponseHandler = (handler) => {
  return defineEventHandler(async (event) => {
    try {
      const startTime = Date.now()

      const result = await handler(event)

      logger.info(`${getRequestURL(event).hostname} - ${getRequestURL(event).pathname} in ${Date.now() - startTime}ms`)

      return result
    } catch (error: any) {
      logger.error('Error processing request to ' + getRequestURL(event).pathname, {
        path: event.node.req.url,
        method: event.node.req.method,
        error: error.message,
        stack: error.stack,
        statusCode: error.statusCode || 500
      })

      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Internal Server Error'
      })
    }
  })
}
