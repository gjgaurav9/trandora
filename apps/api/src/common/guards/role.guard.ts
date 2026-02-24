import type { FastifyRequest, FastifyReply } from 'fastify';
import type { UserRole } from '@trandora/types';

export function requireRole(...roles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as { role: UserRole };
    if (!user || !roles.includes(user.role)) {
      return reply.status(403).send({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to access this resource',
        },
      });
    }
  };
}
