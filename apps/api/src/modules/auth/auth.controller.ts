import type { FastifyInstance, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service.js';
import { signupSchema, loginSchema } from './auth.schema.js';
import type { SignupInput, LoginInput } from './auth.schema.js';
import { sendSuccess, sendError } from '../../common/utils/response.js';
import { authenticate } from '../../common/middleware/auth.middleware.js';

export async function authRoutes(fastify: FastifyInstance) {
  const authService = new AuthService(fastify);

  // POST /auth/signup
  fastify.post('/signup', async (request: FastifyRequest<{ Body: SignupInput }>, reply) => {
    const parsed = signupSchema.safeParse(request.body);
    if (!parsed.success) {
      return sendError(reply, 'VALIDATION_ERROR', 'Validation failed', 400, parsed.error.errors);
    }

    try {
      const result = await authService.signup(parsed.data);

      reply.setCookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return sendSuccess(reply, result, undefined, 201);
    } catch (err: unknown) {
      const error = err as { statusCode?: number; message?: string };
      return sendError(
        reply,
        'SIGNUP_ERROR',
        error.message || 'Signup failed',
        error.statusCode || 500
      );
    }
  });

  // POST /auth/login
  fastify.post('/login', async (request: FastifyRequest<{ Body: LoginInput }>, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return sendError(reply, 'VALIDATION_ERROR', 'Validation failed', 400, parsed.error.errors);
    }

    try {
      const result = await authService.login(parsed.data);

      reply.setCookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });

      return sendSuccess(reply, result);
    } catch (err: unknown) {
      const error = err as { statusCode?: number; message?: string };
      return sendError(
        reply,
        'LOGIN_ERROR',
        error.message || 'Login failed',
        error.statusCode || 500
      );
    }
  });

  // GET /auth/me
  fastify.get('/me', { preHandler: [authenticate] }, async (request, reply) => {
    try {
      const user = await authService.getMe(request.user.userId);
      return sendSuccess(reply, user);
    } catch (err: unknown) {
      const error = err as { statusCode?: number; message?: string };
      return sendError(
        reply,
        'AUTH_ERROR',
        error.message || 'Failed to get user',
        error.statusCode || 500
      );
    }
  });
}
