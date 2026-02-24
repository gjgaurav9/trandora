import type { FastifyInstance, FastifyRequest } from 'fastify';
import { SupplierService } from './supplier.service.js';
import { createSupplierSchema, updateSupplierSchema, listSuppliersSchema } from './supplier.schema.js';
import type { ListSuppliersQuery } from './supplier.schema.js';
import { sendSuccess, sendError, sendPaginated } from '../../common/utils/response.js';
import { authenticate } from '../../common/middleware/auth.middleware.js';
import { requireRole } from '../../common/guards/role.guard.js';

export async function supplierRoutes(fastify: FastifyInstance) {
  const supplierService = new SupplierService();

  // GET /suppliers — list suppliers (public)
  fastify.get('/', async (request: FastifyRequest<{ Querystring: ListSuppliersQuery }>, reply) => {
    const parsed = listSuppliersSchema.safeParse(request.query);
    if (!parsed.success) {
      return sendError(reply, 'VALIDATION_ERROR', 'Invalid query parameters', 400, parsed.error.errors);
    }

    try {
      const { suppliers, total } = await supplierService.list(parsed.data);
      return sendPaginated(reply, suppliers, total, parsed.data.page, parsed.data.limit);
    } catch (err: unknown) {
      const error = err as { statusCode?: number; message?: string };
      return sendError(reply, 'LIST_ERROR', error.message || 'Failed to list suppliers', error.statusCode || 500);
    }
  });

  // GET /suppliers/:id — supplier detail (public)
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const supplier = await supplierService.getById(request.params.id);
      return sendSuccess(reply, supplier);
    } catch (err: unknown) {
      const error = err as { statusCode?: number; message?: string };
      return sendError(reply, 'NOT_FOUND', error.message || 'Supplier not found', error.statusCode || 500);
    }
  });

  // POST /suppliers — create supplier profile (auth + supplier role)
  fastify.post(
    '/',
    { preHandler: [authenticate, requireRole('supplier')] },
    async (request, reply) => {
      const parsed = createSupplierSchema.safeParse(request.body);
      if (!parsed.success) {
        return sendError(reply, 'VALIDATION_ERROR', 'Validation failed', 400, parsed.error.errors);
      }

      try {
        const supplier = await supplierService.create(request.user.userId, parsed.data);
        return sendSuccess(reply, supplier, undefined, 201);
      } catch (err: unknown) {
        const error = err as { statusCode?: number; message?: string };
        return sendError(reply, 'CREATE_ERROR', error.message || 'Failed to create supplier', error.statusCode || 500);
      }
    }
  );

  // PUT /suppliers/:id — update supplier profile (auth + own)
  fastify.put(
    '/:id',
    { preHandler: [authenticate, requireRole('supplier')] },
    async (request, reply) => {
      const params = request.params as { id: string };
      const parsed = updateSupplierSchema.safeParse(request.body);
      if (!parsed.success) {
        return sendError(reply, 'VALIDATION_ERROR', 'Validation failed', 400, parsed.error.errors);
      }

      try {
        const supplier = await supplierService.update(
          params.id,
          request.user.userId,
          parsed.data
        );
        return sendSuccess(reply, supplier);
      } catch (err: unknown) {
        const error = err as { statusCode?: number; message?: string };
        return sendError(reply, 'UPDATE_ERROR', error.message || 'Failed to update supplier', error.statusCode || 500);
      }
    }
  );
}
