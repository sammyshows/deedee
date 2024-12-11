import winston from 'winston'
const { combine, timestamp, printf, colorize, align } = winston.format

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'DD-MM-YYYY hh:mm:ss A',
    }),
    align(),
    printf((info) => {
      const stack = info.stack ? `\nStack: ${info.stack}` : ''
      return `[${info.timestamp}] ${info.level}: ${info.message}${stack}`
    })
  ),
  transports: [new winston.transports.Console()],
})