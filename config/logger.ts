import winston, { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors, splat } = format;

// Define log format
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
   const requestId = metadata?.requestId;
   console.log(message);

   return `${timestamp} [${requestId || 'no-id'}] ${level}: ${stack || message}`;
});

// Configure logger
const logger = createLogger({
   level: process.env.LOG_LEVEL || 'info',
   format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }), // to log error with stack trace
      splat(), // to handle multiple parameters in log messages
      logFormat,
   ),
   transports: [
      new transports.Console({
         format: combine(
            colorize(), // colorize output in console
            logFormat,
            winston.format.prettyPrint(),
         ),
      }),
      new transports.File({ filename: `${process.env.LOG_DIR}/error.log`, level: 'error' }),
      new transports.File({ filename: `${process.env.LOG_DIR}/combined.log` }),
   ],
   exitOnError: false, // do not exit on handled exceptions
});

export default logger;
