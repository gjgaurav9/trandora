import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      userId: string;
      email: string;
      role: 'buyer' | 'supplier' | 'admin';
    };
    user: {
      userId: string;
      email: string;
      role: 'buyer' | 'supplier' | 'admin';
    };
  }
}
