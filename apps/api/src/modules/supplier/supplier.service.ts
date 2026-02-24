import { SupplierRepository } from './supplier.repository.js';
import type { CreateSupplierInput, UpdateSupplierInput, ListSuppliersQuery } from './supplier.schema.js';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export class SupplierService {
  private repo = new SupplierRepository();

  async create(userId: string, input: CreateSupplierInput) {
    const existing = await this.repo.findByUserId(userId);
    if (existing) {
      throw { statusCode: 409, message: 'Supplier profile already exists for this user' };
    }

    let slug = slugify(input.businessName);
    const existingSlug = await this.repo.findBySlug(slug);
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    return this.repo.create(userId, { ...input, slug });
  }

  async getById(id: string) {
    const supplier = await this.repo.findById(id);
    if (!supplier) {
      throw { statusCode: 404, message: 'Supplier not found' };
    }
    return supplier;
  }

  async getByUserId(userId: string) {
    return this.repo.findByUserId(userId);
  }

  async update(id: string, userId: string, input: UpdateSupplierInput) {
    const supplier = await this.repo.findById(id);
    if (!supplier) {
      throw { statusCode: 404, message: 'Supplier not found' };
    }
    if (supplier.userId.toString() !== userId) {
      throw { statusCode: 403, message: 'You can only update your own supplier profile' };
    }
    return this.repo.update(id, input);
  }

  async list(query: ListSuppliersQuery) {
    return this.repo.list(query);
  }
}
