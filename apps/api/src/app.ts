import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import jwtPlugin from './common/plugins/jwt.plugin.js';
import { healthRoutes } from './modules/health/health.controller.js';
import { authRoutes } from './modules/auth/auth.controller.js';
import { supplierRoutes } from './modules/supplier/supplier.controller.js';
import { API_PREFIX } from '@trandora/config';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  });

  const corsOrigins = process.env.CORS_ORIGINS
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  // Plugins
  await app.register(cors, {
    origin: process.env.NODE_ENV === 'production' ? corsOrigins ?? false : true,
    credentials: true,
  });

  await app.register(cookie);

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await app.register(jwtPlugin);

  // Routes
  await app.register(healthRoutes, { prefix: API_PREFIX });
  await app.register(authRoutes, { prefix: `${API_PREFIX}/auth` });
  await app.register(supplierRoutes, { prefix: `${API_PREFIX}/suppliers` });

  // Global error handler
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);

    if (error.validation) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error.validation,
        },
      });
    }

    const statusCode = error.statusCode || 500;
    return reply.status(statusCode).send({
      success: false,
      error: {
        code: statusCode === 500 ? 'INTERNAL_ERROR' : 'ERROR',
        message: statusCode === 500 ? 'Internal server error' : error.message,
      },
    });
  });

  return app;
}
