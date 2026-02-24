import type { FastifyReply } from 'fastify';
import type { ApiResponse } from '@trandora/types';

export function sendSuccess<T>(reply: FastifyReply, data: T, meta?: ApiResponse['meta'], statusCode = 200) {
  return reply.status(statusCode).send({
    success: true,
    data,
    meta,
  });
}

export function sendError(
  reply: FastifyReply,
  code: string,
  message: string,
  statusCode = 400,
  details?: unknown[]
) {
  return reply.status(statusCode).send({
    success: false,
    error: { code, message, details },
  });
}

export function sendPaginated<T>(
  reply: FastifyReply,
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return reply.status(200).send({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
