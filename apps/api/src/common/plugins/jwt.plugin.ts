import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import { env } from '../../config/env.js';

export default fp(async (fastify) => {
  await fastify.register(fjwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: env.JWT_EXPIRES_IN,
    },
  });
});
