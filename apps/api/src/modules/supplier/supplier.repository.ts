import { Supplier } from '../../models/supplier.model.js';
import type { CreateSupplierInput, UpdateSupplierInput, ListSuppliersQuery } from './supplier.schema.js';
import type { FilterQuery } from 'mongoose';
import type { ISupplier } from '../../models/supplier.model.js';

export class SupplierRepository {
  async create(userId: string, data: CreateSupplierInput & { slug: string }) {
    return Supplier.create({ ...data, userId });
  }

  async findByUserId(userId: string) {
    return Supplier.findOne({ userId });
  }

  async findById(id: string) {
    return Supplier.findById(id);
  }

  async findBySlug(slug: string) {
    return Supplier.findOne({ slug });
  }

  async update(id: string, data: UpdateSupplierInput) {
    return Supplier.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async list(query: ListSuppliersQuery) {
    const { page, limit, search, city, state, trustTier } = query;
    const filter: FilterQuery<ISupplier> = { isActive: true };

    if (search) {
      filter.$text = { $search: search };
    }
    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (state) filter['address.state'] = new RegExp(state, 'i');
    if (trustTier) filter.trustTier = trustTier;

    const skip = (page - 1) * limit;

    const [suppliers, total] = await Promise.all([
      Supplier.find(filter)
        .sort({ trustScore: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Supplier.countDocuments(filter),
    ]);

    return { suppliers, total };
  }
}
