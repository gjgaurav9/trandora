import { z } from 'zod';

export const createSupplierSchema = z.object({
  businessName: z.string().min(2, 'Business name is required').max(200),
  description: z.string().max(2000).optional(),
  businessType: z.string().max(100).optional(),
  yearEstablished: z.number().min(1900).max(new Date().getFullYear()).optional(),
  employeeCount: z.string().optional(),
  annualRevenue: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    country: z.string().default('India'),
  }),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  iecCode: z.string().optional(),
  exportMarkets: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  website: z.string().url().optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export const listSuppliersSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  trustTier: z.enum(['basic', 'silver', 'gold', 'platinum']).optional(),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;
export type ListSuppliersQuery = z.infer<typeof listSuppliersSchema>;
